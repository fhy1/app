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
import BlacklistScreen from '../containers/blacklist/index';
import LoginScreen from '../containers/Login/index';
import ReleaseScreen from '../containers/release/index';
import ReleaseTaskScreen from '../containers/releaseTask/index';
import ApplyScreen from '../containers/apply/index';
import ReportScreen from '../containers/report/index';
import TutorialScreen from '../containers/tutorial/index';
import TutorialDetailScreen from '../containers/tutorialDetail/index';
import SettingScreen from '../containers/setting/index';
import InviteScreen from '../containers/invite/index';
import WithdrawScreen from '../containers/withdraw/index';

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
    Blacklist: {
      screen: BlacklistScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 11, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 11, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    Release: {
      screen: ReleaseScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 11, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    ReleaseTask: {
      screen: ReleaseTaskScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 11, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    Apply: {
      screen: ApplyScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 11, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    Report: {
      screen: ReportScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 11, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    Tutorial: {
      screen: TutorialScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 11, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    TutorialDetail: {
      screen: TutorialDetailScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 11, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    Setting: {
      screen: SettingScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 11, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    Invite: {
      screen: InviteScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 11, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    Withdraw: {
      screen: WithdrawScreen,
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
