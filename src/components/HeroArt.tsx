import { useState, type KeyboardEvent } from 'react';
import { Dots, Squares } from './Decor';
import { ProfilePhoto } from './ProfilePhoto';
import { profile } from '../data/resume';

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

/**
 * Hero visual: a terminal-style code window. When profile.photo is set, the photo sits
 * behind it as a framed print and the window overlaps its lower-left corner. Clicking
 * either layer brings it to the front.
 */
export function HeroArt() {
  const [front, setFront] = useState<Layer>('card');
  const stacked = Boolean(profile.photo);

  return (
    <div className="hero-art">
      <Squares className="hero-art__squares" />
      <ProfilePhoto
        src={profile.photo}
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
              {'  '}<span className="k">public double</span> Years =&gt; <span className="n">{profile.experience}</span>;{'\n'}
              {'  '}<span className="k">public string</span>[] Stack =&gt;{'\n'}
              {'    '}[<span className="s">"ASP.NET Core"</span>, <span className="s">"Web API"</span>,{'\n'}
              {'     '}<span className="s">"Angular"</span>, <span className="s">"React"</span>,{'\n'}
              {'     '}<span className="s">"SQL Server"</span>];{'\n'}
              {'}'}
            </code>
          </pre>
        </div>
        <div className="status">
          <span className="status__dot" />
          <span>
            Currently working on <b>{profile.currentProject}</b>
          </span>
        </div>
      </div>
      <Dots className="hero-art__dots" />
    </div>
  );
}
