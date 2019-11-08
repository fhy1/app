import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import {createStackNavigator} from 'react-navigation-stack';
import HallScreen from '../containers/hall/index';
import ExtendScreen from '../containers/extend/index';

export default createAppContainer(
  createStackNavigator({
    Main: {
      screen: MainTabNavigator,
      navigationOptions: {
        header: null,
      },
    },
    Extend: {
      screen: ExtendScreen,
    },
    Hall: {
      screen: HallScreen,
    },
  }),
);
