import type { CSSProperties } from 'react';
import { usePortfolio } from '../content/PortfolioContext';
import { getSkillIcon } from './skillIcons';

export function SkillsGrid({ layout = 'masonry' }: Readonly<{ layout?: 'masonry' | 'row' }>) {
  const { skillGroups } = usePortfolio();
  return (
    <div className={`skills skills--${layout}`}>
      {skillGroups.map((g) => (
        <div key={g.id} className="skill-box">
          <h3 className="skill-box__title">{g.title}</h3>
          <ul className="skill-box__items">
            {g.items.map((i) => {
              const { icon: Icon, color } = getSkillIcon(i.name, i.icon);
              return (
                <li key={i.id} className="skill" style={{ '--brand': color } as CSSProperties}>
                  <Icon className="skill__icon" aria-hidden="true" />
                  <span>{i.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
