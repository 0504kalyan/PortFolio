import { Fragment } from 'react';
import { PageTitle, Section } from '../components/Section';
import { SkillsGrid } from '../components/SkillsGrid';
import { Dots, Square, Squares } from '../components/Decor';
import { ProfilePhoto } from '../components/ProfilePhoto';
import { education, experience, pageSubtitles, profile, quickFacts, summary } from '../data/resume';

function Highlight({ text, words = [] }: { text: string; words?: string[] }) {
  if (!words.length) return <>{text}</>;
  const re = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  return (
    <>
      {text.split(re).map((part, i) =>
        words.includes(part) ? <b key={i}>{part}</b> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}

export function About() {
  return (
    <>
      <PageTitle title="about-me" subtitle={pageSubtitles.about} />
      <Dots cols={3} rows={3} className="deco deco--left" style={{ top: 560 }} />
      <Square size={110} className="deco deco--right" style={{ top: 180 }} />

      <section className="about-page">
        <div className="about-text">
          <p>Hello, i'm {profile.name}!</p>
          {summary.map((s) => (
            <p key={s}>{s}</p>
          ))}
        </div>
        <div className="about-side">
          <ProfilePhoto src={profile.aboutPhoto || profile.photo} className="about-photo" />
          <div className="timeline">
            <Dots cols={5} rows={4} className="timeline__dots" />
            {experience.map((j) => (
              <div key={j.company} className="timeline__item">
                <span className={`timeline__marker ${j.current ? 'is-current' : ''}`} />
                <div>
                  <h3>{j.company}</h3>
                  {j.client && <p>Client: {j.client}</p>}
                  <p className="timeline__period">{j.period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section title="skills">
        <SkillsGrid layout="row" />
      </Section>

      <Section title="education">
        <div className="facts">
          <span className="fact">
            <b>{education.degree}</b> – <b>{education.university}</b>, {education.year} ({education.score})
          </span>
        </div>
      </Section>

      <Section title="quick-facts" className="facts-section">
        <div className="facts">
          {quickFacts.map((f) => (
            <span key={f.text} className="fact">
              <Highlight text={f.text} words={f.highlights} />
            </span>
          ))}
        </div>
        <Squares size={127} className="facts-section__art" />
      </Section>
    </>
  );
}
