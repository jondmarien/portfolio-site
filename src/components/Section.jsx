export function Section({ actions, children, id, title }) {
  return (
    <section className="section" id={id}>
      <div className="section-header">
        <div className="section-title">
          <span className="hash">#</span>
          <h2>{title}</h2>
        </div>
        {actions ? <div className="section-actions">{actions}</div> : null}
      </div>
      {children}
    </section>
  );
}
