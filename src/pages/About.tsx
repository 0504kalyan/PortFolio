import { Fragment, type ReactNode } from 'react';
import { PageTitle, Section } from '../components/Section';
import { SkillsGrid } from '../components/SkillsGrid';
import { Dots, Square, Squares } from '../components/Decor';
import { ProfilePhoto } from '../components/ProfilePhoto';
import { formatMonthYear } from '../content/format.js';
import { usePortfolio } from '../content/PortfolioContext';

const ExternalLink = ({ href, children }: { href: string; children: ReactNode }) =>
  href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <>{children}</>
  );

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
  const { achievements, certifications, education, experience, pageSubtitles, profile, quickFacts } = usePortfolio();
  return (
    <>
      <PageTitle title="about-me" subtitle={pageSubtitles.about} />
      <Dots cols={3} rows={3} className="deco deco--left" style={{ top: 560 }} />
      <Square size={110} className="deco deco--right" style={{ top: 180 }} />

      <section className="about-page">
        <div className="about-text">
          <p>Hello, i'm {profile.name}!</p>
          {profile.about.map((s) => (
            <p key={s}>{s}</p>
          ))}
        </div>
        <div className="about-side">
          <ProfilePhoto src={profile.aboutImage || profile.profileImage} className="about-photo" />
          <div className="timeline">
            <Dots cols={5} rows={4} className="timeline__dots" />
            {experience.map((j) => (
              <div key={j.id} className="timeline__item">
                <span className={`timeline__marker ${j.isCurrent ? 'is-current' : ''}`} />
                <div>
                  <h3>{j.company}</h3>
                  {j.position && <p>{j.position}</p>}
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

      {education.length > 0 && (
        <Section title="education">
          <div className="facts">
            {education.map((e) => (
              <span key={e.id} className="fact">
                <b>{e.degree}</b>
                {e.field && <> in {e.field}</>} – <b>{e.institution}</b>
                {e.year && <>, {e.year}</>}
                {e.grade && <> ({e.grade})</>}
              </span>
            ))}
          </div>
        </Section>
      )}

      {certifications.length > 0 && (
        <Section title="certifications">
          <div className="facts">
            {certifications.map((c) => (
              <span key={c.id} className="fact">
                <ExternalLink href={c.credentialUrl}>
                  <b>{c.name}</b>
                </ExternalLink>
                {c.issuer && <> – {c.issuer}</>}
                {c.issueDate && <>, {formatMonthYear(c.issueDate)}</>}
              </span>
            ))}
          </div>
        </Section>
      )}

      {achievements.length > 0 && (
        <Section title="achievements">
          <div className="facts">
            {achievements.map((a) => (
              <span key={a.id} className="fact">
                <ExternalLink href={a.url}>
                  <b>{a.title}</b>
                </ExternalLink>
                {a.date && <>, {formatMonthYear(a.date)}</>}
                {a.description && <> – {a.description}</>}
              </span>
            ))}
          </div>
        </Section>
      )}

      <Section title="quick-facts" className="facts-section">
        <div className="facts">
          {quickFacts.map((f) => (
            <span key={f.id} className="fact">
              <Highlight text={f.text} words={f.highlights} />
            </span>
          ))}
        </div>
        <Squares size={127} className="facts-section__art" />
      </Section>
    </>
  );
}
