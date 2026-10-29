// Renders a string with inline **bold**, *italic* and `code`.
// Keeps HTML out of the content files.

const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;

export function Inline({ text }) {
  if (!text) return null;
  const parts = String(text).split(TOKEN).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

export function Paragraphs({ items, className }) {
  if (!items || items.length === 0) return null;
  return items.map((p, i) => (
    <p key={i} className={className}>
      <Inline text={p} />
    </p>
  ));
}
