/** @jest-environment jsdom */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Annotation from '../src/components/Annotation'

const requiredProps = {
  annotations: []
}

test('Annotation renders <Annotation />', () => {
  render(<Annotation {...requiredProps} />)
  const linkElement = screen.getByText(/Click and Drag to Annotate/i);
  expect(linkElement).toBeInTheDocument();
});
