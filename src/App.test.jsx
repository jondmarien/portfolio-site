import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

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
    const profileBadges = screen.getByLabelText('Profile badges');
    expect(profileBadges.textContent).toContain('Specialization');
    expect(profileBadges.textContent).toContain('Security Engineering');
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

  it('scrolls the sidebar itself when wheel input starts there', () => {
    render(<App />);

    const sidebar = screen.getByLabelText('Portfolio sidebar');
    Object.defineProperty(sidebar, 'scrollHeight', { configurable: true, value: 1200 });
    Object.defineProperty(sidebar, 'clientHeight', { configurable: true, value: 300 });
    sidebar.scrollTop = 0;

    fireEvent.wheel(sidebar, { deltaY: 180 });

    expect(sidebar.scrollTop).toBe(180);
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
    expect(screen.getByAltText('Portrait of Jon Marien')).toBeInTheDocument();
    expect(screen.getByAltText('ISSessions Fantasy CTF team photo one')).toBeInTheDocument();
  });

  it('shows directional cursor classes while wheel scrolling', () => {
    vi.useFakeTimers();
    render(<App />);

    const root = document.documentElement;
    fireEvent.wheel(window, { deltaY: 120 });
    expect(root).toHaveClass('is-scrolling-down');

    fireEvent.wheel(window, { deltaY: -120 });
    expect(root).toHaveClass('is-scrolling-up');
    expect(root).not.toHaveClass('is-scrolling-down');

    vi.advanceTimersByTime(200);
    expect(root).not.toHaveClass('is-scrolling-up');
    expect(root).not.toHaveClass('is-scrolling-down');
    vi.useRealTimers();
  });

  it('opens profile and ISSessions images in a larger modal preview', () => {
    render(<App />);

    fireEvent.click(screen.getByAltText('Portrait of Jon Marien'));
    expect(screen.getByRole('dialog', { name: 'Portrait of Jon Marien' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /close image preview/i }));
    expect(screen.queryByRole('dialog', { name: 'Portrait of Jon Marien' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByAltText('ISSessions Fantasy CTF closing ceremony'));
    expect(screen.getByRole('dialog', { name: 'ISSessions Fantasy CTF closing ceremony' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /next modal image/i }));
    expect(screen.getByRole('dialog', { name: 'ISSessions Fantasy CTF team photo two' })).toBeInTheDocument();
  });
});
