import SaturdayTimeline from './diagrams/SaturdayTimeline';
import SessionCount from './diagrams/SessionCount';
import { Inline } from './RichText';

export const DIAGRAMS = {
  'saturday-timeline': SaturdayTimeline,
  'session-count': SessionCount,
};

export default function Figure({ figure, className = '' }) {
  if (!figure) return null;
  const Diagram = figure.diagram ? DIAGRAMS[figure.diagram] : null;
  if (!Diagram && !figure.src && !figure.video) return null;

  return (
    <figure className={`figure ${figure.narrow ? 'narrow' : ''} ${className}`}>
      <div className="frame">
        {Diagram ? (
          <Diagram />
        ) : figure.video ? (
          // Plays on request only: no autoplay, nothing moves before the visitor asks.
          <video
            controls
            playsInline
            preload="metadata"
            poster={figure.poster}
            width={figure.width}
            height={figure.height}
            aria-label={figure.alt}
          >
            <source src={figure.video} type={figure.video.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
          </video>
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
