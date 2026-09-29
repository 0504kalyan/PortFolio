import type { CSSProperties } from 'react';
import { usePortfolio } from '../content/PortfolioContext';
import { getSkillIcon } from './skillIcons';
import { SectionHeading } from './SectionHeading';

export function Skills() {
  const { skillGroups } = usePortfolio();
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading eyebrow="Skills" title="Functional and technical competencies" />
        <div className="skill-grid">
          {skillGroups.map((g) => (
            <div key={g.id} className="skill-group">
              <h3>{g.title}</h3>
              <ul>
                {g.items.map((i) => {
                  const { icon: Icon, color } = getSkillIcon(i);
                  return (
                    <li key={i} className="chip" style={{ '--tone': color } as CSSProperties}>
                      <Icon aria-hidden="true" />
                      {i}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
