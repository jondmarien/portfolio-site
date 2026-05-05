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
    expect(screen.getByRole('radio', { name: 'default' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: 'date ↓' })).toHaveAttribute('aria-checked', 'false');
    expect(screen.queryByRole('button', { name: 'default' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('radio', { name: 'date ↓' }));

    expect(handleChange).toHaveBeenCalledWith('date-desc');
  });

  it('supports radio keyboard navigation between options', () => {
    const handleChange = vi.fn();

    render(
      <SegmentedControl
        ariaLabel="Sort projects"
        options={[
          { label: 'default', value: 'default' },
          { label: 'date ↓', value: 'date-desc' },
          { label: 'A-Z', value: 'alpha-asc' },
        ]}
        value="date-desc"
        onChange={handleChange}
      />
    );

    const selectedOption = screen.getByRole('radio', { name: 'date ↓' });
    selectedOption.focus();

    fireEvent.keyDown(selectedOption, { key: 'ArrowRight' });

    expect(handleChange).toHaveBeenCalledWith('alpha-asc');
    expect(screen.getByRole('radio', { name: 'A-Z' })).toHaveFocus();
  });
});
