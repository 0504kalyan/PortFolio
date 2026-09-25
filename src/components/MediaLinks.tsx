import { FileIcon, MailIcon, PhoneIcon } from './Icons';
import { profile } from '../data/resume';

export function MediaLinks({ size = 32 }: { size?: number }) {
  return (
    <>
      <a href={`mailto:${profile.email}`} aria-label="Email" title={profile.email}>
        <MailIcon size={size} />
      </a>
      <a href={`tel:${profile.phone.replace(/\s/g, '')}`} aria-label="Phone" title={profile.phone}>
        <PhoneIcon size={size} />
      </a>
      <a href={profile.resumeFile} download aria-label="Download resume" title="Download resume">
        <FileIcon size={size} />
      </a>
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
