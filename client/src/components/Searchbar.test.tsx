import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Paper } from '@material-ui/core';
import Searchbar from './Searchbar';

const wrapper = mount(<Searchbar />);

describe('The Searchbar component', () => {
  test('Should contain a <form>', () => {
    // const form = wrapper.find('form');
    console.log('form:', wrapper.html());
    expect(wrapper.find(Searchbar)).toEqual(true)
  });
});