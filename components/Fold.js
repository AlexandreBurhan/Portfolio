'use client';

import { useEffect, useId, useState } from 'react';

// A group of case-study sections that folds on phones: the heading becomes a
// button and the content opens on tap. Desktop always shows the content and
// never the button. Until the script runs, phones keep the content hidden, so
// nothing jumps when it folds.
export default function Fold({ title, children }) {
  const [open, setOpen] = useState(true);
  const [ready, setReady] = useState(false);
  const id = useId();

  useEffect(() => {
    if (window.matchMedia('(max-width: 760px)').matches) setOpen(false);
    setReady(true);
  }, []);

  return (
    <div className={`fold${open ? ' is-open' : ''}${ready ? ' is-ready' : ''}`}>
      <button type="button" className="fold-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
          <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="fold-body" id={id}>
        {children}
      </div>
    </div>
  );
}
