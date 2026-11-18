/* ==========================================================================
   Малък собствен двигател за движение (без библиотеки).
   - Работи само когато <html> има клас "fx" (няма prefers-reduced-motion).
   - Един requestAnimationFrame цикъл за всичко, свързано със скрола.
   - Размерите се четат наведнъж в measure(); във frame() има само записи
     на transform / opacity.
   ========================================================================== */

type Job = (now: number) => boolean; // връща false, когато е приключил

// (при build модулът се зарежда и в Node, където няма document)
const root = typeof document !== 'undefined' ? document.documentElement : (null as unknown as HTMLElement);
export const fxOn = () => root.classList.contains('fx');
const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);

interface HeroRefs { el: HTMLElement; media: HTMLElement | null; dim: HTMLElement | null; inner: HTMLElement | null; h: number; hidden: boolean }
interface ParallaxItem { el: HTMLElement; mid: number; range: number; amt: number }
interface GrowItem { el: HTMLElement; corners: HTMLElement | null; top: number }
interface Strip { el: HTMLElement; w: number; x: number; dir: number; speed: number; on: boolean }

let started = false;
let raf = 0;
let lastT = 0;
let lastY = 0;
let vel = 0;
let vh = 1;

let progress: HTMLElement | null = null;
let footer: HTMLElement | null = null;
let hero: HeroRefs | null = null;
let parallax: ParallaxItem[] = [];
let grows: GrowItem[] = [];
let strips: Strip[] = [];
let scrolledState: boolean | null = null;
let atTopState: boolean | null = null;

const jobs = new Set<Job>();
const seen = new WeakSet<Element>();
const tilted = new WeakSet<Element>();
let io: IntersectionObserver | null = null;
let stripIO: IntersectionObserver | null = null;
let measureQueued = false;

function request() {
  if (!raf) raf = requestAnimationFrame(frame);
}

/** Позиция спрямо документа, без влияние от transform-и. */
function docTop(el: HTMLElement | null) {
  let y = 0;
  while (el) {
    y += el.offsetTop;
    el = el.offsetParent as HTMLElement | null;
  }
  return y;
}

/* ---------- Четене на размери: всичко наведнъж, после записите ---------- */
function measure() {
  measureQueued = false;
  if (!fxOn()) return;

  // четене
  vh = window.innerHeight;
  const heroH = hero ? hero.el.offsetHeight : 0;
  const pGeo = parallax.map((p) => {
    const host = p.el.parentElement as HTMLElement;
    return [docTop(host), host.offsetHeight];
  });
  const gGeo = grows.map((g) => docTop(g.el));
  const sGeo = strips.map((s) => s.el.scrollWidth / 2);
  const footH = footer ? footer.offsetHeight : 0;

  // запис
  if (hero) hero.h = Math.max(1, heroH);
  parallax.forEach((p, i) => {
    p.mid = pGeo[i][0] + pGeo[i][1] / 2;
    p.range = vh / 2 + pGeo[i][1] / 2;
  });
  grows.forEach((g, i) => { g.top = gGeo[i]; });
  strips.forEach((s, i) => { s.w = sGeo[i]; });

  // Футърът се разкрива изпод листа само ако се побира в екрана.
  const footFx = footH > 0 && footH <= vh * 0.94;
  if (root.classList.contains('fx-foot') !== footFx) root.classList.toggle('fx-foot', footFx);
  const fh = footFx ? `${footH}px` : '0px';
  if (root.style.getPropertyValue('--foot-h') !== fh) root.style.setProperty('--foot-h', fh);

  request();
}

function queueMeasure() {
  if (measureQueued) return;
  measureQueued = true;
  requestAnimationFrame(measure);
}

/* ---------- Единственият цикъл ---------- */
function frame(now: number) {
  raf = 0;
  const dt = lastT ? Math.min(64, now - lastT) : 16.7;
  lastT = now;

  // четене
  const y = window.scrollY;
  const max = Math.max(1, root.scrollHeight - vh);
  const dy = y - lastY;
  lastY = y;
  vel += (dy - vel) * 0.14;
  if (Math.abs(vel) < 0.03) vel = 0;

  // запис
  if (progress) progress.style.transform = `scaleX(${clamp(y / max).toFixed(4)})`;

  const scrolled = y > 40;
  if (scrolled !== scrolledState) {
    scrolledState = scrolled;
    root.classList.toggle('scrolled', scrolled);
  }
  const atTop = hero ? y < hero.h : false;
  if (atTop !== atTopState) {
    atTopState = atTop;
    root.classList.toggle('at-top', atTop);
  }

  if (hero) {
    const hp = clamp(y / hero.h);
    if (hp >= 1) {
      if (!hero.hidden) {
        hero.hidden = true;
        hero.el.style.visibility = 'hidden';
      }
    } else {
      if (hero.hidden) {
        hero.hidden = false;
        hero.el.style.visibility = '';
      }
      if (hero.media) hero.media.style.transform = `scale(${(1 + hp * 0.12).toFixed(4)})`;
      if (hero.dim) hero.dim.style.opacity = (hp * 0.82).toFixed(3);
      if (hero.inner) {
        hero.inner.style.transform = `translate3d(0,${(-hp * vh * 0.18).toFixed(1)}px,0)`;
        hero.inner.style.opacity = (1 - clamp(hp * 1.6)).toFixed(3);
      }
    }
  }

  const center = y + vh / 2;
  for (const p of parallax) {
    const d = (p.mid - center) / p.range;
    if (d > -1.15 && d < 1.15) p.el.style.transform = `translate3d(0,${(-d * p.amt).toFixed(1)}px,0)`;
  }

  for (const g of grows) {
    const t = clamp((y + vh - g.top) / (vh * 0.85));
    const e = t * (2 - t);
    g.el.style.transform = `scale(${(0.86 + 0.14 * e).toFixed(4)})`;
    if (g.corners) g.corners.style.opacity = e.toFixed(3);
  }

  let stripsOn = false;
  for (const s of strips) {
    if (!s.on || s.w <= 0) continue;
    stripsOn = true;
    // постоянна скорост + ускорение от инерцията на скрола
    const px = (s.speed + Math.min(Math.abs(vel) * 10, 1100)) * (dt / 1000);
    s.x = (s.x + px) % s.w;
    const tx = s.dir > 0 ? -s.x : s.x - s.w;
    s.el.style.transform = `translate3d(${tx.toFixed(1)}px,0,0)`;
  }

  for (const job of [...jobs]) {
    if (!job(now)) jobs.delete(job);
  }

  if (stripsOn || vel !== 0 || jobs.size > 0) request();
  else lastT = 0;
}

/* ---------- Броячи ---------- */
function runCount(el: HTMLElement) {
  const to = parseFloat(el.dataset.count || '0');
  const suffix = el.dataset.suffix || '';
  const t0 = performance.now();
  const dur = 1600;
  jobs.add((now) => {
    const p = clamp((now - t0) / dur);
    el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suffix;
    return p < 1;
  });
  request();
}

/* ---------- 3D наклон + прожектор под курсора (само с мишка) ---------- */
function bindTilt(el: HTMLElement) {
  const spot = el.querySelector<HTMLElement>('.spot');
  const max = parseFloat(el.dataset.tilt || '') || 7;
  let rect: DOMRect | null = null;
  let y0 = 0;
  let cx = 0;
  let cy = 0;
  let queued = false;

  const apply: Job = () => {
    queued = false;
    if (!rect) return false;
    const px = clamp((cx - rect.left) / rect.width);
    const py = clamp((cy - (rect.top - (lastY - y0))) / rect.height);
    el.style.transform = `perspective(1000px) rotateX(${((0.5 - py) * max).toFixed(2)}deg) rotateY(${((px - 0.5) * max * 1.2).toFixed(2)}deg)`;
    if (spot) spot.style.transform = `translate3d(${(px * rect.width).toFixed(1)}px,${(py * rect.height).toFixed(1)}px,0)`;
    return false;
  };

  el.addEventListener('pointerenter', (e) => {
    if (e.pointerType !== 'mouse') return;
    rect = el.getBoundingClientRect();
    y0 = window.scrollY;
    el.classList.add('is-tilt');
  });
  el.addEventListener('pointermove', (e) => {
    if (!rect) return;
    cx = e.clientX;
    cy = e.clientY;
    if (!queued) {
      queued = true;
      jobs.add(apply);
      request();
    }
  });
  el.addEventListener('pointerleave', () => {
    rect = null;
    el.classList.remove('is-tilt');
    el.style.transform = '';
  });
}

function init() {
  started = true;

  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const t = e.target as HTMLElement;
        t.classList.add('in');
        io?.unobserve(t);
        if (t.dataset.count !== undefined) runCount(t);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0 },
  );

  stripIO = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const s = strips.find((x) => x.el === e.target);
        if (s) s.on = e.isIntersecting;
      }
      request();
    },
    { rootMargin: '80px 0px' },
  );

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', queueMeasure, { passive: true });
  window.addEventListener('load', queueMeasure);
  document.fonts?.ready.then(queueMeasure).catch(() => {});
  if ('ResizeObserver' in window) new ResizeObserver(queueMeasure).observe(document.body);
}

/**
 * Намира елементите за движение в текущия DOM. Безопасно е да се вика многократно
 * (след смяна на страница, след филтриране и т.н.).
 */
export function scan() {
  if (!fxOn()) return;
  if (!started) init();

  progress = document.querySelector<HTMLElement>('.progress');
  footer = document.querySelector<HTMLElement>('.footer');

  const h = document.querySelector<HTMLElement>('.hero');
  if (!h) hero = null;
  else if (!hero || hero.el !== h) {
    hero = {
      el: h,
      media: h.querySelector<HTMLElement>('.hero__media'),
      dim: h.querySelector<HTMLElement>('.hero__dim'),
      inner: h.querySelector<HTMLElement>('.hero__inner'),
      h: 1,
      hidden: false,
    };
  }
  atTopState = null;

  parallax = [...document.querySelectorAll<HTMLElement>('[data-parallax]')].map((el) => ({
    el, mid: 0, range: 1, amt: parseFloat(el.dataset.parallax || '') || 36,
  }));

  grows = [...document.querySelectorAll<HTMLElement>('[data-grow]')].map((el) => ({
    el, corners: el.querySelector<HTMLElement>('.grow__corners'), top: 0,
  }));

  const prev = strips;
  strips = [...document.querySelectorAll<HTMLElement>('.strip__track')].map((el) => {
    const old = prev.find((s) => s.el === el);
    if (old) return old;
    stripIO?.observe(el);
    return { el, w: 0, x: 0, dir: el.dataset.dir === '-1' ? -1 : 1, speed: parseFloat(el.dataset.speed || '') || 46, on: false };
  });

  document.querySelectorAll<HTMLElement>('.reveal, [data-split], [data-count]').forEach((el) => {
    if (seen.has(el)) return;
    seen.add(el);
    if (el.dataset.count !== undefined) el.textContent = `0${el.dataset.suffix || ''}`;
    io?.observe(el);
  });

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
      if (tilted.has(el)) return;
      tilted.add(el);
      bindTilt(el);
    });
  }

  measure();
}
