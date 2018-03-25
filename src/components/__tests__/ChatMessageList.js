/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ChatMessageList from '../ChatMessageList';

// Return a fixed timestamp when moment().fromNow() is called
jest.mock('moment', () => () => ({ fromNow: () => '37 days ago' }));

const mockProps = {
  messages: [
    {
      _id: '73to37',
      chatId: '37gt37',
      content: ' joined',
      sender: {
        _id: '737373',
        username: 'dobby',
        firstName: 'Dobby',
        lastName: 'Elf',
      },
      createdAt: '1998-03-26T10:53:23.200Z',
    },
    {
      _id: '212121',
      chatId: '37gt37',
      content: 'Dobby!!!',
      sender: {
        _id: '111111',
        username: 'hgranger',
        firstName: 'Hermione',
        lastName: 'Granger',
      },
      createdAt: '1998-03-26T10:53:23.200Z',
    },
    {
      _id: '377337',
      chatId: '37gt37',
      content: 'Hi, Dobby!',
      sender: {
        _id: '373737',
        username: 'hpotter',
        firstName: 'Harry',
        lastName: 'Potter',
      },
      createdAt: '1998-03-26T10:53:23.200Z',
    },
  ],
  user: {
    _id: '373737',
  },
};

describe('<ChatMessageList />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChatMessageList {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<ChatMessageList {...mockProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly without messages', () => {
    const tree = renderer.create(<ChatMessageList {...mockProps} messages={[]} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
