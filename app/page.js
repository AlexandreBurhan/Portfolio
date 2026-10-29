import Link from 'next/link';
import site from '../content/site';
import { heroProjects, secondaryProjects } from '../content/projects';
import DayStrip from '../components/DayStrip';
import Label from '../components/Label';
import Figure from '../components/Figure';
import Separated from '../components/Separated';
import { Paragraphs } from '../components/RichText';

function Room({ project }) {
  const href = `/projects/${project.slug}/`;
  return (
    <article className="room" aria-labelledby={`room-${project.slug}`}>
      <Label project={project} />
      <h3 className="headline" id={`room-${project.slug}`}>
        <Link href={href}>{project.headline}</Link>
      </h3>
      <Figure figure={project.cover} />
      <p className="summary prose">{project.summary}</p>
      <Link className="more" href={href} aria-label={`Read the full case: ${project.title}`}>
        Read the full case
      </Link>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <section className="intro" aria-labelledby="name">
        <h1 id="name">{site.name}</h1>
        <p className="disciplines">
          <Separated items={site.disciplines} />
        </p>
        <p className="experience">
          <Separated items={site.experience} />
        </p>
        <DayStrip />
        <div className="intro-text prose">
          <Paragraphs items={site.intro} />
        </div>
      </section>

      <section className="rooms" id="work" aria-labelledby="work-heading">
        <h2 className="eyebrow" id="work-heading">
          Selected work
        </h2>
        {heroProjects.map((project, i) => (
          <div key={project.slug}>
            {i > 0 && <DayStrip variant="divider" />}
            <Room project={project} />
          </div>
        ))}
      </section>

      {secondaryProjects.length > 0 && (
        <section className="block" aria-labelledby="also-heading">
          <h2 className="eyebrow" id="also-heading">
            Also built
          </h2>
          <ul className="secondary">
            {secondaryProjects.map((p) => (
              <li key={p.slug}>
                <p className="label-meta">
                  <Separated items={[p.year, p.stack.join(', ')]} />
                </p>
                <h3 className="title">
                  <Link href={`/projects/${p.slug}/`}>{p.title}</Link>
                </h3>
                <p>{p.headline}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="block" aria-labelledby="theme-heading">
        <div className="theme prose">
          <h2 className="serif-heading" id="theme-heading">
            {site.theme.heading}
          </h2>
          <Paragraphs items={site.theme.body} />
        </div>
      </section>

      <section className="block" aria-labelledby="tools-heading">
        <h2 className="eyebrow" id="tools-heading">
          Tools
        </h2>
        <dl className="tools">
          {site.tools.map((t) => (
            <div key={t.family} style={{ display: 'contents' }}>
              <dt>{t.family}</dt>
              <dd>
                <Separated items={t.items} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="block background prose" aria-labelledby="bg-heading">
        <h2 className="eyebrow" id="bg-heading">
          Before workforce management
        </h2>
        <Paragraphs items={site.background} />
        <p className="location">{site.location}</p>
      </section>

      <section className="block" id="contact" aria-labelledby="contact-heading">
        <h2 className="eyebrow" id="contact-heading">
          Contact
        </h2>
        <p className="contact-line">
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
    </>
  );
}
