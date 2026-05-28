import React, { useEffect, useRef, ReactNode } from 'react';

interface GlowCardProps {
  children?: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  style?: React.CSSProperties;
}

const glowColorMap = {
  blue:   { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green:  { base: 120, spread: 200 },
  red:    { base: 0,   spread: 200 },
  orange: { base: 30,  spread: 200 },
};

const CSS_STYLES = `
  [data-glow]::before,
  [data-glow]::after {
    pointer-events: none;
    content: "";
    position: absolute;
    inset: calc(var(--border-size) * -1);
    border: var(--border-size) solid transparent;
    border-radius: calc(var(--radius) * 1px);
    background-attachment: fixed;
    background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
    background-repeat: no-repeat;
    background-position: 50% 50%;
    mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
    mask-clip: padding-box, border-box;
    mask-composite: intersect;
  }
  [data-glow]::before {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
      var(--mouse-x, 50%) var(--mouse-y, 50%),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
    );
    filter: brightness(2);
  }
  [data-glow]::after {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
      var(--mouse-x, 50%) var(--mouse-y, 50%),
      hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
    );
  }
  [data-glow] [data-glow] {
    position: absolute;
    inset: 0;
    will-change: filter;
    opacity: var(--outer, 1);
    border-radius: calc(var(--radius) * 1px);
    filter: blur(calc(var(--border-size) * 10));
    background: none;
    pointer-events: none;
    border: none;
  }
  [data-glow] > [data-glow]::before {
    inset: -10px;
    border-width: 10px;
  }
`;

// Single global pointer listener — updates CSS vars on root
let globalListenerAttached = false;
let styleTagInserted = false;

function ensureGlobalSetup() {
  if (!styleTagInserted) {
    const tag = document.createElement('style');
    tag.setAttribute('data-glow-styles', '');
    tag.textContent = CSS_STYLES;
    document.head.appendChild(tag);
    styleTagInserted = true;
  }

  if (!globalListenerAttached) {
    const onMove = (e: PointerEvent) => {
      const root = document.documentElement;
      root.style.setProperty('--mouse-x', `${e.clientX}px`);
      root.style.setProperty('--mouse-y', `${e.clientY}px`);
      root.style.setProperty('--mouse-xp', (e.clientX / window.innerWidth).toFixed(4));
    };
    document.addEventListener('pointermove', onMove);
    globalListenerAttached = true;
  }
}

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'blue',
  style,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureGlobalSetup();
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  return (
    <div
      ref={cardRef}
      data-glow
      className={className}
      style={{
        '--base': base,
        '--spread': spread,
        '--radius': '20',
        '--border': '2',
        '--size': '280',
        '--outer': '1',
        '--border-size': 'calc(var(--border, 2) * 1px)',
        '--spotlight-size': 'calc(var(--size, 150) * 1px)',
        '--hue': `calc(${base} + (var(--mouse-xp, 0) * ${spread}))`,
        backgroundImage: `radial-gradient(
          var(--spotlight-size) var(--spotlight-size) at
          var(--mouse-x, 50%) var(--mouse-y, 50%),
          hsl(var(--hue) 100% 70% / 0.07), transparent
        )`,
        backgroundColor: 'rgba(255,255,255,0.02)',
        backgroundAttachment: 'fixed',
        border: '2px solid rgba(255,255,255,0.08)',
        borderRadius: 'calc(var(--radius) * 1px)',
        position: 'relative',
        touchAction: 'none',
        backdropFilter: 'blur(5px)',
        boxShadow: '0 1rem 2rem -1rem rgba(0,0,0,0.6)',
        display: 'flex',
        flexDirection: 'column',
        padding: '36px 30px',
        gap: '20px',
        transition: 'border-color 0.3s ease',
        ...style,
      } as React.CSSProperties}
    >
      <div data-glow style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none' }} />
      {children}
    </div>
  );
};

export { GlowCard };
