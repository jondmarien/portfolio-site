import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SecurityList } from './SecurityList.jsx';
import { securityResearch } from '../data/security.js';

describe('SecurityList', () => {
  it('surfaces a research summary before the individual writeups', () => {
    const { container } = render(<SecurityList entries={securityResearch} />);

    expect(screen.getByText('research signal')).toBeInTheDocument();
    expect(screen.getByText(/CVEs, exploit analysis, labs, and writeups/)).toBeInTheDocument();
    expect(screen.getByText('CVE-backed findings')).toBeInTheDocument();
    expect(screen.getByText('Hands-on labs')).toBeInTheDocument();
    expect(container.querySelector('.security-summary')).toBeTruthy();
    expect(container.querySelector('.security-summary-glow.border-glow-card')).toBeNull();
  });

  it('shows why high-value security entries matter', () => {
    render(<SecurityList entries={securityResearch} />);

    expect(screen.getByText('The 7-Zip Vulnerability Discovery — CVE-2024-11477')).toBeInTheDocument();
    expect(screen.getByText(/Remote code execution research with real-world patching relevance/)).toBeInTheDocument();
  });

  it("supports media previews for writeup collection entries", () => {
    render(<SecurityList entries={securityResearch} />);

    const preview = screen.getByRole('img', { name: /chrono's cyber chronicles/i });

    expect(preview).toHaveAttribute('src', expect.stringContaining('ccc-hero.png'));
    expect(preview.closest('figure')).toHaveClass('writeup-media');
  });

  it('opens writeup media in the shared full-size modal viewer', () => {
    render(<SecurityList entries={securityResearch} />);

    fireEvent.click(screen.getByRole('button', { name: /open full image for chrono's cyber chronicles/i }));

    const dialog = screen.getByRole('dialog', { name: /chrono's cyber chronicles/i });
    expect(dialog).toHaveClass('project-media-modal');
    expect(dialog.querySelector('.project-media-modal-image')).toHaveAttribute('src', expect.stringContaining('ccc-hero.png'));

    fireEvent.click(screen.getByRole('button', { name: /close image preview/i }));

    expect(screen.queryByRole('dialog', { name: /chrono's cyber chronicles/i })).not.toBeInTheDocument();
  });

  it('closes the writeup media modal with Escape', () => {
    render(<SecurityList entries={securityResearch} />);

    fireEvent.click(screen.getByRole('button', { name: /open full image for chrono's cyber chronicles/i }));
    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.queryByRole('dialog', { name: /chrono's cyber chronicles/i })).not.toBeInTheDocument();
  });
});
