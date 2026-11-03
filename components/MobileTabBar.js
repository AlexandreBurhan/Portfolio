'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Phone-only tab bar at the bottom of the screen, in the style of iOS: a
// floating glass bar whose highlight slides from one tab to the next. On the
// home page the active tab follows the section in view.
const TABS = [
  { id: 'home', label: 'Home', href: '/', icon: 'M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1z' },
  { id: 'what-i-do', label: 'Services', href: '/#what-i-do', icon: 'M5 5h6v6H5zM13 5h6v6h-6zM5 13h6v6H5zM13 13h6v6h-6z' },
  { id: 'work', label: 'Work', href: '/#work', icon: 'M4 8h16v11H4zM9 8V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2' },
  { id: 'about', label: 'About', href: '/about/', icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20a7.5 7.5 0 0 1 15 0' },
  { id: 'contact', label: 'Contact', href: '/#contact', icon: 'M4 6h16v12H4zM4 7l8 6 8-6' },
];

function tabForPath(path) {
  if (path.startsWith('/about')) return 'about';
  if (path.startsWith('/projects')) return 'work';
  return null;
}

export default function MobileTabBar() {
  const pathname = usePathname() || '/';
  const [active, setActive] = useState(tabForPath(pathname) || 'home');
  const listRef = useRef(null);
  const [pill, setPill] = useState(null);

  // Home page: the tab follows the section in view.
  useEffect(() => {
    const fixed = tabForPath(pathname);
    if (fixed) {
      setActive(fixed);
      return undefined;
    }
    const ids = ['what-i-do', 'work', 'contact'];
    const onScroll = () => {
      const line = window.innerHeight * 0.4;
      let current = 'home';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < line) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  // Move the glass highlight under the active tab.
  useEffect(() => {
    const place = () => {
      const list = listRef.current;
      const el = list?.querySelector(`[data-tab="${active}"]`);
      if (!el) return;
      setPill({ x: el.offsetLeft, w: el.offsetWidth });
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [active]);

  return (
    <nav className="tab-bar" aria-label="Sections">
      <ul ref={listRef}>
        {pill && (
          <li
            className="tab-pill"
            aria-hidden="true"
            style={{ transform: `translateX(${pill.x}px)`, width: `${pill.w}px` }}
          />
        )}
        {TABS.map((tab) => (
          <li key={tab.id} data-tab={tab.id}>
            <Link
              href={tab.href}
              className={active === tab.id ? 'is-active' : undefined}
              aria-current={active === tab.id ? 'page' : undefined}
              onClick={() => {
                setActive(tab.id);
                if (tab.id === 'home' && pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
                <path d={tab.icon} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
              <span>{tab.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
