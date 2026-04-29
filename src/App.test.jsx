import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App.jsx';
import { profile } from './data/profile.js';

describe('App', () => {
  it('renders the primary navigation anchors and portfolio sections', () => {
    render(<App />);

    const navigation = screen.getByRole('navigation', { name: 'Primary navigation' });

    profile.navigation.forEach((item) => {
      expect(within(navigation).getByRole('link', { name: new RegExp(item.label, 'i') })).toHaveAttribute('href', `#${item.id}`);
    });

    expect(screen.getByRole('heading', { name: 'projects' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'security research' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'community' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'contact' })).toBeInTheDocument();
  });
});
