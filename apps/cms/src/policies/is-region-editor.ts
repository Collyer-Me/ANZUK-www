export default async (policyContext, _config, { strapi }) => {
  const user = policyContext.state.user;
  if (!user) return false;

  const roleType = user.roles?.[0]?.type ?? user.role?.type;
  if (roleType === 'super-admin' || roleType === 'strapi-super-admin') return true;

  const raw = process.env.EDITOR_REGION_MAP ?? '';
  if (!raw.trim()) return true;

  const map: Record<string, string[]> = {};
  for (const entry of raw.split(',').map((s) => s.trim()).filter(Boolean)) {
    const [email, regions] = entry.split(':');
    if (email && regions) {
      map[email.toLowerCase()] = regions.split('|').map((r) => r.trim());
    }
  }

  const allowed = map[user.email?.toLowerCase() ?? ''];
  if (!allowed?.length) return true;

  const body = policyContext.request.body?.data ?? policyContext.request.body ?? {};
  let regionCode = body.region?.code;

  if (!regionCode) {
    const regionRef = body.region?.connect?.[0]?.id ?? body.region?.id ?? body.region;
    if (regionRef) {
      const region = await strapi.documents('api::region.region').findOne({
        documentId: String(regionRef),
        fields: ['code'],
      });
      regionCode = region?.code;
    }
  }

  if (!regionCode) return true;
  return allowed.includes(String(regionCode));
};
