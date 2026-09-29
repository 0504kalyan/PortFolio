import { TbArrowUp } from 'react-icons/tb';
import { usePortfolio } from '../content/PortfolioContext';
import { useContactItems } from './Contact';

export function Footer() {
  const { profile } = usePortfolio();
  const contactItems = useContactItems();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="brand brand--footer">
          <span className="brand__mark">{profile.initials}</span>
          <span className="brand__text">
            <b>{profile.name}</b>
            <small>{profile.role}</small>
          </span>
        </div>
        <nav className="footer__links" aria-label="Contact">
          {contactItems
            .filter((c) => c.href)
            .map(({ key, label, href, external, Icon }) => (
              <a
                key={key}
                href={href}
                aria-label={label}
                title={label}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          <a href="#top" aria-label="Back to top" title="Back to top">
            <TbArrowUp aria-hidden="true" />
          </a>
        </nav>
      </div>
      <p className="container footer__copy">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  );
}
