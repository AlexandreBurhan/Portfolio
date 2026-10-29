import { Inline, Paragraphs } from './RichText';
import Figure from './Figure';

function Block({ section }) {
  switch (section.type) {
    case 'list':
      return (
        <ul>
          {section.items.map((item, i) => (
            <li key={i}>
              <Inline text={item} />
            </li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {section.columns.map((c, i) => (
                  <th key={i} scope="col">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td key={c}>
                      <Inline text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'code':
      return <pre className="code-block">{section.code}</pre>;
    case 'quote':
      return (
        <blockquote className="pull-quote">
          <Inline text={section.quote} />
        </blockquote>
      );
    default:
      return null;
  }
}

export default function Section({ section }) {
  if (section.type === 'figure') {
    return <Figure figure={section.figure} className="section-figure" />;
  }

  return (
    <section className={section.heading ? 'section' : 'section cont'}>
      {section.heading && <h2>{section.heading}</h2>}
      <Paragraphs items={section.body} />
      <Block section={section} />
      {section.note && section.note.length > 0 && (
        <div className="after">
          <Paragraphs items={section.note} />
        </div>
      )}
    </section>
  );
}
