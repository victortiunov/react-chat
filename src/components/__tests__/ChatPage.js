/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import ChatPage from '../ChatPage';

jest.mock('../Sidebar', () => () => 'Sidebar');
jest.mock('../Chat', () => () => 'Chat');
jest.mock('../ChatHeader', () => () => 'ChatHeader');
jest.mock('../ErrorMessage', () => () => 'ErrorMessage');

const mockProps = {
  activeChat: {
    _id: '',
  },
  myChats: [],
  allChats: [],
  createChat: jest.fn(),
  leaveChat: jest.fn(),
  deleteChat: jest.fn(),
  joinChat: jest.fn(),
  setActiveChat: jest.fn(),
  sendMessage: jest.fn(),
  user: {
    isMember: true,
    isCreator: true,
    isChatMember: true,
  },
  editUser: jest.fn(),
  logout: jest.fn(),
  error: '',
  isConnected: true,
  recieveAuth: jest.fn(),
  fetchAllChats: jest.fn(),
  fetchMyChats: jest.fn(),
  socketsConnect: jest.fn(),
  mountChat: jest.fn(),
  unmountChat: jest.fn(),
};

describe('<ChatPage />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChatPage {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
