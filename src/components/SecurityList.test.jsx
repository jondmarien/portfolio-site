import { render, screen } from '@testing-library/react';
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
});
