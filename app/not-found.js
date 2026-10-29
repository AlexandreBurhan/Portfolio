import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="about prose">
      <h1>Not found</h1>
      <p>
        This page does not exist. <Link href="/">Back to the work</Link>.
      </p>
    </section>
  );
}
