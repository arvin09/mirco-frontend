import React from 'react';
import { render } from '@testing-library/react';
import { BasicCarousel } from './carousel.composition';

it('renders with the correct text', () => {
  const { getByText } = render(<BasicCarousel />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
