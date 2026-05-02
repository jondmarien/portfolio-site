import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { profile } from '../data/profile.js';
import { Sidebar } from './Sidebar.jsx';

describe('Sidebar', () => {
  it('renders icon and label wrappers for navigation and sidebar links', () => {
    render(<Sidebar profile={profile} />);

    const navigation = screen.getByRole('navigation', { name: 'Primary navigation' });
    const aboutLink = within(navigation).getByRole('link', { name: /about/i });
    expect(aboutLink.querySelector('.icon')).toBeTruthy();
    expect(aboutLink.querySelector('.nav-label')).toBeTruthy();

    const linksSection = screen.getByLabelText('Sidebar links');
    const githubLink = within(linksSection).getByRole('link', { name: /github/i });
    expect(githubLink.querySelector('.link-icon')).toBeTruthy();
    expect(githubLink.querySelector('.link-label')).toBeTruthy();
  });

  it('supports custom svg logos for selected sidebar links', () => {
    render(<Sidebar profile={profile} />);

    const linksSection = screen.getByLabelText('Sidebar links');
    const siteLink = within(linksSection).getByRole('link', { name: /chron0\.link/i });
    const dSportsLink = within(linksSection).getByRole('link', { name: /d-sports/i });

    expect(siteLink.querySelector('.brand-icon-svg')).toBeTruthy();
    expect(siteLink.querySelector('.link-logo')).toBeFalsy();
    expect(dSportsLink.querySelector('.link-logo')).toBeTruthy();
    expect(dSportsLink.querySelector('.link-logo.is-accent')).toBeTruthy();
    expect(dSportsLink.querySelector('.link-logo.is-zoomed')).toBeTruthy();
  });

  it('adds brand icons to quick contact links', () => {
    render(<Sidebar profile={profile} />);

    const quickContact = screen.getByLabelText('Quick contact');

    expect(within(quickContact).getByRole('link', { name: /jon@d-sports\.org/i }).querySelector('.quick-contact-icon')).toBeTruthy();
    expect(within(quickContact).getByRole('link', { name: /github/i }).querySelector('.quick-contact-icon')).toBeTruthy();
    expect(within(quickContact).getByRole('link', { name: /linkedin/i }).querySelector('.quick-contact-icon')).toBeTruthy();
  });

  it('syncs active navigation from viewport section positions during document scroll', () => {
    const main = document.createElement('main');
    main.className = 'main';
    main.getBoundingClientRect = () => ({ top: -1000 });
    document.body.appendChild(main);

    profile.navigation.forEach((item) => {
      const section = document.createElement('section');
      section.id = item.id;
      section.getBoundingClientRect = () => ({ top: sectionTopById[item.id] });
      document.body.appendChild(section);
    });

    render(<Sidebar profile={profile} />);

    fireEvent.scroll(window);

    const navigation = screen.getByRole('navigation', { name: 'Primary navigation' });
    expect(within(navigation).getByRole('link', { name: /projects/i })).toHaveAttribute('aria-current', 'location');
    expect(within(navigation).getByRole('link', { name: /about/i })).not.toHaveAttribute('aria-current');

    main.remove();
    profile.navigation.forEach((item) => document.getElementById(item.id)?.remove());
  });
});

const sectionTopById = {
  about: -1000,
  security: -420,
  projects: 80,
  community: 720,
  contact: 1320,
};
