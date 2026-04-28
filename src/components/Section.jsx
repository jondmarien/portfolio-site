export function Section({ children, id, title }) {
  return (
    <section className="section" id={id}>
      <div className="section-header">
        <span className="hash">#</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}
