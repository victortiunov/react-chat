/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import LoginForm from '../LoginForm';

const mockProps = {
  error: '',
  isFetching: false,
  onSubmit: jest.fn(),
};

describe('<LoginForm />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoginForm {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<LoginForm {...mockProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders progress bar', () => {
    const tree = renderer.create(<LoginForm {...mockProps} isFetching />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders error message', () => {
    const error = 'Errors happen!';
    const tree = renderer.create(<LoginForm {...mockProps} error={error} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
