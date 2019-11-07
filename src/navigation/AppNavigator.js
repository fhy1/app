import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import ExtendScreen from '../containers/extend/index';

export default createAppContainer(
  createSwitchNavigator({
    Main: MainTabNavigator,
    Extend: ExtendScreen,
  }),
);
