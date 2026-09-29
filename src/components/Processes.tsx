import { useState, type KeyboardEvent } from 'react';
import { TbCheck, TbRoute } from 'react-icons/tb';
import { usePortfolio } from '../content/PortfolioContext';
import { SectionHeading } from './SectionHeading';

export function Processes() {
  const { processFlows } = usePortfolio();
  const [key, setKey] = useState(processFlows[0]?.id ?? '');
  const flow = processFlows.find((f) => f.id === key) ?? processFlows[0];

  /** Arrow keys move between tabs, as in the WAI-ARIA tabs pattern. */
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const i = processFlows.findIndex((f) => f.id === flow.id);
    const next = processFlows[(i + (e.key === 'ArrowRight' ? 1 : -1) + processFlows.length) % processFlows.length];
    setKey(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };

  if (!flow) return null;

  return (
    <section className="section section--tint" id="processes">
      <div className="container">
        <SectionHeading
          eyebrow="End-to-end processes"
          title="How finance flows through the tenant"
          intro="The business processes I have configured, step by step, with what was set up at each stage."
        />

        <div className="flow-tabs" role="tablist" aria-label="Finance processes" onKeyDown={onKeyDown}>
          {processFlows.map((f) => (
            <button
              key={f.id}
              id={`tab-${f.id}`}
              role="tab"
              aria-selected={f.id === flow.id}
              aria-controls="flow-panel"
              tabIndex={f.id === flow.id ? 0 : -1}
              className={`flow-tab ${f.id === flow.id ? 'is-active' : ''}`}
              onClick={() => setKey(f.id)}
            >
              {f.name}
            </button>
          ))}
        </div>

        <div className="screen screen--wide" role="tabpanel" id="flow-panel" aria-labelledby={`tab-${flow.id}`}>
          <div className="screen__bar">
            <span className="screen__title">
              <TbRoute aria-hidden="true" /> {flow.name}
            </span>
            <span className="screen__caption">{flow.caption}</span>
          </div>
          <ol className="flow" key={flow.id}>
            {flow.steps.map((s, i) => (
              <li key={s.title} className="flow__step">
                <span className="flow__num">{i + 1}</span>
                <h3>{s.title}</h3>
                <ul>
                  {s.items.map((it) => (
                    <li key={it}>
                      <TbCheck aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
