import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { profile } from '../data/profile.js';
import { ContactList } from './ContactList.jsx';

describe('ContactList', () => {
  it('shows brand icons for social and email rows', () => {
    render(<ContactList entries={profile.contact} />);

    const githubRow = screen.getByText('github').closest('.contact-row');
    const emailRow = screen.getByText('work email').closest('.contact-row');

    expect(githubRow?.querySelector('.contact-icon')).toBeTruthy();
    expect(emailRow?.querySelector('.contact-icon')).toBeTruthy();
  });
});
