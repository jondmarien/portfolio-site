export function CommunityList({ entries }) {
  return (
    <div className="community-list">
      {entries.map((entry) => (
        <article className="community-item" key={entry.id}>
          <div className="community-name">{entry.name}</div>
          <div className="community-role">{entry.role}</div>
          <p className="community-desc">{entry.description}</p>
        </article>
      ))}
    </div>
  );
}
