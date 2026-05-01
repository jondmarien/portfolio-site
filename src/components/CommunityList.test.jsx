import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { community } from '../data/community.js';
import { CommunityList } from './CommunityList.jsx';

describe('CommunityList', () => {
  it('renders ISSessions photo sequence in one entry and keeps BearHacks image', () => {
    render(<CommunityList entries={community} />);

    expect(screen.getByAltText('BearHacks team photo')).toBeInTheDocument();

    const issessionsCard = screen.getByText('ISSessions').closest('.community-item');
    const issessionImages = within(issessionsCard).getAllByRole('img');
    const altSequence = issessionImages.map((image) => image.getAttribute('alt'));
    expect(altSequence).toEqual(['ISSessions Fantasy CTF closing ceremony', 'ISSessions Fantasy CTF team photo two']);
  });
});
