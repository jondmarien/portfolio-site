import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProjectList } from './ProjectList.jsx';
import { projects } from '../data/projects.js';

describe('ProjectList', () => {
  it('renders cool-tech featured projects first and expands the archive on demand', () => {
    const extraProjectCount = projects.filter((project) => !project.featured).length;

    render(<ProjectList projects={projects} />);

    expect(screen.getByRole('region', { name: 'Flagship projects' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Project archive' })).toBeInTheDocument();

    const featuredNames = projects.filter((project) => project.featured).map((project) => project.name);
    expect(featuredNames).toEqual([
      'D-Sports',
      'Nexus C2',
      'Automotive Security Capstone',
      'MemoryAnalysis.Powershell',
      'Burpcord',
      'CTFd Live Scoreboard',
      'BearHacks Web Portals',
    ]);
    expect(screen.queryByText('LinkCoder')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: `+ show more (${extraProjectCount} projects)` }));

    const archiveNames = projects.filter((project) => !project.featured).map((project) => project.name);
    expect(archiveNames.slice(0, 3)).toEqual(['LinkCoder', 'QRCoder', 'MediaCoder']);
    expect(screen.getByText('LinkCoder')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'linkcoder ↗' })).toHaveAttribute('href', 'https://link.chron0.tech');
    expect(screen.getByRole('link', { name: 'qrcoder ↗' })).toHaveAttribute('href', 'https://qrcoder.chron0.tech');
    expect(screen.getByRole('link', { name: 'mediacoder ↗' })).toHaveAttribute('href', 'https://mediacoder.chron0.tech');
    expect(screen.getByRole('button', { name: '↑ show less' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('omits the toggle when every project is featured', () => {
    const featuredOnlyProjects = projects.filter((project) => project.featured);

    render(<ProjectList projects={featuredOnlyProjects} />);

    expect(screen.queryByRole('button', { name: /^\+ show more/i })).not.toBeInTheDocument();
  });

  it('flips a project card to show details without hiding its links', () => {
    render(<ProjectList projects={[projects.find((project) => project.id === 'bearhacks-web-portals')]} />);

    const detailsButton = screen.getByRole('button', { name: /^Show details about BearHacks Web Portals/i });

    expect(screen.getByText(/Registration and admin portals/)).toBeInTheDocument();
    expect(screen.queryByText('Builder / maintainer')).not.toBeInTheDocument();
    expect(detailsButton).toHaveTextContent('view details');
    expect(screen.getByRole('link', { name: 'user portal ↗' })).toHaveAttribute('href', 'https://me.bearhacks.com');

    fireEvent.click(detailsButton);

    expect(detailsButton).toHaveAttribute('aria-pressed', 'true');
    expect(detailsButton).toHaveTextContent('back to summary');
    expect(screen.queryByText(/Registration and admin portals/)).not.toBeInTheDocument();
    expect(screen.getByText('Dev Lead / Core Organizer')).toBeInTheDocument();
    expect(screen.getByText('119 visitors')).toBeInTheDocument();
    expect(screen.getByText('29K')).toBeInTheDocument();
    const adminLink = screen.getByRole('link', { name: 'admin portal ↗' });
    expect(adminLink).toHaveAttribute('href', 'https://admin.bearhacks.com');

    fireEvent.click(adminLink);

    expect(detailsButton).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Dev Lead / Core Organizer')).toBeInTheDocument();
  });

  it('shows repo-backed details for newly enriched project cards', () => {
    const hemostat = projects.find((project) => project.id === 'hemostat');

    render(<ProjectList projects={[{ ...hemostat, featured: true }]} />);

    const detailsButton = screen.getByRole('button', { name: /^Show details about HemoStat/i });

    expect(screen.getByText(/Autonomous Docker container health monitoring system/)).toBeInTheDocument();

    fireEvent.click(detailsButton);

    expect(screen.getByText('Most Impactful Project winner')).toBeInTheDocument();
    expect(screen.getByText('Redis pub/sub + shared state')).toBeInTheDocument();
  });

  it('surfaces event scale and reliability context for the CTFd scoreboard', () => {
    const scoreboard = projects.find((project) => project.id === 'ctfd-live-scoreboard');

    render(<ProjectList projects={[scoreboard]} />);

    fireEvent.click(screen.getByRole('button', { name: /^Show details about CTFd Live Scoreboard/i }));

    expect(screen.getByText('300+ hybrid attendees')).toBeInTheDocument();
    expect(screen.getByText('3 days live')).toBeInTheDocument();
    expect(screen.getByText('2 event patches')).toBeInTheDocument();
  });

  it('shows featured project media up front and archive media only after details open', () => {
    const featuredProject = {
      ...projects.find((project) => project.id === 'd-sports'),
      media: {
        type: 'image',
        src: '/assets/projects/d-sports-placeholder.png',
        alt: 'D-Sports app preview placeholder',
      },
    };
    const archiveProject = {
      ...projects.find((project) => project.id === 'link-shortener'),
      featured: false,
      media: {
        type: 'image',
        src: '/assets/projects/linkcoder-placeholder.png',
        alt: 'LinkCoder dashboard placeholder',
      },
    };

    render(<ProjectList projects={[featuredProject, archiveProject]} />);

    expect(screen.getByAltText('D-Sports app preview placeholder')).toBeInTheDocument();
    expect(screen.queryByAltText('LinkCoder dashboard placeholder')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '+ show more (1 projects)' }));
    expect(screen.queryByAltText('LinkCoder dashboard placeholder')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /^Show details about LinkCoder/i }));
    expect(screen.getByAltText('LinkCoder dashboard placeholder')).toBeInTheDocument();
  });

  it('shows Render-backed details for the BearHacks backend project', () => {
    const backend = projects.find((project) => project.id === 'bearhacks-backend');

    render(<ProjectList projects={[backend]} />);

    fireEvent.click(screen.getByRole('button', { name: '+ show more (1 projects)' }));

    const detailsButton = screen.getByRole('button', { name: /^Show details about BearHacks Backend/i });

    expect(screen.getByText(/FastAPI backend for BearHacks 2026/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'backend api ↗' })).toHaveAttribute('href', 'https://api.bearhacks.com');

    fireEvent.click(detailsButton);

    expect(screen.getByText('Render-hosted event backend')).toBeInTheDocument();
    expect(screen.getByText('28.4K requests')).toBeInTheDocument();
    expect(screen.getByText('77.2K exported logs')).toBeInTheDocument();
  });
});
