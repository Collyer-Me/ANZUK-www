# POC stakeholder demo script

Walkthrough for the Multi-Site Marketing Platform POC with **Ketch + RudderStack** data architecture.

## Prerequisites

- Strapi Cloud deployed with V2 schema
- `npm run seed:strapi` completed (or content entered manually)
- GitHub Pages deploy live with `USE_MOCK_DATA=false`
- **Ketch:** org `anzuk`, property `website_smart_tag` in Global Settings (or `PUBLIC_KETCH_ORG` / `PUBLIC_KETCH_PROPERTY` in `.env`)
- **RudderStack:** write key + data plane URL in Global Settings (or env vars)
- RudderStack Live Events tab open for verification

## Demo flow

### 1. Editor publishes content

1. Log into Strapi Cloud as a UK editor
2. Open **Pages** → **uk** → **Teach with us**
3. Confirm **Form Embed** block uses JotForm `251698770470871`
4. **Publish**

### 2. Deploy pipeline

1. Show Strapi publish webhook → GitHub Actions **Deploy to GitHub Pages**
2. Confirm deploy completes (~3–5 min)

### 3. Visitor — consent (Ketch)

1. Open `/uk/teach-with-us/` in incognito
2. Ketch preference centre / banner appears (or dev fallback banner if Ketch not configured)
3. Accept analytics + marketing purposes
4. Confirm `anzuk:consent-updated` fires (browser devtools → sessionStorage `anzuk_consent_state`)

### 4. Visitor — events (RudderStack)

1. Open **RudderStack → Live Events**
2. Verify `Page Viewed` with properties: `region: uk`, `pageType`, `pagePath`
3. Scroll to EOI form → verify `Form Viewed` with `jotformId`
4. Confirm events include `consent_analytics` / `consent_marketing` properties

### 5. Form + marketing identity

1. Inspect JotForm iframe URL — `region=uk`, UTM params if present
2. Submit test entry — confirm JotForm receipt (RudderStack `Form Submitted` is a next step via postMessage)

### 6. Destinations (configured in RudderStack — show dashboard)

1. GA4 destination receives `Page Viewed` when analytics consent granted
2. Meta / Google Ads **blocked** when marketing consent denied
3. JobAdder / Relief Roster destinations ready for `Application Submitted` (document only in POC)

### 7. Multi-site

1. Region picker: International → AU → NZ
2. Independent content, shared brand
3. Per-region `region` property on all events

## Success criteria

- [ ] Ketch consent gates RudderStack SDK load
- [ ] `Page Viewed` and `Form Viewed` in RudderStack Live Events
- [ ] No GTM/GA4/Meta pixels hardcoded in Astro (optional GTM widgets only)
- [ ] JotForm prefill carries region + campaign context
- [ ] Publish → rebuild → live page within ~5 minutes

## Next steps (post-POC)

See [Marketing data platform setup checklist](../future/marketing-data-setup.md) for full Ketch and RudderStack task lists.

## Troubleshooting

| Issue | Check |
|-------|-------|
| No consent banner | Ketch codes in Global Settings? Dev fallback shows if Ketch disabled |
| No RudderStack events | Consent granted? Write key + data plane URL set? |
| Events missing properties | `marketing-identity.ts` UTM capture; page props in layout |
| Strapi 400 on build | V2 schema not deployed — falls back to mock data |
