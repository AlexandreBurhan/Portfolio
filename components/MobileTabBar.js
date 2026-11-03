'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// Phone-only tab bar at the bottom of the screen, in the style of iOS: a
// floating glass bar whose highlight slides from one tab to the next. Tap a
// tab, or put a finger on the bar and slide: the glass follows the finger and
// settles on the nearest tab when it lifts. On the home page the active tab
// follows the section in view.
const TABS = [
  { id: 'home', label: 'Home', href: '/', icon: 'M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1z' },
  { id: 'what-i-do', label: 'Services', href: '/#what-i-do', icon: 'M5 5h6v6H5zM13 5h6v6h-6zM5 13h6v6H5zM13 13h6v6h-6z' },
  { id: 'work', label: 'Work', href: '/#work', icon: 'M4 8h16v11H4zM9 8V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2' },
  { id: 'about', label: 'About', href: '/about/', icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20a7.5 7.5 0 0 1 15 0' },
  { id: 'contact', label: 'Contact', href: '/#contact', icon: 'M4 6h16v12H4zM4 7l8 6 8-6' },
];

// Below this distance a touch is a tap, and the link handles it.
const DRAG_THRESHOLD = 6;

function tabForPath(path) {
  if (path.startsWith('/about')) return 'about';
  if (path.startsWith('/projects')) return 'work';
  return null;
}

export default function MobileTabBar() {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const [active, setActive] = useState(tabForPath(pathname) || 'home');
  const [pill, setPill] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(null); // tab under the finger while dragging
  const listRef = useRef(null);
  const drag = useRef(null); // { startX, offset, moved }
  const suppressClick = useRef(false);
  const lockSpy = useRef(0); // time until which scrolling does not move the tab

  // Home page: the tab follows the section in view.
  useEffect(() => {
    const fixed = tabForPath(pathname);
    if (fixed) {
      setActive(fixed);
      return undefined;
    }
    const ids = ['what-i-do', 'work', 'contact'];
    const onScroll = () => {
      if (Date.now() < lockSpy.current) return;
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

  // Rest the glass highlight under the active tab.
  useEffect(() => {
    const place = () => {
      const el = listRef.current?.querySelector(`[data-tab="${active}"]`);
      if (el) setPill({ x: el.offsetLeft, w: el.offsetWidth });
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [active]);

  function go(tab) {
    setActive(tab.id);
    lockSpy.current = Date.now() + 1000;
    const [path, hash] = tab.href.split('#');
    if (pathname === '/' && path === '/') {
      const target = hash ? document.getElementById(hash) : null;
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    router.push(tab.href);
  }

  // Finger down on the bar: remember where, without taking over yet.
  function onPointerDown(e) {
    if (!pill) return;
    const box = listRef.current.getBoundingClientRect();
    drag.current = { startX: e.clientX, left: box.left, width: box.width, moved: false };
  }

  // Past the threshold, the glass follows the finger.
  function onPointerMove(e) {
    const d = drag.current;
    if (!d) return;
    if (!d.moved && Math.abs(e.clientX - d.startX) < DRAG_THRESHOLD) return;
    if (!d.moved) {
      d.moved = true;
      setDragging(true);
      listRef.current.setPointerCapture?.(e.pointerId);
    }
    const tabWidth = d.width / TABS.length;
    const x = Math.min(Math.max(e.clientX - d.left - tabWidth / 2, 0), d.width - tabWidth);
    setPill({ x, w: tabWidth });
    setHovered(TABS[Math.round(x / tabWidth)].id);
  }

  // Finger up: settle on the nearest tab and open it.
  function onPointerUp(e) {
    const d = drag.current;
    drag.current = null;
    if (!d || !d.moved) return;
    setDragging(false);
    setHovered(null);
    suppressClick.current = true;
    const index = Math.min(TABS.length - 1, Math.max(0, Math.floor((e.clientX - d.left) / (d.width / TABS.length))));
    go(TABS[index]);
  }

  function onPointerCancel() {
    drag.current = null;
    setDragging(false);
    setHovered(null);
    const el = listRef.current?.querySelector(`[data-tab="${active}"]`);
    if (el) setPill({ x: el.offsetLeft, w: el.offsetWidth });
  }

  return (
    <nav className={`tab-bar${dragging ? ' is-dragging' : ''}`} aria-label="Sections">
      <ul
        ref={listRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        {pill && (
          <li
            className="tab-pill"
            aria-hidden="true"
            style={{ transform: `translateX(${pill.x}px)`, width: `${pill.w}px` }}
          />
        )}
        {TABS.map((tab) => {
          const lit = (hovered || active) === tab.id;
          return (
          <li key={tab.id} data-tab={tab.id}>
            <Link
              href={tab.href}
              className={lit ? 'is-active' : undefined}
              aria-current={active === tab.id ? 'page' : undefined}
              draggable={false}
              onClick={(e) => {
                e.preventDefault();
                if (suppressClick.current) {
                  suppressClick.current = false;
                  return;
                }
                go(tab);
              }}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
                <path d={tab.icon} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
              <span>{tab.label}</span>
            </Link>
          </li>
          );
        })}
      </ul>
    </nav>
  );
}
