'use client';

import { useState } from 'react';

// On phones, shows only the start of a block with a button for the rest
// (the CSS decides what "the start" is). Desktop always shows everything.
export default function ReadMore({ children, className = '', more = 'Read more', less = 'Show less' }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`readmore ${open ? 'is-open' : ''} ${className}`}>
      {children}
      <button type="button" className="readmore-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? less : more}
      </button>
    </div>
  );
}
