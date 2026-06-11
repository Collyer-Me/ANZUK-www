const STRAPI_URL = (
  import.meta.env.STRAPI_URL ??
  process.env.STRAPI_URL ??
  ''
).replace(/\/$/, '');

const STRAPI_API_TOKEN =
  import.meta.env.STRAPI_API_TOKEN ?? process.env.STRAPI_API_TOKEN ?? '';

const USE_MOCK_DATA =
  (import.meta.env.USE_MOCK_DATA ?? process.env.USE_MOCK_DATA ?? 'true') === 'true';

export function isStrapiConfigured(): boolean {
  return Boolean(STRAPI_URL && STRAPI_API_TOKEN);
}

export function shouldUseMockData(): boolean {
  return USE_MOCK_DATA || !isStrapiConfigured();
}

export async function fetchStrapi<T>(
  endpoint: string,
  params: Record<string, string> = {},
): Promise<T> {
  if (!isStrapiConfigured()) {
    throw new Error('Strapi is not configured. Set STRAPI_URL and STRAPI_API_TOKEN.');
  }

  const url = new URL(`/api/${endpoint}`, STRAPI_URL);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.status} ${response.statusText} — ${url}`);
  }

  return response.json() as Promise<T>;
}
