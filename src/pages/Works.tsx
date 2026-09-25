import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PageTitle, Section } from '../components/Section';
import { ProjectCard } from '../components/ProjectCard';
import { Dots, Square } from '../components/Decor';
import { experience, pageSubtitles, projects } from '../data/resume';

export function Works() {
  const { hash } = useLocation();
  const target = hash.slice(1);

  useEffect(() => {
    if (target) document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [target]);

  return (
    <>
      <PageTitle title="projects" subtitle={pageSubtitles.works} />
      <Dots cols={4} rows={3} className="deco deco--left" style={{ top: 560 }} />
      <Square size={120} className="deco deco--right" style={{ top: 180 }} />

      <Section title="complete-apps">
        <div className="cards">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} detailed defaultOpen={p.slug === target} />
          ))}
        </div>
      </Section>

      <Section title="work-experience">
        <div className="cards">
          {experience.map((j) => (
            <article key={j.company} className="card card--small">
              <div className="card__tech">{j.current ? 'Current' : 'Previous'}</div>
              <div className="card__body">
                <h3 className="card__title">{j.company}</h3>
                {j.client && <p className="card__desc">Client: {j.client}</p>}
                <span className="btn btn--ghost btn--static">{j.period}</span>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
