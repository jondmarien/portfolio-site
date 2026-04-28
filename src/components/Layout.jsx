import { Sidebar } from './Sidebar.jsx';

export function Layout({ children, profile }) {
  return (
    <div className="layout">
      <Sidebar profile={profile} />
      <main className="main">
        <Breadcrumb parts={profile.breadcrumb} />
        {children}
      </main>
    </div>
  );
}

function Breadcrumb({ parts }) {
  return (
    <div className="breadcrumb" aria-label="Breadcrumb">
      {parts.map((part, index) => [
        index > 0 ? (
          <span className="sep" key={`${part}-sep`}>
            /
          </span>
        ) : null,
        <span className={index === parts.length - 1 ? 'current' : undefined} key={part}>
          {part}
        </span>,
      ])}
    </div>
  );
}
