import type { CSSProperties } from 'react';

/** CSS променливи в inline стил: style={cssVars({ '--i': 2 })} */
export const cssVars = (vars: Record<string, string | number>) => vars as CSSProperties;
