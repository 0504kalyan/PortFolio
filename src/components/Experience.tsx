import { TbBuilding, TbCircleCheckFilled } from 'react-icons/tb';
import { usePortfolio } from '../content/PortfolioContext';
import { SectionHeading } from './SectionHeading';

export function Experience() {
  const { experience } = usePortfolio();
  return (
    <section className="section section--tint" id="experience">
      <div className="container">
        <SectionHeading eyebrow="Experience" title="Where I have delivered" />
        <ol className="timeline">
          {experience.map((j) => (
            <li key={j.id} className="timeline__item">
              <span className={`timeline__dot ${j.isCurrent ? 'is-current' : ''}`} aria-hidden="true" />
              <article className="job">
                <header className="job__head">
                  <div>
                    <h3>{j.role}</h3>
                    <p className="job__company">
                      <TbBuilding aria-hidden="true" /> {j.company}
                    </p>
                  </div>
                  <span className={`pill ${j.isCurrent ? 'pill--success' : ''}`}>{j.period}</span>
                </header>

                {j.project.name && (
                  <dl className="project-meta">
                    <div>
                      <dt>Project</dt>
                      <dd>{j.project.name}</dd>
                    </div>
                    {j.project.client && (
                      <div>
                        <dt>Client</dt>
                        <dd>{j.project.client}</dd>
                      </div>
                    )}
                    {j.project.role && (
                      <div>
                        <dt>Role</dt>
                        <dd>{j.project.role}</dd>
                      </div>
                    )}
                    {j.project.teamSize != null && (
                      <div>
                        <dt>Team size</dt>
                        <dd>{j.project.teamSize}</dd>
                      </div>
                    )}
                  </dl>
                )}

                <ul className="job__list">
                  {j.highlights.map((h) => (
                    <li key={h}>
                      <TbCircleCheckFilled aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
