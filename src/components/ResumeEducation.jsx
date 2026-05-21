export function ResumeEducation({ education }) {
  return (
    <div className="resume-education">
      {education.map((entry) => (
        <article className="resume-education-item" key={entry.id}>
          <div className="resume-education-header">
            <div className="resume-education-school">{entry.school}</div>
            <div className="resume-dates">
              {entry.dateRange.start} – {entry.dateRange.end}
            </div>
          </div>
          <div className="resume-education-degree">{entry.degree}</div>
          {entry.certificate ? <div className="resume-education-certificate">{entry.certificate}</div> : null}
        </article>
      ))}
    </div>
  );
}
