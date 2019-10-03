import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { HOME, LOGIN } from '../consts';
import Login from '../views/Login';
import Home from '../views/Home';

const AppNavigator = createStackNavigator({
  [LOGIN]: Login,
  [HOME]: Home
}, {
  headerMode: 'none'
});

export default createAppContainer(AppNavigator);
