/**
 * @format
 */

import 'react-native';
import React from 'react';

import {inputValidation} from '../src/utils/formSanitization';
import {INPUT} from '@constants';

// import App from '../src/App';
// import * as HTTPMethods from '@api/http';

// import renderer from 'react-test-renderer';

/*
it('renders correctly', () => {
  renderer.create(<App />);
});
*/

console.log(inputValidation);

test('Form test', () => {
  expect(inputValidation(mocks.username)).toBeTruthy();
});

const mocks = {
  username: {
    type: INPUT.USERNAME,
    string: 'prueba',
  },
};
