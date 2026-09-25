import type { ComponentType } from 'react';
import { LinkedinIcon, MailIcon, PhoneIcon } from './Icons';
import { profile } from '../data/resume';

type Contact = {
  key: string;
  label: string;
  text: string;
  href: string;
  external?: boolean;
  Icon: ComponentType<{ size?: number }>;
};

/** Email, LinkedIn, phone — the one contact list used everywhere on the site. */
export const contacts: Contact[] = [
  { key: 'email', label: 'Email', text: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    text: profile.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
    href: profile.linkedin,
    external: true,
    Icon: LinkedinIcon,
  },
  { key: 'phone', label: 'Phone', text: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, Icon: PhoneIcon },
];

const linkProps = (c: Contact) => (c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {});

/** Icon-only links (side rail, footer, mobile menu). */
export function MediaLinks({ size = 32 }: Readonly<{ size?: number }>) {
  return (
    <>
      {contacts.map((c) => (
        <a key={c.key} href={c.href} aria-label={c.label} title={c.text} {...linkProps(c)}>
          <c.Icon size={size} />
        </a>
      ))}
    </>
  );
}

/** Icon + text links (contact boxes, #all-media). */
export function ContactList({ size = 22 }: Readonly<{ size?: number }>) {
  return (
    <>
      {contacts.map((c) => (
        <a key={c.key} href={c.href} aria-label={`${c.label}: ${c.text}`} {...linkProps(c)}>
          <c.Icon size={size} /> {c.text}
        </a>
      ))}
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
