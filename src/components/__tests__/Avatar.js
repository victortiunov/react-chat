/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Avatar from '../Avatar';

describe('<Avatar />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Avatar colorFrom="Harry Potter">Harry Potter</Avatar>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<Avatar colorFrom="Harry Potter">Harry Potter</Avatar>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
