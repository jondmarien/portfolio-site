import { ExternalLink } from './ExternalLink.jsx';

export function RichText({ parts = [] }) {
  return parts.map((part, index) => <RichTextPart key={index} part={part} />);
}

function RichTextPart({ part }) {
  if (typeof part === 'string') {
    return part;
  }

  if (part.variant === 'tag') {
    return <span className="inline-tag">{part.text}</span>;
  }

  const node = withEmphasis(part);
  if (!part.href) {
    return node;
  }

  return (
    <ExternalLink className="text-link" href={part.href}>
      {node}
    </ExternalLink>
  );
}

function withEmphasis(part) {
  const text = part.text ?? '';
  if (part.emphasis === 'strong') {
    return <strong>{text}</strong>;
  }
  if (part.emphasis === 'italic') {
    return <em>{text}</em>;
  }
  if (part.emphasis === 'underline') {
    return <u>{text}</u>;
  }
  return text;
}
