import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App.jsx';

describe('App', () => {
  it('renders the primary navigation anchors and portfolio sections', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '#about');
    expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('heading', { name: 'projects' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'security research' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'community' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'contact' })).toBeInTheDocument();
  });
});
