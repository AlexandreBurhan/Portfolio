import { asset } from '../components/asset';
import './globals.css';
import Link from 'next/link';
import site from '../content/site';
import Separated from '../components/Separated';
import ThemeToggle from '../components/ThemeToggle';

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

const THEME_SCRIPT = `try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }) {
  const year = new Date().getFullYear();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Sets the theme before the first paint: the saved choice, else the device setting. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="global-nav">
          <nav className="wrap site-nav" aria-label="Main">
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
                  <a href={asset(site.cv)}>CV</a>
                </li>
              )}
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </nav>
        </header>
        <main id="main" className="wrap">
          {children}
        </main>
        <footer className="site-foot">
          <div className="wrap site-footer">
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
