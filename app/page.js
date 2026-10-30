import Link from 'next/link';
import site from '../content/site';
import projects, { heroProjects, secondaryProjects } from '../content/projects';
import Label from '../components/Label';
import { DIAGRAMS } from '../components/Figure';
import Separated from '../components/Separated';
import { Paragraphs } from '../components/RichText';

// One row per project: the screenshot on the left, the label and the case on
// the right. Diagram covers have no image, so a project can name a `thumb`.
function ProjectRow({ project }) {
  const href = `/projects/${project.slug}/`;
  // A video cover shows its poster frame in the list.
  const cover = project.cover?.video ? { ...project.cover, src: project.cover.poster } : project.cover;
  const thumb = project.thumb || (cover?.src ? cover : null);
  // No image at all: a diagram cover is shown live in the same mat.
  const Diagram = !thumb && cover?.diagram ? DIAGRAMS[cover.diagram] : null;
  return (
    <article className={`project-row${thumb || Diagram ? '' : ' no-thumb'}`} aria-labelledby={`row-${project.slug}`}>
      {Diagram && (
        <Link className="thumb diagram-thumb" href={href} tabIndex={-1} aria-hidden="true">
          <Diagram />
        </Link>
      )}
      {thumb && (
        <Link className="thumb" href={href} tabIndex={-1} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumb.src} alt="" width={thumb.width} height={thumb.height} loading="lazy" decoding="async" />
        </Link>
      )}
      <div className="row-body">
        <Label project={project} />
        <h3 className="headline" id={`row-${project.slug}`}>
          <Link href={href}>{project.headline}</Link>
        </h3>
        <p className="summary">{project.summary}</p>
        <Link className="button" href={href} aria-label={`Read the case: ${project.title}`}>
          Read the case
        </Link>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <section className={`intro hero${site.photo?.src ? ' has-photo' : ''}`} aria-labelledby="name">
        {site.photo?.src && (
          <div className="portrait-ring">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="portrait" src={site.photo.src} alt={site.photo.alt} width="520" height="520" />
          </div>
        )}
        <div className="hero-text">
          <h1 id="name">{site.name}</h1>
          <p className="disciplines">
            <Separated items={site.disciplines} />
          </p>
          <p className="tagline">{site.tagline}</p>
          <p className="hero-tools">
            <Separated items={site.heroTools} />
          </p>
          <p className="experience">
            <Separated items={site.experience} />
          </p>
          <a className="button primary" href="#work">
            See my work
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
              <path d="M8 2v11M3.5 8.5 8 13l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </a>
        </div>
      </section>

      <section className={`band intro-band${site.cv ? ' has-resume' : ''}`} aria-label="Introduction">
        <div className="intro-text prose">
          <Paragraphs items={site.intro} />
        </div>
        {site.cv && (
          <aside className="resume-card" aria-labelledby="resume-heading">
            <p className="eyebrow">Resume</p>
            <h2 className="resume-title" id="resume-heading">
              {site.resume.heading}
            </h2>
            <p>{site.resume.body}</p>
            <a className="button" href={site.cv}>
              View resume
            </a>
          </aside>
        )}
      </section>

      {site.services.length > 0 && (
        <section className="block services" id="what-i-do" aria-labelledby="services-heading">
          <h2 className="display-heading" id="services-heading">
            What I do
          </h2>
          <ul className="service-list">
            {site.services.map((service) => {
              const project = service.project && projects.find((p) => p.slug === service.project);
              return (
                <li key={service.title}>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-body">{service.body}</p>
                  {service.tools?.length > 0 && (
                    <p className="label-meta">
                      <Separated items={service.tools} />
                    </p>
                  )}
                  {project && (
                    <Link className="service-link" href={`/projects/${project.slug}/`}>
                      See it in {project.title}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="rooms" id="work" aria-labelledby="work-heading">
        <h2 className="display-heading work-heading" id="work-heading">
          Selected work
        </h2>
        {heroProjects.map((project) => (
          <ProjectRow key={project.slug} project={project} />
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

      <section className="block band" aria-labelledby="theme-heading">
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

      {site.credentials.length > 0 && (
        <section className="block" aria-labelledby="cred-heading">
          <h2 className="display-heading" id="cred-heading">
            Education and certifications
          </h2>
          <ul className={`credentials${site.credentials.some((c) => c.image) ? ' has-images' : ''}`}>
            {site.credentials.map((c) => (
              <li key={`${c.title}-${c.year}`} className={c.image ? '' : 'no-image'}>
                {c.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.image.src} alt="" width={c.image.width} height={c.image.height} loading="lazy" decoding="async" />
                )}
                <div>
                  <p className="cred-title">{c.title}</p>
                  <p className="label-meta">
                    <Separated items={[c.issuer, c.year].filter(Boolean)} />
                  </p>
                  {c.link && (
                    <a className="cred-link" href={c.link}>
                      View credential
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="block band contact" id="contact" aria-labelledby="contact-heading">
        <div>
          <h2 className="display-heading" id="contact-heading">
            {site.contact.heading}
          </h2>
          <Paragraphs items={site.contact.body} />
        </div>
        <dl className="contact-list">
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </dd>
          </div>
          <div>
            <dt>LinkedIn</dt>
            <dd>
              <a href={site.linkedin}>{site.linkedin.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, '')}</a>
            </dd>
          </div>
          <div>
            <dt>GitHub</dt>
            <dd>
              <a href={site.github}>{site.github.replace(/^https:\/\//, '')}</a>
            </dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>{site.location}</dd>
          </div>
        </dl>
      </section>
    </>
  );
}
