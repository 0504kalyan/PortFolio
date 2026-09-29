import type { ComponentType } from 'react';
import { TbBrandGithub, TbBrandX, TbWorld } from 'react-icons/tb';
import { LinkedinIcon, MailIcon, PhoneIcon } from './Icons';
import { usePortfolio } from '../content/PortfolioContext';
import type { ContactKind, ContactView } from '../content/view';

const icons: Record<ContactKind, ComponentType<{ size?: number }>> = {
  email: MailIcon,
  linkedin: LinkedinIcon,
  phone: PhoneIcon,
  github: ({ size }) => <TbBrandGithub size={size} aria-hidden="true" />,
  twitter: ({ size }) => <TbBrandX size={size} aria-hidden="true" />,
  website: ({ size }) => <TbWorld size={size} aria-hidden="true" />,
};

const linkProps = (c: ContactView) => (c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {});

/** Icon-only links (side rail, footer, mobile menu). Email, LinkedIn, phone, then any other social links. */
export function MediaLinks({ size = 32 }: Readonly<{ size?: number }>) {
  const { contacts } = usePortfolio();
  return (
    <>
      {contacts.map((c) => {
        const Icon = icons[c.key];
        return (
          <a key={c.key} href={c.href} aria-label={c.label} title={c.text} {...linkProps(c)}>
            <Icon size={size} />
          </a>
        );
      })}
    </>
  );
}

/** Icon + text links (contact boxes, #all-media). */
export function ContactList({ size = 22 }: Readonly<{ size?: number }>) {
  const { contacts } = usePortfolio();
  return (
    <>
      {contacts.map((c) => {
        const Icon = icons[c.key];
        return (
          <a key={c.key} href={c.href} aria-label={`${c.label}: ${c.text}`} {...linkProps(c)}>
            <Icon size={size} /> {c.text}
          </a>
        );
      })}
    </>
  );
}

export function SideMedia() {
  return (
    <aside className="side-media" aria-label="Contact links">
      <span className="side-media__line" />
      <MediaLinks size={30} />
    </aside>
  );
}
