// Joins items with a vertical bar, the site-wide separator.
// The space before the bar does not break, so a wrapped line never starts with a bar.
export default function Separated({ items }) {
  return items.map((item, i) => (
    <span key={i}>
      {i > 0 && (
        <span className="sep" aria-hidden="true">
          {'\u00a0| '}
        </span>
      )}
      <span className={typeof item === 'string' && item.length > 28 ? undefined : 'sep-item'}>{item}</span>
    </span>
  ));
}
