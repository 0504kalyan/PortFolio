import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/resume';

function Cover({ project }: { project: Project }) {
  return (
    <div className="card__cover">
      <span className="card__cover-code">&lt;/&gt;</span>
      <div>
        <div className="card__cover-name">{project.name}</div>
        <div className="card__cover-tag">{project.tagline}</div>
      </div>
      <span className="card__cover-date">{project.duration}</span>
    </div>
  );
}

type Props = { project: Project; detailed?: boolean; defaultOpen?: boolean };

export function ProjectCard({ project, detailed = false, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <article
      className="card"
      id={detailed ? project.slug : undefined}
      style={{ ['--accent' as string]: project.accent }}
    >
      <Cover project={project} />
      <div className="card__tech">{project.tech.join(' ')}</div>
      <div className="card__body">
        <h3 className="card__title">{project.name}</h3>
        <p className="card__desc">{project.tagline}</p>

        {detailed && open && (
          <div className="card__details">
            <p>{project.description}</p>
            <h4>Responsibilities</h4>
            <ul>
              {project.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="card__actions">
          {detailed ? (
            <button className="btn btn--primary" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
              {open ? 'Less <~>' : 'Details <~>'}
            </button>
          ) : (
            <Link className="btn btn--primary" to={`/works#${project.slug}`}>
              Details &lt;~&gt;
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
