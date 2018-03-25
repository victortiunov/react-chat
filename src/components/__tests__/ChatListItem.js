/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ChatListItem from '../ChatListItem';

const mockProps = {
  title: 'Gryffindor Talks',
  disabled: false,
  isActive: false,
  onClick: jest.fn(),
};

describe('<ChatListItem />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChatListItem {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<ChatListItem {...mockProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders disabled correctly', () => {
    const tree = renderer.create(<ChatListItem {...mockProps} disabled />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders active correctly', () => {
    const tree = renderer.create(<ChatListItem {...mockProps} isActive />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
