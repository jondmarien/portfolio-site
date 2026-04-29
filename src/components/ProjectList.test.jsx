import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProjectList } from './ProjectList.jsx';
import { projects } from '../data/projects.js';

describe('ProjectList', () => {
  it('renders featured projects first and expands the rest on demand', () => {
    const extraProjectCount = projects.filter((project) => !project.featured).length;

    render(<ProjectList projects={projects} />);

    expect(screen.getByText('D-Sports')).toBeInTheDocument();
    expect(screen.getByText('Burpcord')).toBeInTheDocument();
    expect(screen.getByText('BearHacks Backend')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'linkcoder ↗' })).toHaveAttribute('href', 'https://link.chron0.tech');
    expect(screen.getByRole('link', { name: 'qrcoder ↗' })).toHaveAttribute('href', 'https://qrcoder.chron0.tech');
    expect(screen.getByRole('link', { name: 'mediacoder ↗' })).toHaveAttribute('href', 'https://mediacoder.chron0.tech');
    expect(screen.queryByText('Health Companion')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: `+ show more (${extraProjectCount} projects)` }));

    expect(screen.getByText('Health Companion')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '↑ show less' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('omits the toggle when every project is featured', () => {
    const featuredOnlyProjects = projects.filter((project) => project.featured);

    render(<ProjectList projects={featuredOnlyProjects} />);

    expect(screen.queryByRole('button', { name: /^\+ show more/i })).not.toBeInTheDocument();
  });

  it('flips a project card to show details without hiding its links', () => {
    render(<ProjectList projects={[projects.find((project) => project.id === 'bearhacks-web-portals')]} />);

    const detailsButton = screen.getByRole('button', { name: /^More info about BearHacks Web Portals/i });

    expect(screen.getByText(/Registration and admin portals/)).toBeInTheDocument();
    expect(screen.queryByText('Builder / maintainer')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'user portal ↗' })).toHaveAttribute('href', 'https://me.bearhacks.com');

    fireEvent.click(detailsButton);

    expect(detailsButton).toHaveAttribute('aria-pressed', 'true');
    expect(screen.queryByText(/Registration and admin portals/)).not.toBeInTheDocument();
    expect(screen.getByText('Dev Lead / Core Organizer')).toBeInTheDocument();
    expect(screen.getByText('119 visitors')).toBeInTheDocument();
    expect(screen.getByText('15 page views')).toBeInTheDocument();
    const adminLink = screen.getByRole('link', { name: 'admin portal ↗' });
    expect(adminLink).toHaveAttribute('href', 'https://admin.bearhacks.com');

    fireEvent.click(adminLink);

    expect(detailsButton).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Dev Lead / Core Organizer')).toBeInTheDocument();
  });

  it('shows repo-backed details for newly enriched project cards', () => {
    const hemostat = projects.find((project) => project.id === 'hemostat');

    render(<ProjectList projects={[{ ...hemostat, featured: true }]} />);

    const detailsButton = screen.getByRole('button', { name: /^More info about HemoStat/i });

    expect(screen.getByText(/Autonomous Docker container health monitoring system/)).toBeInTheDocument();

    fireEvent.click(detailsButton);

    expect(screen.getByText('Most Impactful Project winner')).toBeInTheDocument();
    expect(screen.getByText('Redis pub/sub + shared state')).toBeInTheDocument();
  });

  it('shows Render-backed details for the BearHacks backend project', () => {
    const backend = projects.find((project) => project.id === 'bearhacks-backend');

    render(<ProjectList projects={[backend]} />);

    const detailsButton = screen.getByRole('button', { name: /^More info about BearHacks Backend/i });

    expect(screen.getByText(/FastAPI backend for BearHacks 2026/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'backend api ↗' })).toHaveAttribute('href', 'https://api.bearhacks.com');

    fireEvent.click(detailsButton);

    expect(screen.getByText('Render-hosted event backend')).toBeInTheDocument();
    expect(screen.getByText('28.4K requests')).toBeInTheDocument();
    expect(screen.getByText('77.2K exported logs')).toBeInTheDocument();
  });
});
