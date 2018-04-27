/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ChatMessage from '../ChatMessage';

// Return a fixed timestamp when moment().fromNow() is called
jest.mock('moment', () => () => ({ fromNow: () => '37 days ago' }));

const mockProps = {
  user: {
    _id: '373737',
  },
  sender: {
    _id: '373737',
    username: 'hpotter',
    firstName: 'Harry',
    lastName: 'Potter',
  },
  content: 'Expecto Patronum!',
  createdAt: '1994-06-16T21:53:23.200Z',
  statusMessage: false,
};

describe('<ChatMessage />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChatMessage {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders message from current user correctly', () => {
    const tree = renderer.create(<ChatMessage {...mockProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders message from other user correctly', () => {
    const content = 'Dobby is a free elf!';
    const tree = renderer
      .create(<ChatMessage
        {...mockProps}
        sender={{
            _id: '737373',
            username: 'dobby',
            firstName: 'Dobby',
            lastName: 'Elf',
          }}
        content={content}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders status message correctly', () => {
    const content = 'joined';
    const tree = renderer
      .create(<ChatMessage {...mockProps} content={content} statusMessage />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
