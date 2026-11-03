'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// An image that grows to fill the screen when clicked, starting from where it
// sits on the page, and shrinks back on close (click, Escape or the button).
// The overlay is mounted on <html>, outside <body>, so its size and
// position are plain viewport pixels.
const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)';

export default function ZoomImage({ src, alt, width, height, className, loading = 'lazy' }) {
  const thumbRef = useRef(null);
  const bigRef = useRef(null);
  const closeRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [host, setHost] = useState(null);

  useEffect(() => {
    const el = document.createElement('div');
    document.documentElement.appendChild(el);
    setHost(el);
    return () => el.remove();
  }, []);

  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Transform that puts the big image exactly over the thumbnail.
  function fromThumb() {
    const a = thumbRef.current.getBoundingClientRect();
    const b = bigRef.current.getBoundingClientRect();
    return `translate(${a.left - b.left}px, ${a.top - b.top}px) scale(${a.width / b.width}, ${a.height / b.height})`;
  }

  useEffect(() => {
    if (!open || !bigRef.current) return undefined;
    document.documentElement.classList.add('zoom-open');
    if (!reduced()) {
      bigRef.current.animate([{ transform: fromThumb() }, { transform: 'none' }], { duration: 420, easing: EASE });
    }
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('zoom-open');
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  function close() {
    const big = bigRef.current;
    if (!big || reduced()) {
      setOpen(false);
      thumbRef.current?.focus();
      return;
    }
    big.parentElement.classList.add('is-closing');
    big.animate([{ transform: 'none' }, { transform: fromThumb() }], { duration: 320, easing: EASE, fill: 'forwards' })
      .finished.then(() => {
        setOpen(false);
        thumbRef.current?.focus();
      });
  }

  return (
    <>
      <button type="button" className="zoomable" onClick={() => setOpen(true)} aria-label={`Enlarge image: ${alt || ''}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={thumbRef} className={className} src={src} alt={alt} width={width} height={height} loading={loading} decoding="async" />
      </button>
      {open &&
        host &&
        createPortal(
          <div className="zoom-overlay" role="dialog" aria-modal="true" aria-label={alt} onClick={close}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={bigRef} src={src} alt={alt} width={width} height={height} />
            <button ref={closeRef} type="button" className="zoom-close" aria-label="Close" onClick={close}>
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>,
          host,
        )}
    </>
  );
}
