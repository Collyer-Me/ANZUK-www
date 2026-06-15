import { chromium } from 'playwright';

const URL = 'http://localhost:4321/uk/teach-with-us/';
const consent = {
  essential: true,
  functional: true,
  analytics: true,
  marketing: true,
};

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

const consoleErrors = [];
const dataplaneRequests = [];

page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});

page.on('request', (req) => {
  if (req.url().includes('dataplane.rudderstack')) {
    dataplaneRequests.push(`${req.method()} ${req.url()}`);
  }
});

await page.addInitScript(() => sessionStorage.removeItem('anzuk_consent_state'));

const response = await page.goto(URL, { waitUntil: 'networkidle', timeout: 90000 });
const html = await page.content();

console.log('HTTP status:', response?.status());
console.log('Has rudder config:', html.includes('anzuk-rudder-config'));

await page.waitForTimeout(2000);

const beforeConsent = await page.evaluate(() => ({
  rudderLoaded: window.__anzukRudderLoaded ?? false,
  loadStarted: window.__anzukRudderLoadStarted ?? false,
}));

console.log('Before consent:', beforeConsent);

await page.evaluate((state) => {
  sessionStorage.setItem('anzuk_consent_state', JSON.stringify(state));
  window.dispatchEvent(new CustomEvent('anzuk:consent-updated', { detail: state }));
}, consent);

await page.waitForFunction(() => window.__anzukRudderLoaded === true, { timeout: 20000 });

const afterConsent = await page.evaluate(() => ({
  rudderLoaded: window.__anzukRudderLoaded ?? false,
  loadStarted: window.__anzukRudderLoadStarted ?? false,
  hasRudderSdk: typeof window.rudderanalytics !== 'undefined',
}));

console.log('After consent:', afterConsent);
console.log('Dataplane requests:', dataplaneRequests.length ? dataplaneRequests : '(none)');
console.log('Console errors:', consoleErrors.filter((e) => !e.includes('dev-toolbar')).slice(0, 5));

await browser.close();

if (!afterConsent.rudderLoaded || dataplaneRequests.length === 0) {
  console.error('FAIL: RudderStack did not initialiase or send events');
  process.exit(1);
}

console.log('PASS: RudderStack loaded and sent dataplane requests');
