import { Fragment, useState, type KeyboardEvent } from 'react';
import { Dots, Squares } from './Decor';
import { ProfilePhoto } from './ProfilePhoto';
import { usePortfolio } from '../content/PortfolioContext';

type Layer = 'card' | 'photo';

/** Props that make a layer clickable (and keyboard-operable) to bring it to the front. */
function layerProps(layer: Layer, front: Layer, bringToFront: (layer: Layer) => void, label: string) {
  return {
    role: 'button',
    tabIndex: 0,
    'aria-label': label,
    'aria-pressed': front === layer,
    onClick: () => bringToFront(layer),
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        bringToFront(layer);
      }
    },
  };
}

/** The Stack array in the code window, two strings per line. */
function StackLines({ stack }: Readonly<{ stack: string[] }>) {
  const lines: string[][] = [];
  for (let i = 0; i < stack.length; i += 2) lines.push(stack.slice(i, i + 2));
  if (!lines.length) return <>{'    [];\n'}</>;
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i === 0 ? '    [' : '     '}
          {line.map((s, j) => (
            <Fragment key={j}>
              {j > 0 && ', '}
              <span className="s">"{s}"</span>
            </Fragment>
          ))}
          {i === lines.length - 1 ? '];' : ','}
          {'\n'}
        </Fragment>
      ))}
    </>
  );
}

/**
 * Hero visual: a terminal-style code window. When profile.profileImage is set, the photo sits
 * behind it as a framed print and the window overlaps its lower-left corner. Clicking
 * either layer brings it to the front.
 */
export function HeroArt() {
  const { profile } = usePortfolio();
  const [front, setFront] = useState<Layer>('card');
  const stacked = Boolean(profile.profileImage);

  return (
    <div className="hero-art">
      <Squares className="hero-art__squares" />
      <ProfilePhoto
        src={profile.profileImage}
        className={`hero-art__photo ${front === 'photo' ? 'is-front' : ''}`}
        {...layerProps('photo', front, setFront, 'Show photo')}
      />
      <div
        className={`hero-art__card ${front === 'card' ? 'is-front' : ''}`}
        {...(stacked ? layerProps('card', front, setFront, 'Show developer card') : {})}
      >
        <div className="hero-art__window">
          <div className="hero-art__bar">
            <span />
            <span />
            <span />
            <em>Developer.cs</em>
          </div>
          <pre className="hero-art__code">
            <code>
              <span className="k">public class</span> <span className="t">Developer</span>
              {'\n{\n'}
              {'  '}<span className="k">public string</span> Name =&gt; <span className="s">"{profile.name}"</span>;{'\n'}
              {'  '}<span className="k">public double</span> Years =&gt; <span className="n">{profile.yearsOfExperience}</span>;{'\n'}
              {'  '}<span className="k">public string</span>[] Stack =&gt;{'\n'}
              <StackLines stack={profile.techStack} />
              {'}'}
            </code>
          </pre>
        </div>
        {profile.currentProject && (
          <div className="status">
            <span className="status__dot" />
            <span>
              Currently working on <b>{profile.currentProject}</b>
            </span>
          </div>
        )}
      </div>
      <Dots className="hero-art__dots" />
    </div>
  );
}
