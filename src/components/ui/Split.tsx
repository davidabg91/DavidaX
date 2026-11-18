import { Fragment } from 'react';
import { cssVars } from '../../utils/css';

/**
 * Разделя текст на думи за разкриване иззад маска (родителят носи data-split).
 * Дума, оградена със звездички (*дума*), е акцентна.
 */
export function Words({ children }: { children: string }) {
  return (
    <>
      {children.split(' ').map((raw, i) => {
        const accent = raw.startsWith('*');
        const word = raw.replace(/\*/g, '');
        return (
          <Fragment key={i}>
            {i > 0 && ' '}
            <span className="w">
              <span className={accent ? 'w__i acc' : 'w__i'} style={cssVars({ '--i': i })}>
                {word}
              </span>
            </span>
          </Fragment>
        );
      })}
    </>
  );
}

/** Разделя ред на букви (hero заглавие). Думите остават разделени с интервал. */
export function Chars({ text }: { text: string }) {
  let ci = 0;
  const total = text.replace(/ /g, '').length;
  return (
    <>
      {text.split(' ').map((word, wi) => (
        <Fragment key={wi}>
          {wi > 0 && ' '}
          <span className="chw">
            {[...word].map((c) => {
              const i = ci++;
              return (
                <span key={i} className="ch" style={cssVars({ '--ci': i, '--n': total })}>
                  {c}
                </span>
              );
            })}
          </span>
        </Fragment>
      ))}
    </>
  );
}

/** Декоративна вълна между светла и тъмна секция (цветът идва от fill: currentColor). */
export function Wave({ position }: { position: 'top' | 'bottom' }) {
  const d = 'M0 60 C240 0 480 0 720 60 S1200 120 1440 60 S1920 0 2160 60 S2640 120 2880 60 V121 H0 Z';
  return (
    <div className={`wave wave--${position}`} aria-hidden="true">
      {[1, 2, 3].map((n) => (
        <svg key={n} className={`wave__l wave__l--${n}`} viewBox="0 0 2880 120" preserveAspectRatio="none" fill="currentColor">
          <path d={d} />
        </svg>
      ))}
    </div>
  );
}
