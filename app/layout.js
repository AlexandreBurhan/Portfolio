import '@fontsource-variable/literata/opsz.css';
import '@fontsource-variable/literata/opsz-italic.css';
import '@fontsource-variable/schibsted-grotesk';
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
  themeColor: '#13233a',
};

export default function RootLayout({ children }) {
  const year = new Date().getFullYear();
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="wrap band band-nav">
          <nav className="site-nav" aria-label="Main">
            <ul>
              <li>
                <Link href="/#what-i-do">Services</Link>
              </li>
              <li>
                <Link href="/#work">Work</Link>
              </li>
              <li>
                <Link href="/about/">About</Link>
              </li>
              <li>
                <Link href="/#contact">Contact</Link>
              </li>
              {site.cv && (
                <li>
                  <a href={site.cv}>CV</a>
                </li>
              )}
            </ul>
          </nav>
        </header>
        <main id="main" className="wrap">
          {children}
        </main>
        <footer className="wrap band band-foot">
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
