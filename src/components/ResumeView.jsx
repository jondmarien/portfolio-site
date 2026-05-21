import { ResumeCompetencies } from './ResumeCompetencies.jsx';
import { ResumeEducation } from './ResumeEducation.jsx';
import { ResumeHeader } from './ResumeHeader.jsx';
import { ResumeSummary } from './ResumeSummary.jsx';
import { ResumeTimeline } from './ResumeTimeline.jsx';

export function ResumeView({ resume }) {
  return (
    <div className="resume-view">
      <ResumeHeader resume={resume} />
      <ResumeSubsection title="experience">
        <ResumeTimeline entries={resume.experience} />
      </ResumeSubsection>
      <ResumeSubsection title="community">
        <ResumeSummary crossLinkLabel="see community →" entries={resume.communitySummary} />
      </ResumeSubsection>
      <ResumeSubsection title="projects">
        <ResumeSummary crossLinkLabel="see projects →" entries={resume.projectSummary} />
      </ResumeSubsection>
      <ResumeSubsection title="core competencies">
        <ResumeCompetencies competencies={resume.competencies} />
      </ResumeSubsection>
      <ResumeSubsection title="education">
        <ResumeEducation education={resume.education} />
      </ResumeSubsection>
      <p className="resume-updated">Last updated: {formatLastUpdated(resume.lastUpdated)}</p>
    </div>
  );
}

function ResumeSubsection({ children, title }) {
  return (
    <section className="resume-subsection">
      <h3 className="resume-subsection-title">
        <span aria-hidden="true" className="resume-subsection-marker">
          ./
        </span>
        <span className="resume-subsection-label">{title}</span>
      </h3>
      {children}
    </section>
  );
}

function formatLastUpdated(isoDate) {
  const [year, month, day] = isoDate.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[Number(month) - 1]} ${day}, ${year}`;
}
