/**
 * Shared motion system for ANZUK pages.
 * Components opt in via data attributes:
 *
 *   data-reveal="up|left|right|zoom|draw"  — scroll-triggered reveal (CSS in styles/motion.css)
 *   data-reveal-delay="150"                — per-element stagger in ms
 *   data-counter="12000" data-counter-suffix="+" — animated number (final value server-rendered)
 *   data-parallax="0.08"                   — decorative parallax (clamped ±48px)
 *   [data-demo-header] + [data-header-sentinel] — sticky header shrink
 *   [data-nav-toggle] + #demo-mobile-nav   — mobile nav disclosure
 *
 * ClientRouter-safe: page-scoped observers re-initialise on astro:after-swap,
 * while window/document listeners are registered once at module level and
 * resolve their targets at event time. Under prefers-reduced-motion every
 * effect renders its final state immediately.
 */

const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const numberFormat = new Intl.NumberFormat('en-AU');

let revealObserver: IntersectionObserver | null = null;
let counterObserver: IntersectionObserver | null = null;
let headerObserver: IntersectionObserver | null = null;

interface ParallaxItem {
  el: HTMLElement;
  speed: number;
  baseCenter: number;
}

let parallaxItems: ParallaxItem[] = [];
let parallaxTicking = false;
let resizeTimer: ReturnType<typeof setTimeout> | undefined;

function revealAll(): void {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    el.classList.add('is-revealed');
  });
}

function finishCounter(el: HTMLElement): void {
  const target = Number(el.dataset.counter ?? '0');
  el.textContent = numberFormat.format(target) + (el.dataset.counterSuffix ?? '');
}

function animateCounter(el: HTMLElement): void {
  const target = Number(el.dataset.counter ?? '0');
  const suffix = el.dataset.counterSuffix ?? '';
  const duration = 1200;
  const start = performance.now();

  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = numberFormat.format(Math.round(target * eased)) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

function initReveal(): void {
  revealObserver?.disconnect();
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (items.length === 0) return;

  if (reducedQuery.matches) {
    revealAll();
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.style.setProperty('--reveal-delay', `${el.dataset.revealDelay ?? 0}ms`);
        el.classList.add('is-revealed');
        observer.unobserve(el);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
  );

  items.forEach((el) => revealObserver!.observe(el));
}

function initCounters(): void {
  counterObserver?.disconnect();
  const counters = document.querySelectorAll<HTMLElement>('[data-counter]');
  if (counters.length === 0) return;

  if (reducedQuery.matches) {
    counters.forEach(finishCounter);
    return;
  }

  counterObserver = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        animateCounter(entry.target as HTMLElement);
      }
    },
    { threshold: 0.5 },
  );

  counters.forEach((el) => counterObserver!.observe(el));
}

function measureBaseCenter(el: HTMLElement): number {
  const previous = el.style.transform;
  el.style.transform = 'none';
  const rect = el.getBoundingClientRect();
  el.style.transform = previous;
  return rect.top + window.scrollY + rect.height / 2;
}

function parallaxUpdate(): void {
  parallaxTicking = false;
  if (parallaxItems.length === 0) return;
  const viewportCenter = window.scrollY + window.innerHeight / 2;
  for (const item of parallaxItems) {
    const offset = Math.max(-48, Math.min(48, (item.baseCenter - viewportCenter) * item.speed));
    item.el.style.transform = `translate3d(0, ${offset}px, 0)`;
  }
}

function requestParallaxUpdate(): void {
  if (!parallaxTicking) {
    parallaxTicking = true;
    requestAnimationFrame(parallaxUpdate);
  }
}

function collectParallax(): void {
  if (reducedQuery.matches) {
    parallaxItems = [];
    return;
  }
  parallaxItems = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]')).map((el) => ({
    el,
    speed: Number(el.dataset.parallax ?? '0.1'),
    baseCenter: measureBaseCenter(el),
  }));
  requestParallaxUpdate();
}

function initHeader(): void {
  headerObserver?.disconnect();
  const header = document.querySelector<HTMLElement>('[data-demo-header]');
  const sentinel = document.querySelector<HTMLElement>('[data-header-sentinel]');
  if (!header || !sentinel) return;

  headerObserver = new IntersectionObserver(([entry]) => {
    header.toggleAttribute('data-scrolled', !entry.isIntersecting);
  });

  headerObserver.observe(sentinel);
}

/* Mobile nav: fully delegated so view-transition swaps need no re-binding. */
function setMobileNav(open: boolean): void {
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  const panel = document.getElementById('demo-mobile-nav');
  if (!toggle || !panel) return;
  toggle.setAttribute('aria-expanded', String(open));
  panel.hidden = !open;
}

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  const toggle = target.closest('[data-nav-toggle]');
  if (toggle) {
    const panel = document.getElementById('demo-mobile-nav');
    setMobileNav(panel ? panel.hidden : false);
    return;
  }
  if (target.closest('#demo-mobile-nav') && target.closest('a')) {
    setMobileNav(false);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  const panel = document.getElementById('demo-mobile-nav');
  if (panel && !panel.hidden) {
    setMobileNav(false);
    document.querySelector<HTMLButtonElement>('[data-nav-toggle]')?.focus();
  }
});

window.matchMedia('(min-width: 768px)').addEventListener('change', (event) => {
  if (event.matches) setMobileNav(false);
});

window.addEventListener('scroll', requestParallaxUpdate, { passive: true });

window.addEventListener(
  'resize',
  () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(collectParallax, 150);
  },
  { passive: true },
);

reducedQuery.addEventListener('change', (event) => {
  if (!event.matches) return;
  // The user switched reduced motion on mid-session: settle everything.
  revealAll();
  document.querySelectorAll<HTMLElement>('[data-counter]').forEach(finishCounter);
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    el.style.transform = '';
  });
  parallaxItems = [];
});

function initPage(): void {
  // Safety net: the layout's inline setter (data-astro-rerun) normally restores
  // this after a view-transition swap resets <html> attributes.
  document.documentElement.classList.add('js');
  initReveal();
  initCounters();
  collectParallax();
  initHeader();
}

initPage();
document.addEventListener('astro:after-swap', initPage);
