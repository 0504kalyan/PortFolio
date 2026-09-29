import { Logo } from './Icons';
import { MediaLinks } from './MediaLinks';
import { usePortfolio } from '../content/PortfolioContext';

export function Footer() {
  const { profile } = usePortfolio();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <div className="footer__brand">
              <span className="logo">
                <Logo />
                <span>{profile.shortName}</span>
              </span>
              <a href={`mailto:${profile.email}`} className="footer__email">
                {profile.email}
              </a>
            </div>
            <p className="footer__role">{[profile.title, profile.footerTagline].filter(Boolean).join(' · ')}</p>
          </div>
          <div className="footer__media">
            <h3>Media</h3>
            <div className="footer__icons">
              <MediaLinks size={28} />
            </div>
          </div>
        </div>
        <p className="footer__copy">
          © Copyright {new Date().getFullYear()}. Made by {profile.name}
        </p>
      </div>
    </footer>
  );
}
