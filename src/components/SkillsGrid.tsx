import { skills } from '../data/resume';

export function SkillsGrid({ layout = 'masonry' }: { layout?: 'masonry' | 'row' }) {
  return (
    <div className={`skills skills--${layout}`}>
      {skills.map((g) => (
        <div key={g.title} className="skill-box">
          <h3 className="skill-box__title">{g.title}</h3>
          <p className="skill-box__items">
            {g.items.map((i) => (
              <span key={i}>{i}</span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}
