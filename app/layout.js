import '@fontsource-variable/source-serif-4';
import '@fontsource-variable/inter';
import './globals.css';
import Link from 'next/link';
import site from '../content/site';
import Separated from '../components/Separated';

export const metadata = {
  title: {
    default: `${site.name} | ${site.disciplines.join(', ')}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fafaf9',
};

export default function RootLayout({ children }) {
  const year = new Date().getFullYear();
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="wrap">
          <nav className="site-nav" aria-label="Main">
            <Link className="home" href="/">
              {site.name}
            </Link>
            <ul>
              <li>
                <Link href="/#work">Work</Link>
              </li>
              <li>
                <Link href="/about/">About</Link>
              </li>
              <li>
                <Link href="/#contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main id="main" className="wrap">
          {children}
        </main>
        <footer className="wrap">
          <div className="site-footer">
            <span>
              {site.name}, {year}
            </span>
            <span>
              <Separated
                items={[
                  <a key="e" href={`mailto:${site.email}`}>
                    Email
                  </a>,
                  <a key="l" href={site.linkedin}>
                    LinkedIn
                  </a>,
                  <a key="g" href={site.github}>
                    GitHub
                  </a>,
                ]}
              />
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
