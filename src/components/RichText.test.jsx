import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { RichText } from './RichText.jsx';

describe('RichText', () => {
  it('renders inline emphasis tokens with semantic tags', () => {
    render(
      <p>
        <RichText
          parts={[
            'I ship ',
            { text: 'TypeScript', emphasis: 'strong' },
            ' and ',
            { text: 'security research', emphasis: 'italic' },
            ' with ',
            { text: 'community impact', emphasis: 'underline' },
            '.',
          ]}
        />
      </p>
    );

    expect(screen.getByText('TypeScript').tagName).toBe('STRONG');
    expect(screen.getByText('security research').tagName).toBe('EM');
    expect(screen.getByText('community impact').tagName).toBe('U');
  });
});
