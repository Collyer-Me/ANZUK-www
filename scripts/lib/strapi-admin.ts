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

export class StrapiAdminClient {
  constructor(
    private readonly baseUrl: string,
    private readonly token: string,
  ) {}

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
          ? '\nHint: use a Full access API token (STRAPI_SEED_TOKEN in apps/web/.env).'
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

  async findOne(
    collection: string,
    filters: Record<string, string>,
    locale: string,
  ): Promise<StrapiDocument | null> {
    const filterParams = Object.fromEntries(
      Object.entries(filters).map(([key, value]) => [`filters[${key}][$eq]`, value]),
    );

    for (const status of ['published', 'draft'] as const) {
      const response = await this.request<StrapiListResponse<StrapiDocument>>('GET', collection, {
        params: {
          locale,
          status,
          'pagination[pageSize]': '1',
          ...filterParams,
        },
      });
      if (response.data[0]) return response.data[0];
    }

    return null;
  }

  async upsertCollection(
    collection: string,
    locale: string,
    filters: Record<string, string>,
    data: Record<string, unknown>,
  ): Promise<StrapiDocument> {
    const existing = await this.findOne(collection, filters, locale);

    if (existing) {
      const updated = await this.request<{ data: StrapiDocument }>(
        'PUT',
        `${collection}/${existing.documentId}`,
        { params: { locale }, body: { data } },
      );
      await this.publish(collection, existing.documentId, locale);
      return updated.data;
    }

    const created = await this.request<{ data: StrapiDocument }>('POST', collection, {
      params: { locale },
      body: { data },
    });
    await this.publish(collection, created.data.documentId, locale);
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

  async publish(collection: string, documentId: string, locale: string): Promise<void> {
    try {
      await this.request(
        'POST',
        `${collection}/${documentId}/actions/publish`,
        { params: { locale } },
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      // Ignore if already published
      if (message.includes('already published') || message.includes('422')) return;
      throw error;
    }
  }
}
