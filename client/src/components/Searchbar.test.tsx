import React from 'react';
import { mount } from 'enzyme';
import Searchbar from './Searchbar';

const wrapper = mount(<Searchbar nearbyRestaurants={() => ''} />);

describe('The Searchbar component', () => {
  test('Should contain a <form>', () => {
    expect(wrapper.exists(Searchbar)).toEqual(true);
  });
});
