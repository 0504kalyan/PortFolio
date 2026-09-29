import { Link } from 'react-router-dom';
import { HeroArt } from '../components/HeroArt';
import { QuoteIcon } from '../components/Icons';
import { ContactList } from '../components/MediaLinks';
import { Section } from '../components/Section';
import { ProjectCard } from '../components/ProjectCard';
import { SkillsGrid } from '../components/SkillsGrid';
import { Dots, Square, Squares } from '../components/Decor';
import { experience, home, profile, projects, summary } from '../data/resume';

/** Renders text with [bracketed] words in the accent colour. */
function Accented({ text }: { text: string }) {
  return (
    <>
      {text.split(/\[(.*?)\]/).map((part, i) =>
        i % 2 ? (
          <span key={i} className="accent">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__text">
          <h1 className="hero__title">
            {profile.shortName} <Accented text={home.headline} />
          </h1>
          <p className="hero__lead">{home.lead}</p>
          <Link to="/contacts" className="btn btn--primary btn--lg">
            Contact me!!
          </Link>
        </div>
        <HeroArt />
      </section>

      <section className="quote">
        <div className="quote__box">
          <span className="quote__mark quote__mark--top">
            <QuoteIcon />
          </span>
          <p>{home.quote.text}</p>
          <span className="quote__mark quote__mark--bottom">
            <QuoteIcon />
          </span>
        </div>
        <div className="quote__author">- {home.quote.author}</div>
        <Square size={91} className="deco deco--right" style={{ top: 10 }} />
      </section>

      <Section title="projects" lineWidth={511} viewAll="/works">
        <div className="cards">
          {projects.slice(0, 3).map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      <Section title="skills" lineWidth={239}>
        <div className="skills-wrap">
          <div className="skills-art" aria-hidden="true">
            <Dots cols={5} rows={5} style={{ left: 30, top: 40 }} />
            <Dots cols={5} rows={5} style={{ left: 140, top: 150 }} />
            <Square size={86} style={{ left: 180, top: 0 }} />
            <Square size={52} style={{ left: 240, top: 220 }} />
            <Squares size={113} style={{ position: 'absolute', left: 20, top: 190 }} />
          </div>
          <SkillsGrid />
        </div>
      </Section>

      <Section title="about-me" lineWidth={326} className="about-preview">
        <div className="about-preview__grid">
          <div className="about-text">
            <p>Hello, i'm {profile.name}!</p>
            <p>{summary[0]}</p>
            <p>{summary[1]}</p>
            <Link to="/about-me" className="btn btn--primary">
              Read more -&gt;
            </Link>
          </div>
          <div className="about-stats">
            <Dots cols={5} rows={4} className="about-stats__dots" />
            <div className="stat">
              <b>{profile.experience}</b>
              <span>years of IT experience</span>
            </div>
            <div className="stat">
              <b>{projects.length}</b>
              <span>enterprise projects</span>
            </div>
            <div className="stat">
              <b>{experience.length}</b>
              <span>companies</span>
            </div>
          </div>
        </div>
      </Section>

      <Section title="contacts" lineWidth={127}>
        <div className="contacts">
          <p className="contacts__text">{home.contactIntro}</p>
          <div className="contact-box">
            <h3>Message me here</h3>
            <ContactList />
          </div>
        </div>
      </Section>
    </>
  );
}
