import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  title: string;
  lineWidth?: number;
  viewAll?: string;
  children: ReactNode;
  className?: string;
  id?: string;
};

export function Section({ title, lineWidth, viewAll, children, className = '', id }: Props) {
  return (
    <section className={`section ${className}`} id={id}>
      <div className="section__head">
        <h2 className="section__title">
          <span className="hash">#</span>
          {title}
        </h2>
        {lineWidth !== undefined && <span className="section__line" style={{ maxWidth: lineWidth }} />}
        {viewAll && (
          <Link to={viewAll} className="section__view-all">
            View all ~~&gt;
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

export function PageTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="page-title">
      <h1>
        <span className="hash">/</span>
        {title}
      </h1>
      <p>{subtitle}</p>
    </div>
  );
}
