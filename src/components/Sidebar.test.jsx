import { render, screen, within } from '@testing-library/react';
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
});
