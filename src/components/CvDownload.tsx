import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { usePortfolio } from '../content/PortfolioContext';

/** "PDF", "Word (.docx)"… from a file's extension. */
function formatLabel(url: string): string {
  const ext = url.split(/[?#]/)[0].split('.').pop()?.toLowerCase() ?? '';
  if (ext === 'pdf') return 'PDF';
  if (ext === 'docx' || ext === 'doc') return `Word (.${ext})`;
  return ext ? ext.toUpperCase() : 'File';
}

/**
 * The CV download. With one file it's a plain download link; with a second format
 * (profile.resumeAltUrl) it opens a small menu asking which format to download.
 */
export function CvDownload({ className, children = 'CV' }: Readonly<{ className: string; children?: ReactNode }>) {
  const { profile } = usePortfolio();
  const files = [profile.resumeUrl, profile.resumeAltUrl]
    .filter(Boolean)
    // PDF first: anyone can open it in a browser.
    .sort((a, b) => Number(formatLabel(b) === 'PDF') - Number(formatLabel(a) === 'PDF'));
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => root.current?.contains(e.target as Node) || setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (files.length < 2) {
    return (
      <a className={className} href={files[0]} download>
        {children}
      </a>
    );
  }

  return (
    <div className="cv-menu" ref={root}>
      <button type="button" className={className} aria-haspopup="menu" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((o) => !o)}>
        {children}
      </button>
      {open && (
        <div className="cv-menu__list" id={menuId} role="menu" aria-label="Download CV as">
          <span className="cv-menu__title">Download as</span>
          {files.map((url) => (
            <a key={url} role="menuitem" className="cv-menu__item" href={url} download onClick={() => setOpen(false)}>
              {formatLabel(url)}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
