import SaturdayTimeline from './diagrams/SaturdayTimeline';
import SessionCount from './diagrams/SessionCount';
import { Inline } from './RichText';

const DIAGRAMS = {
  'saturday-timeline': SaturdayTimeline,
  'session-count': SessionCount,
};

export default function Figure({ figure, className = '' }) {
  if (!figure) return null;
  const Diagram = figure.diagram ? DIAGRAMS[figure.diagram] : null;
  if (!Diagram && !figure.src) return null;

  return (
    <figure className={`figure ${className}`}>
      <div className="frame">
        {Diagram ? (
          <Diagram />
        ) : (
          // Static export: plain img, dimensions come from the file.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={figure.src}
            alt={figure.alt}
            width={figure.width}
            height={figure.height}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      {figure.caption && (
        <figcaption>
          <Inline text={figure.caption} />
        </figcaption>
      )}
    </figure>
  );
}
