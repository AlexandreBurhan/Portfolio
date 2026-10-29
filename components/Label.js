// The museum label: identical on every project, always in this order.
import Separated from './Separated';

export default function Label({ project, as: Tag = 'p' }) {
  return (
    <div className="label">
      <Tag className="label-title">{project.title}</Tag>
      <p className="label-meta">
        <Separated items={[project.year, project.stack.join(', ')]} />
      </p>
    </div>
  );
}
