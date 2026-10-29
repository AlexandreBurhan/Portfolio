import site from '../../content/site';
import Separated from '../../components/Separated';
import { Paragraphs } from '../../components/RichText';

export const metadata = { title: 'About', description: site.description };

export default function About() {
  return (
    <section className="about prose">
      <h1>{site.about.heading}</h1>
      <Paragraphs items={site.about.body} />
      {site.cv && (
        <p>
          <a className="button" href={site.cv}>
            Download CV (PDF)
          </a>
        </p>
      )}
      <p className="contact-line" style={{ marginTop: 40 }}>
        <Separated
          items={[
            <a key="e" href={`mailto:${site.email}`}>
              {site.email}
            </a>,
            <a key="l" href={site.linkedin}>
              LinkedIn
            </a>,
            <a key="g" href={site.github}>
              GitHub
            </a>,
          ]}
        />
      </p>
    </section>
  );
}
