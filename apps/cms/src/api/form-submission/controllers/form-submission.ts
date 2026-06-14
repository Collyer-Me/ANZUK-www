import { factories } from '@strapi/strapi';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_FORM_TYPES = new Set(['expression-of-interest']);
const ALLOWED_REGIONS = new Set(['international', 'au', 'uk', 'ca', 'nz']);

function asTrimmedString(value: unknown, maxLength = 500): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, maxLength);
}

function asStringArray(value: unknown, maxItems = 10): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const items = value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, maxItems);
  return items.length ? items : undefined;
}

export default factories.createCoreController(
  'api::form-submission.form-submission',
  ({ strapi }) => ({
    async submit(ctx) {
      const body = ctx.request.body as Record<string, unknown> | undefined;
      if (!body || typeof body !== 'object') {
        return ctx.badRequest('Invalid submission payload');
      }

      if (asTrimmedString(body.website, 200)) {
        return ctx.ok({ data: { accepted: true } });
      }

      const formType = asTrimmedString(body.formType, 64);
      const regionCode = asTrimmedString(body.regionCode, 32);
      const pagePath = asTrimmedString(body.pagePath, 256);
      const firstName = asTrimmedString(body.firstName, 120);
      const lastName = asTrimmedString(body.lastName, 120);
      const email = asTrimmedString(body.email, 254);
      const consentContact = body.consentContact === true;

      if (!formType || !ALLOWED_FORM_TYPES.has(formType)) {
        return ctx.badRequest('Invalid form type');
      }
      if (!regionCode || !ALLOWED_REGIONS.has(regionCode)) {
        return ctx.badRequest('Invalid region');
      }
      if (!pagePath) {
        return ctx.badRequest('Missing page path');
      }
      if (!firstName || !lastName) {
        return ctx.badRequest('Name is required');
      }
      if (!email || !EMAIL_PATTERN.test(email)) {
        return ctx.badRequest('Valid email is required');
      }
      if (!consentContact) {
        return ctx.badRequest('Contact consent is required');
      }

      const entry = await strapi.documents('api::form-submission.form-submission').create({
        data: {
          formType: formType as 'expression-of-interest',
          regionCode,
          pagePath,
          firstName,
          lastName,
          email,
          phone: asTrimmedString(body.phone, 64),
          currentLocation: asTrimmedString(body.currentLocation, 120),
          roleType: asTrimmedString(body.roleType, 120),
          experienceLevel: asTrimmedString(body.experienceLevel, 120),
          preferredDestinations: asStringArray(body.preferredDestinations),
          message: asTrimmedString(body.message, 5000),
          consentContact,
          utmSource: asTrimmedString(body.utmSource, 120),
          utmMedium: asTrimmedString(body.utmMedium, 120),
          utmCampaign: asTrimmedString(body.utmCampaign, 120),
          utmTerm: asTrimmedString(body.utmTerm, 120),
          utmContent: asTrimmedString(body.utmContent, 120),
          landingPage: asTrimmedString(body.landingPage, 512),
        },
      });

      return ctx.send({
        data: {
          accepted: true,
          documentId: entry.documentId,
        },
      });
    },
  }),
);
