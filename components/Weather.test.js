import React from 'react';
import Weather from './Weather';

import renderer from 'react-test-renderer';

it('renders weather without crashing', () => {
  const rendered = renderer.create(<Weather />).toJSON();
  expect(rendered).toBeTruthy();
});
