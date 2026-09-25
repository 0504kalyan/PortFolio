import type { CSSProperties } from 'react';
import { skills } from '../data/resume';
import { getSkillIcon } from './skillIcons';

export function SkillsGrid({ layout = 'masonry' }: Readonly<{ layout?: 'masonry' | 'row' }>) {
  return (
    <div className={`skills skills--${layout}`}>
      {skills.map((g) => (
        <div key={g.title} className="skill-box">
          <h3 className="skill-box__title">{g.title}</h3>
          <ul className="skill-box__items">
            {g.items.map((i) => {
              const { icon: Icon, color } = getSkillIcon(i);
              return (
                <li key={i} className="skill" style={{ '--brand': color } as CSSProperties}>
                  <Icon className="skill__icon" aria-hidden="true" />
                  <span>{i}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
