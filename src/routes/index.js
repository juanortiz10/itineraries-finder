import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { HOME, LOGIN, LOADING_PAGE, RESULTS, PROFILE } from '../consts';

import Login from '../views/Login';
import Home from '../views/Home';
import LoadingPage from '../views/LoadingPage';
import Results from '../views/Results';
import Profile from '../views/Profile';

const AppNavigator = createStackNavigator(
  {
    [LOADING_PAGE]: LoadingPage,
    [LOGIN]: Login,
    [HOME]: Home,
    [RESULTS]: Results,
    [PROFILE]: Profile,
  },
  {
    headerMode: 'none',
  },
);

export default createAppContainer(AppNavigator);
