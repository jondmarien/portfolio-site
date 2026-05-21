export function ResumeCompetencies({ competencies }) {
  return (
    <div className="resume-competencies">
      {competencies.map((category) => (
        <div className="resume-competency-row" key={category.id}>
          <div className="resume-competency-label">{category.label}</div>
          <div className="resume-competency-tags">
            {category.items.map((item) => (
              <span className="inline-tag" key={`${category.id}-${item}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
