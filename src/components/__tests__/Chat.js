/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Chat from '../Chat';

jest.mock('../ChatMessageList', () => () => 'ChatMessageList');
jest.mock('../MessageInput', () => () => 'MessageInput');

const mockProps = {
  user: {
    isMember: true,
    isCreator: true,
    isChatMember: true,
  },
  activeChat: {
    _id: '',
  },
  joinChat: jest.fn(),
  sendMessage: jest.fn(),
  isConnected: true,
};

describe('<Chat />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Chat {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly ', () => {
    const tree = renderer.create(<Chat {...mockProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
