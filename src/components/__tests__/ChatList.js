/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ChatList from '../ChatList';

jest.mock('../ChatListItem', () => () => 'ChatListItem');

const mockProps = {
  activeChat: {
    _id: '373737',
  },
  chats: [
    {
      _id: '373737',
      title: 'Gryffindor Talks',
    },
    {
      _id: '737373',
      title: 'Hufflepuff Talks',
    },
    {
      _id: '111111',
      title: 'Ravenclaw Talks',
    },
    {
      _id: '666666',
      title: 'Slytherin Talks',
    },
  ],
  setActiveChat: jest.fn(),
  disabled: false,
};

describe('<ChatList />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChatList {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<ChatList {...mockProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders without active chat', () => {
    const tree = renderer.create(<ChatList {...mockProps} activeChat={null} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders disabled correctly', () => {
    const tree = renderer.create(<ChatList {...mockProps} disabled />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
