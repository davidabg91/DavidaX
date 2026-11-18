/* Плавни преходи между страници и при филтриране с View Transitions API. */
import { flushSync } from 'react-dom';
import { fxOn } from './motion';

type VTDocument = Document & { startViewTransition?: (cb: () => void | Promise<void>) => unknown };

let pending: (() => void) | null = null;

/** Вика се от App, когато новата страница вече е в DOM-а. */
export function routeCommitted() {
  const done = pending;
  pending = null;
  done?.();
}

/** Преход при смяна на страница: изчаква React да изрисува новия маршрут. */
export function withRouteTransition(update: () => void) {
  const d = document as VTDocument;
  if (!fxOn() || !d.startViewTransition) {
    update();
    return;
  }
  d.startViewTransition(
    () =>
      new Promise<void>((resolve) => {
        pending = resolve;
        update();
        window.setTimeout(resolve, 600); // предпазител
      }),
  );
}

/** Преход при синхронна промяна на състояние (напр. филтър). */
export function withTransition(update: () => void) {
  const d = document as VTDocument;
  if (!fxOn() || !d.startViewTransition) {
    update();
    return;
  }
  d.startViewTransition(() => flushSync(update));
}

export function scrollToHash(id: string, instant = false) {
  const behavior: ScrollBehavior = instant || !fxOn() ? 'instant' : 'smooth';
  if (!id || id === 'home') {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' });
}
