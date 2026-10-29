import Link from 'next/link';
import { notFound } from 'next/navigation';
import projects, { sortedProjects, getProject } from '../../../content/projects';
import Figure from '../../../components/Figure';
import Section from '../../../components/Section';
import Separated from '../../../components/Separated';
import { Inline } from '../../../components/RichText';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.headline };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = sortedProjects.findIndex((p) => p.slug === slug);
  const prev = sortedProjects[index - 1];
  const next = sortedProjects[index + 1];
  const { demo, code } = project.links || {};

  return (
    <article>
      <Link className="back" href="/#work">
        All work
      </Link>

      <header className="project-head">
        <h1>{project.title}</h1>
        <p className="label-meta">
          <Separated items={[project.year, project.stack.join(', ')]} />
        </p>
        <p className="lead">{project.headline}</p>
        {(demo || code) && (
          <div className="project-links">
            {demo && (
              <a className="button" href={demo}>
                View demo
              </a>
            )}
            {code && (
              <a className="button" href={code}>
                View code
              </a>
            )}
          </div>
        )}
      </header>

      <Figure figure={project.cover} />

      {project.impact && project.impact.length > 0 && (
        <section className="section">
          <h2>Impact</h2>
          <ul>
            {project.impact.map((line, i) => (
              <li key={i}>
                <Inline text={line} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.sections.map((section, i) => (
        <Section key={i} section={section} />
      ))}

      <nav className="project-pager" aria-label="More projects">
        {prev ? (
          <Link href={`/projects/${prev.slug}/`}>
            <p className="eyebrow">Previous</p>
            <span className="name">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link className="next" href={`/projects/${next.slug}/`}>
            <p className="eyebrow">Next</p>
            <span className="name">{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
