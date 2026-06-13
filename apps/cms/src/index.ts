import type { Core } from '@strapi/strapi';

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
