/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ChatHeader from '../ChatHeader';

const mockProps = {
  user: {
    isMember: true,
    isCreator: true,
    isChatMember: true,
  },
  activeChat: {
    _id: '373737',
    title: 'Gryffindor Talks',
  },
  editUser: jest.fn(),
  onLogout: jest.fn(),
  leaveChat: jest.fn(),
  deleteChat: jest.fn(),
  joinChat: jest.fn(),
  isConnected: true,
};

describe('<ChatHeader />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChatHeader {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<ChatHeader {...mockProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders without active chat', () => {
    const tree = renderer.create(<ChatHeader {...mockProps} activeChat={null} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
