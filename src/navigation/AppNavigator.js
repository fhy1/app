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
import HallDetailScreen from '../containers/hallDetail/index';
import SearchScreen from '../containers/search/index';
import ReleaseStepScreen from '../containers/releaseStep/index';
import WxwithDrawScreen from '../containers/wxwithDraw/index';
import ZfbwithDrawScreen from '../containers/zfbwithDraw/index';
import RechargeScreen from '../containers/recharge/index';
import PayDetailScreen from '../containers/payDetail/index';
import MemberScreen from '../containers/member/index';
import RegisterScreen from '../containers/register/index';
import ChartScreen from '../containers/chart/index';
import FollowScreen from '../containers/follow/index';
import NewsScreen from '../containers/news/index';
import ReportOneScreen from '../containers/reportOne/index';
import ReportedScreen from '../containers/reported/index';
import ServiceScreen from '../containers/service/index';
import RuleScreen from '../containers/rule/index';
import FootScreen from '../containers/foot/index';
import MyInviteScreen from '../containers/myInvite/index';
import FollowTaskScreen from '../containers/followTask/index';
import PerExtendScreen from '../containers/perExtend/index';
import ImgDetailScreen from '../containers/imgDetail/index';

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
    HallDetail: {
      screen: HallDetailScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 21, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 21, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    ReleaseStep: {
      screen: ReleaseStepScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 21, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    WxwithDraw: {
      screen: WxwithDrawScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 21, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    ZfbwithDraw: {
      screen: ZfbwithDrawScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 21, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    Recharge: {
      screen: RechargeScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 21, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    PayDetail: {
      screen: PayDetailScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 21, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    Member: {
      screen: MemberScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 21, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 21, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    Chart: {
      screen: ChartScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 21, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    Follow: {
      screen: FollowScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 21, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    News: {
      screen: NewsScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 21, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    ReportOne: {
      screen: ReportOneScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 21, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    Reported: {
      screen: ReportedScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 21, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    Service: {
      screen: ServiceScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 21, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    Rule: {
      screen: RuleScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 21, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    Foot: {
      screen: FootScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 21, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    MyInvite: {
      screen: MyInviteScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 21, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    FollowTask: {
      screen: FollowTaskScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 21, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    PerExtend: {
      screen: PerExtendScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 21, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
    ImgDetail: {
      screen: ImgDetailScreen,
      navigationOptions: () => ({
        headerBackImage: () => (
          <Image
            style={{width: 21, height: 21}}
            source={require('../assets/back.png')}
          />
        ),
      }),
    },
  }),
);
