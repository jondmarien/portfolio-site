import { ExternalLink } from './ExternalLink.jsx';

export function ResumeHeader({ resume }) {
  return (
    <header className="resume-header">
      <p className="resume-tagline">{resume.tagline}</p>
      <ExternalLink className="resume-download text-link" href={resume.pdfDownload.href}>
        {resume.pdfDownload.label}
      </ExternalLink>
    </header>
  );
}
