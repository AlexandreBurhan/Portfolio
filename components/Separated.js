// Joins items with a vertical bar, the site-wide separator.
// Real spaces around the bar give the browser a place to wrap on small screens.
export default function Separated({ items }) {
  return items.map((item, i) => (
    <span key={i}>
      {i > 0 && (
        <span className="sep" aria-hidden="true">
          {' | '}
        </span>
      )}
      <span className={typeof item === 'string' && item.length > 28 ? undefined : 'sep-item'}>{item}</span>
    </span>
  ));
}
