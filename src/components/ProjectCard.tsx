import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { ProjectView } from '../content/view';

function Cover({ project }: { project: ProjectView }) {
  if (project.image) {
    return (
      <div className="card__cover card__cover--image">
        <img src={project.image} alt={project.title} loading="lazy" />
      </div>
    );
  }
  return (
    <div className="card__cover">
      <span className="card__cover-code">&lt;/&gt;</span>
      <div>
        <div className="card__cover-name">{project.title}</div>
        <div className="card__cover-tag">{project.tagline}</div>
      </div>
      <span className="card__cover-date">{project.duration}</span>
    </div>
  );
}

type Props = { project: ProjectView; detailed?: boolean; defaultOpen?: boolean };

export function ProjectCard({ project, detailed = false, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const hasDetails = Boolean(project.description || project.responsibilities.length);

  return (
    <article
      className="card"
      id={detailed ? project.id : undefined}
      style={{ ['--accent' as string]: project.accent }}
    >
      <Cover project={project} />
      <div className="card__tech">{project.technologies.join(' ')}</div>
      <div className="card__body">
        <h3 className="card__title">{project.title}</h3>
        <p className="card__desc">{project.tagline}</p>

        {detailed && open && (
          <div className="card__details">
            {project.description && <p>{project.description}</p>}
            {project.responsibilities.length > 0 && (
              <>
                <h4>Responsibilities</h4>
                <ul>
                  {project.responsibilities.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        <div className="card__actions">
          {detailed ? (
            hasDetails && (
              <button className="btn btn--primary" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
                {open ? 'Less <~>' : 'Details <~>'}
              </button>
            )
          ) : (
            <Link className="btn btn--primary" to={`/works#${project.id}`}>
              Details &lt;~&gt;
            </Link>
          )}
          {project.liveUrl && (
            <a className="btn btn--ghost" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Live &lt;~&gt;
            </a>
          )}
          {project.githubUrl && (
            <a className="btn btn--ghost" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              Github &gt;=
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
