import React from 'react';
import { Provider } from 'react-redux';

import Store from './redux/store';
import Routes from './routes';

const store = Store();

export default () => (
  <Provider store={store}>
    <Routes/>
  </Provider>
);
