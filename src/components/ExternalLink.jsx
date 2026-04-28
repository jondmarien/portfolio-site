export function ExternalLink({ children, className, href }) {
  const isMailto = href.startsWith('mailto:');

  if (isMailto) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }

  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
