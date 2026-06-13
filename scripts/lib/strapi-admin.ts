/**
 * Minimal Strapi 5 Content API client for seed scripts (write access required).
 */

export interface StrapiListResponse<T> {
  data: T[];
  meta?: unknown;
}

export interface StrapiDocument {
  documentId: string;
  [key: string]: unknown;
}

export type EndpointStatus = 'ok' | 'not_found' | 'error';

export class StrapiAdminClient {
  constructor(
    private readonly baseUrl: string,
    private readonly token: string,
  ) {}

  async probeEndpoint(
    path: string,
    params: Record<string, string> = {},
  ): Promise<{ status: EndpointStatus; httpStatus: number; body: string }> {
    const url = new URL(`/api/${path}`, this.baseUrl.replace(/\/$/, ''));
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    });

    const body = await response.text();
    if (response.ok) return { status: 'ok', httpStatus: response.status, body };
    if (response.status === 404) return { status: 'not_found', httpStatus: 404, body };
    return { status: 'error', httpStatus: response.status, body };
  }

  private async request<T>(
    method: string,
    path: string,
    options: {
      params?: Record<string, string>;
      body?: unknown;
    } = {},
  ): Promise<T> {
    const url = new URL(`/api/${path}`, this.baseUrl.replace(/\/$/, ''));
    if (options.params) {
      for (const [key, value] of Object.entries(options.params)) {
        url.searchParams.set(key, value);
      }
    }

    const response = await fetch(url.toString(), {
      method,
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      const text = await response.text();
      const hint =
        response.status === 403
          ? '\nHint: use a Full access API token (STRAPI_API_CURSOR in apps/web/.env).'
          : '';
      throw new Error(
        `Strapi ${method} ${path} failed: ${response.status} ${response.statusText}\n${text}${hint}`,
      );
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  }

  async list(collection: string, params: Record<string, string>): Promise<StrapiDocument[]> {
    const response = await this.request<StrapiListResponse<StrapiDocument>>('GET', collection, {
      params,
    });
    return response.data;
  }

  async delete(collection: string, documentId: string, locale: string): Promise<void> {
    await this.request('DELETE', `${collection}/${documentId}`, {
      params: { locale },
    });
  }

  async findOne(
    collection: string,
    filters: Record<string, string>,
    locale?: string,
    options: { draftAndPublish?: boolean } = {},
  ): Promise<StrapiDocument | null> {
    const filterParams = Object.fromEntries(
      Object.entries(filters).map(([key, value]) => [`filters[${key}][$eq]`, value]),
    );

    const statuses =
      options.draftAndPublish === false ? ([''] as const) : (['published', 'draft'] as const);

    for (const status of statuses) {
      const probe = await this.probeEndpoint(collection, {
        ...(locale ? { locale } : {}),
        ...(status ? { status } : {}),
        'pagination[pageSize]': '1',
        ...filterParams,
      });

      if (probe.status === 'not_found') {
        throw new Error(
          `Strapi GET ${collection} failed: 404 Not Found\n${probe.body}\n` +
            'Hint: content type not deployed on Strapi Cloud yet — check apps/cms deployment.',
        );
      }

      if (probe.status === 'error') {
        throw new Error(
          `Strapi GET ${collection} failed: ${probe.httpStatus}\n${probe.body}`,
        );
      }

      const response = JSON.parse(probe.body) as StrapiListResponse<StrapiDocument>;
      if (response.data[0]) return response.data[0];
    }

    return null;
  }

  async upsertCollection(
    collection: string,
    locale: string | undefined,
    filters: Record<string, string>,
    data: Record<string, unknown>,
    options: { draftAndPublish?: boolean } = {},
  ): Promise<StrapiDocument> {
    const existing = await this.findOne(collection, filters, locale, options);

    const writeParams: Record<string, string> = {
      ...(locale ? { locale } : {}),
      ...(options.draftAndPublish === false ? {} : { status: 'published' }),
    };

    if (existing) {
      const updated = await this.request<{ data: StrapiDocument }>(
        'PUT',
        `${collection}/${existing.documentId}`,
        { params: writeParams, body: { data } },
      );
      return updated.data;
    }

    const created = await this.request<{ data: StrapiDocument }>('POST', collection, {
      params: writeParams,
      body: { data },
    });
    return created.data;
  }

  async upsertSingleType(
    singleType: string,
    locale: string,
    data: Record<string, unknown>,
  ): Promise<void> {
    for (const endpoint of [singleType, `${singleType}s`]) {
      try {
        await this.request('PUT', endpoint, {
          params: { locale },
          body: { data },
        });
        return;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (message.includes('404')) continue;
        throw error;
      }
    }

    throw new Error(`Could not upsert single type "${singleType}" for locale ${locale}`);
  }

}
