import { PageTitle, Section } from '../components/Section';
import { FileIcon, MailIcon, PhoneIcon, PinIcon } from '../components/Icons';
import { Dots, Square } from '../components/Decor';
import { home, pageSubtitles, profile } from '../data/resume';

export function Contacts() {
  const tel = profile.phone.replace(/\s/g, '');

  return (
    <>
      <PageTitle title="contacts" subtitle={pageSubtitles.contacts} />
      <Dots cols={3} rows={3} className="deco deco--left" style={{ top: 420 }} />
      <Square size={130} className="deco deco--right" style={{ top: 230 }} />

      <section className="contacts contacts--page">
        <p className="contacts__text">{home.contactIntro}</p>
        <div className="contacts__boxes">
          <div className="contact-box">
            <h3>Find me here</h3>
            <span>
              <PinIcon size={22} /> {profile.address}
            </span>
          </div>
          <div className="contact-box">
            <h3>Message me here</h3>
            <a href={`tel:${tel}`}>
              <PhoneIcon size={22} /> {profile.phone}
            </a>
            <a href={`mailto:${profile.email}`}>
              <MailIcon size={22} /> {profile.email}
            </a>
          </div>
        </div>
      </section>

      <Section title="all-media">
        <div className="all-media">
          <a href={`mailto:${profile.email}`}>
            <MailIcon size={26} /> {profile.email}
          </a>
          <a href={`tel:${tel}`}>
            <PhoneIcon size={26} /> {profile.phone}
          </a>
          <a href={profile.resumeFile} download>
            <FileIcon size={26} /> Resume (.docx)
          </a>
        </div>
      </Section>
    </>
  );
}
