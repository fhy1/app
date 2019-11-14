// @ts-nocheck
import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {Image} from 'react-native';

import MainTabNavigator from './MainTabNavigator';
import {createStackNavigator} from 'react-navigation-stack';
import HallScreen from '../containers/hall/index';
import ExtendScreen from '../containers/extend/index';
import OpinionScreen from '../containers/opinion/index';
import TaskScreen from '../containers/task/index';

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
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 11, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    Hall: {
      screen: HallScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 11, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    Opinion: {
      screen: OpinionScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 11, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    Task: {
      screen: TaskScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 11, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
  }),
);
