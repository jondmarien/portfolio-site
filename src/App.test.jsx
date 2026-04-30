import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App.jsx';
import { profile } from './data/profile.js';

describe('App', () => {
  it('renders the primary navigation anchors and portfolio sections', () => {
    render(<App />);

    const navigation = screen.getByRole('navigation', { name: 'Primary navigation' });
    const navigationLinks = within(navigation).getAllByRole('link').map((link) => link.textContent);

    profile.navigation.forEach((item) => {
      expect(within(navigation).getByRole('link', { name: new RegExp(item.label, 'i') })).toHaveAttribute('href', `#${item.id}`);
    });
    expect(navigationLinks).toEqual(['~about', '⚑security', '⌥projects', '◈community', '@contact']);

    const sectionHeadings = screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent);
    expect(sectionHeadings).toEqual(['security research', 'projects', 'community', 'contact']);

    expect(screen.getByRole('heading', { name: 'community' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'contact' })).toBeInTheDocument();
  });

  it('keeps a quick contact path visible in the sidebar', () => {
    render(<App />);

    const quickContact = screen.getByLabelText('Quick contact');

    expect(within(quickContact).getByRole('link', { name: /jon@d-sports.org/i })).toHaveAttribute(
      'href',
      'mailto:jon@d-sports.org',
    );
    expect(within(quickContact).getByRole('link', { name: /linkedin/i })).toHaveAttribute(
      'href',
      'https://linkedin.com/in/jondmarien',
    );
  });

  it('marks the active sidebar section and updates it when a nav link is clicked', () => {
    render(<App />);

    const navigation = screen.getByRole('navigation', { name: 'Primary navigation' });
    const aboutLink = within(navigation).getByRole('link', { name: /about/i });
    const securityLink = within(navigation).getByRole('link', { name: /security/i });

    expect(aboutLink).toHaveAttribute('aria-current', 'location');

    fireEvent.click(securityLink);

    expect(securityLink).toHaveAttribute('aria-current', 'location');
    expect(aboutLink).not.toHaveAttribute('aria-current');
  });

  it('renders BearHacks backend work in profile and community sections', () => {
    render(<App />);

    expect(screen.getByText(/FastAPI\/Supabase backend behind the BearHacks portals/)).toBeInTheDocument();
    expect(screen.getByText('BearHacks Backend')).toBeInTheDocument();
    expect(screen.getByText(/Render-hosted API for BearHacks 2026/)).toBeInTheDocument();
  });
});
