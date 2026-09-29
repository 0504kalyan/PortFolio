import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { CloseIcon, Logo } from './Icons';
import { MediaLinks } from './MediaLinks';
import { profile } from '../data/resume';

const links = [
  { to: '/', label: 'home' },
  { to: '/works', label: 'works' },
  { to: '/about-me', label: 'about-me' },
  { to: '/contacts', label: 'contacts' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="logo">
          <Logo />
          <span>{profile.shortName}</span>
        </Link>

        <nav className="nav" aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end className="nav__link">
              <span className="hash">#</span>
              {l.label}
            </NavLink>
          ))}
          <a className="nav__cv" href={profile.resumeFile} download>
            CV
          </a>
        </nav>

        <button
          className="burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? (
            <CloseIcon size={34} />
          ) : (
            <span className="burger__lines">
              <span />
              <span />
            </span>
          )}
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          <nav className="mobile-menu__nav" aria-label="Mobile">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end className="mobile-menu__link">
                <span className="hash">#</span>
                {l.label}
              </NavLink>
            ))}
            <a className="mobile-menu__link mobile-menu__cv" href={profile.resumeFile} download>
              CV
            </a>
          </nav>
          <div className="mobile-menu__media">
            <MediaLinks size={48} />
          </div>
        </div>
      )}
    </header>
  );
}
