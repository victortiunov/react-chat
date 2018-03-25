import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import 'typeface-roboto/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';
import './index.css';

const rootEl = document.getElementById('root');

const store = configureStore();

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    rootEl,
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  });
}

registerServiceWorker();
