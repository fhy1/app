import React from 'react';
import { View, Text, Platform, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ExtendScreen from '../containers/extend/index';
import Home4Screen from '../containers/home4/index';
import HomeScreen from '../containers/Home/index';

const OtherScreenNavigator = createStackNavigator(
  {
    Extend: {
      screen: HomeScreen
    },
    Extend: {
      screen: ExtendScreen
    },
    Home4: {
      screen: Home4Screen
    }
  }
);


export default OtherScreenNavigator;