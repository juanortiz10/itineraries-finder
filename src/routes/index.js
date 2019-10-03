import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { HOME, LOGIN, LOADING_PAGE } from '../consts';

import Login from '../views/Login';
import Home from '../views/Home';
import LoadingPage from '../views/LoadingPage';

const AppNavigator = createStackNavigator({
  [LOADING_PAGE]: LoadingPage,
  [LOGIN]: Login,
  [HOME]: Home
}, {
  headerMode: 'none'
});

export default createAppContainer(AppNavigator);
