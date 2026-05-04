import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SegmentedControl } from './SegmentedControl.jsx';

describe('SegmentedControl', () => {
  it('renders a single-selection control and reports option changes', () => {
    const handleChange = vi.fn();

    render(
      <SegmentedControl
        ariaLabel="Sort projects"
        options={[
          { label: 'default', value: 'default' },
          { label: 'date ↓', value: 'date-desc' },
        ]}
        value="default"
        onChange={handleChange}
      />
    );

    expect(screen.getByRole('radiogroup', { name: 'Sort projects' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'default' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'date ↓' })).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(screen.getByRole('button', { name: 'date ↓' }));

    expect(handleChange).toHaveBeenCalledWith('date-desc');
  });
});
