/**
 * Shared motion utilities for the /brand/demo/ pages.
 * Imported once by DemoLayout; individual components opt in via data attributes:
 *
 *   data-reveal="up|left|right|zoom|draw"  — scroll-triggered reveal (CSS in demo.css)
 *   data-reveal-delay="150"                — per-element stagger in ms
 *   data-counter="12000" data-counter-suffix="+" — animated number
 *   data-parallax="0.08"                   — decorative parallax (clamped ±48px)
 *   [data-demo-header] + [data-header-sentinel] — sticky header shrink
 *   [data-nav-toggle] + #demo-mobile-nav   — mobile nav disclosure
 *
 * Everything degrades: under prefers-reduced-motion the reveals/counters render
 * their final state immediately and parallax never starts.
 */

const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

const numberFormat = new Intl.NumberFormat('en-AU');

function revealAll(): void {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    el.classList.add('is-revealed');
  });
}

function finishCounter(el: HTMLElement): void {
  const target = Number(el.dataset.counter ?? '0');
  el.textContent = numberFormat.format(target) + (el.dataset.counterSuffix ?? '');
}

function initReveal(): void {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (items.length === 0) return;

  if (reducedQuery.matches) {
    revealAll();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
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

  items.forEach((el) => observer.observe(el));
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

function initCounters(): void {
  const counters = document.querySelectorAll<HTMLElement>('[data-counter]');
  if (counters.length === 0) return;

  if (reducedQuery.matches) {
    counters.forEach(finishCounter);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        animateCounter(entry.target as HTMLElement);
      }
    },
    { threshold: 0.5 },
  );

  counters.forEach((el) => observer.observe(el));
}

interface ParallaxItem {
  el: HTMLElement;
  speed: number;
  baseCenter: number;
}

function measureBaseCenter(el: HTMLElement): number {
  const previous = el.style.transform;
  el.style.transform = 'none';
  const rect = el.getBoundingClientRect();
  el.style.transform = previous;
  return rect.top + window.scrollY + rect.height / 2;
}

function initParallax(): void {
  if (reducedQuery.matches) return;

  const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  if (elements.length === 0) return;

  let items: ParallaxItem[] = elements.map((el) => ({
    el,
    speed: Number(el.dataset.parallax ?? '0.1'),
    baseCenter: measureBaseCenter(el),
  }));

  let ticking = false;

  const update = () => {
    ticking = false;
    if (reducedQuery.matches) return;
    const viewportCenter = window.scrollY + window.innerHeight / 2;
    for (const item of items) {
      const offset = Math.max(-48, Math.min(48, (item.baseCenter - viewportCenter) * item.speed));
      item.el.style.transform = `translate3d(0, ${offset}px, 0)`;
    }
  };

  const requestUpdate = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  let resizeTimer: ReturnType<typeof setTimeout> | undefined;
  window.addEventListener(
    'resize',
    () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        items = items.map(({ el, speed }) => ({ el, speed, baseCenter: measureBaseCenter(el) }));
        requestUpdate();
      }, 150);
    },
    { passive: true },
  );

  window.addEventListener('scroll', requestUpdate, { passive: true });
  requestUpdate();
}

function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-demo-header]');
  const sentinel = document.querySelector<HTMLElement>('[data-header-sentinel]');
  if (!header || !sentinel) return;

  const observer = new IntersectionObserver(([entry]) => {
    header.toggleAttribute('data-scrolled', !entry.isIntersecting);
  });

  observer.observe(sentinel);
}

function initMobileNav(): void {
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  const panel = document.getElementById('demo-mobile-nav');
  if (!toggle || !panel) return;

  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
  };

  toggle.addEventListener('click', () => setOpen(panel.hidden));

  panel.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });

  const desktop = window.matchMedia('(min-width: 768px)');
  desktop.addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}

reducedQuery.addEventListener('change', (event) => {
  if (!event.matches) return;
  // The user switched reduced motion on mid-session: settle everything.
  revealAll();
  document.querySelectorAll<HTMLElement>('[data-counter]').forEach(finishCounter);
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    el.style.transform = '';
  });
});

initReveal();
initCounters();
initParallax();
initHeader();
initMobileNav();
