import { PageTitle, Section } from '../components/Section';
import { PinIcon } from '../components/Icons';
import { ContactList } from '../components/MediaLinks';
import { Dots, Square } from '../components/Decor';
import { usePortfolio } from '../content/PortfolioContext';

export function Contacts() {
  const { home, pageSubtitles, profile } = usePortfolio();
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
              <PinIcon size={22} /> {profile.location}
            </span>
          </div>
          <div className="contact-box">
            <h3>Message me here</h3>
            <ContactList />
          </div>
        </div>
      </section>

      <Section title="all-media">
        <div className="all-media">
          <ContactList size={26} />
        </div>
      </Section>
    </>
  );
}
