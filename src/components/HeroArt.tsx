import { Dots, Squares } from './Decor';
import { ProfilePhoto } from './ProfilePhoto';
import { profile } from '../data/resume';

/** Hero visual: profile.photo when set, otherwise a terminal-style code window. */
export function HeroArt() {
  return (
    <div className="hero-art">
      <Squares className="hero-art__squares" />
      <ProfilePhoto
        className="hero-art__photo"
        fallback={
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
        }
      />
      <Dots className="hero-art__dots" />
      <div className="status">
        <span className="status__dot" />
        <span>
          Currently working on <b>{profile.currentProject}</b>
        </span>
      </div>
    </div>
  );
}
