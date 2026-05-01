import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { community } from '../data/community.js';
import { CommunityList } from './CommunityList.jsx';

describe('CommunityList', () => {
  it('renders uploaded community photos as real images', () => {
    render(<CommunityList entries={community} />);

    expect(screen.getByAltText('BearHacks team photo')).toBeInTheDocument();
    expect(screen.getByAltText('ISSessions Fantasy CTF closing ceremony')).toBeInTheDocument();
    expect(screen.getByAltText('ISSessions Fantasy CTF team photo one')).toBeInTheDocument();
    expect(screen.getByAltText('ISSessions Fantasy CTF team photo two')).toBeInTheDocument();
  });
});
