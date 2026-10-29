// The site's single recurring motif: one day in 48 half-hour intervals,
// shaped like contact-centre volume. Business hours in accent, the rest grey.
// Static by design: nothing on this site animates before content is readable.

const N = 48;

function volume(i) {
  const h = i / 2;
  const morning = Math.exp(-((h - 10.5) ** 2) / 8);
  const afternoon = Math.exp(-((h - 15.5) ** 2) / 10) * 0.92;
  return Math.max(0.05, morning + afternoon);
}

const values = Array.from({ length: N }, (_, i) => volume(i));
const max = Math.max(...values);
const isOpen = (i) => i >= 18 && i <= 34; // 09:00 to 17:00

export default function DayStrip({ variant = 'full' }) {
  const divider = variant === 'divider';
  const W = 960;
  const H = divider ? 90 : 64;
  const gap = divider ? 6 : 3;
  const bw = (W - gap * (N - 1)) / N;

  const svg = (
    <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
      {values.map((v, i) => {
        const h = Math.max(divider ? 6 : 2.5, (v / max) * H);
        return (
          <rect
            key={i}
            x={i * (bw + gap)}
            y={H - h}
            width={bw}
            height={h}
            fill={isOpen(i) ? 'var(--accent)' : '#d9dad7'}
          />
        );
      })}
    </svg>
  );

  if (divider) {
    return <div className="room-divider">{svg}</div>;
  }

  return (
    <figure className="day-strip">
      {svg}
      <figcaption>
        <span>A day in 48 half-hour intervals</span>
        <span>Opening hours in colour</span>
      </figcaption>
    </figure>
  );
}
