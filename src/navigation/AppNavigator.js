import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import { createStackNavigator } from 'react-navigation-stack';
import Home4Screen from '../containers/home4/index';
import ExtendScreen from '../containers/extend/index';


export default createAppContainer(
  createStackNavigator({
    Main: {
      screen: MainTabNavigator,
      navigationOptions: {
        header: null
      }
    },
    Extend: {
      screen: ExtendScreen
    },
    Home4: {
      screen: Home4Screen
    },
  }),
);
