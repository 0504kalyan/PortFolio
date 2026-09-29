import type { CSSProperties } from 'react';

/** Grid of small dots used as background decoration. */
export function Dots({ cols = 5, rows = 5, style, className = '' }: { cols?: number; rows?: number; style?: CSSProperties; className?: string }) {
  return (
    <div
      className={`dots ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 4px)`, ...style }}
      aria-hidden="true"
    >
      {Array.from({ length: cols * rows }, (_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}

/** Outlined square. */
export function Square({ size = 86, style, className = '' }: { size?: number; style?: CSSProperties; className?: string }) {
  return <div className={`square ${className}`} style={{ width: size, height: size, ...style }} aria-hidden="true" />;
}

/** The interlocking purple outline shape from the design. */
export function Squares({ size = 155, style, className = '' }: { size?: number; style?: CSSProperties; className?: string }) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 155 155" fill="none" aria-hidden="true">
      <g stroke="var(--primary)" strokeWidth="1.2">
        <rect x="0.6" y="38.6" width="77" height="77" />
        <rect x="38.6" y="0.6" width="77" height="77" />
        <rect x="38.6" y="38.6" width="39" height="39" />
      </g>
    </svg>
  );
}
