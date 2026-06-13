import type { Core } from '@strapi/strapi';

/** Map Strapi admin user email → allowed region codes. Extend via env or database in production. */
function getEditorRegionMap(): Record<string, string[]> {
  const raw = process.env.EDITOR_REGION_MAP ?? '';
  const map: Record<string, string[]> = {};

  for (const entry of raw.split(',').map((s) => s.trim()).filter(Boolean)) {
    const [email, regions] = entry.split(':');
    if (email && regions) {
      map[email.toLowerCase()] = regions.split('|').map((r) => r.trim());
    }
  }

  return map;
}

async function triggerSiteRebuild(strapi: Core.Strapi): Promise<void> {
  const webhookUrl = process.env.DEPLOY_WEBHOOK_URL;
  const webhookSecret = process.env.DEPLOY_WEBHOOK_SECRET;

  if (!webhookUrl) {
    strapi.log.info('[webhook] DEPLOY_WEBHOOK_URL not set — skipping rebuild trigger');
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(webhookSecret ? { Authorization: `Bearer ${webhookSecret}` } : {}),
      },
      body: JSON.stringify({ event: 'strapi.publish', source: 'anzuk-cms' }),
    });

    if (!response.ok) {
      strapi.log.warn(`[webhook] Deploy trigger failed: ${response.status} ${response.statusText}`);
    } else {
      strapi.log.info('[webhook] Site rebuild triggered');
    }
  } catch (error) {
    strapi.log.error('[webhook] Deploy trigger error', error);
  }
}

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.policy('is-region-editor', async (policyContext) => {
      const user = policyContext.state.user;
      if (!user) return false;

      const role = user.roles?.[0]?.type ?? user.role?.type;
      if (role === 'super-admin' || role === 'strapi-super-admin') return true;

      const editorMap = getEditorRegionMap();
      const allowed = editorMap[user.email?.toLowerCase() ?? ''];
      if (!allowed?.length) return true;

      const body = policyContext.request.body?.data ?? policyContext.request.body ?? {};
      const regionId = body.region?.connect?.[0]?.id ?? body.region?.id ?? body.region;

      if (!regionId) return true;

      const region = await strapi.documents('api::region.region').findOne({
        documentId: String(regionId),
      });

      if (!region?.code) return false;
      return allowed.includes(String(region.code));
    });
  },

  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const contentTypes = ['api::page.page', 'api::article.article'];

    for (const uid of contentTypes) {
      strapi.db.lifecycles.subscribe({
        models: [uid],
        async afterCreate(event) {
          if (event.result?.publishedAt) {
            await triggerSiteRebuild(strapi);
          }
        },
        async afterUpdate(event) {
          if (event.result?.publishedAt) {
            await triggerSiteRebuild(strapi);
          }
        },
        async afterDelete() {
          await triggerSiteRebuild(strapi);
        },
      });
    }
  },
};
