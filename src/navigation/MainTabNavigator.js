// @ts-nocheck
import React from 'react';
import {View, Text, Platform, Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeScreen from '../containers/Home/index';
import HallScreen from '../containers/hall/index';
import ExtendScreen from '../containers/extend/index';

class ShopScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Shop Screen1</Text>
      </View>
    );
  }
}

class ShopScreen1 extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Shop Screen111</Text>

        <Image source={require('../assets/home.png')} />
      </View>
    );
  }
}

class ShopScreen2 extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Shop Screen2</Text>
      </View>
    );
  }
}

class MyInfoScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>MyInfo Screen</Text>
      </View>
    );
  }
}

const route = navigation => {
  if (!navigation.isFocused()) {
    // 路由方法, 动态跳转到对应界面
    navigation.navigate('Extend');
  }
};

const route2 = navigation => {
  if (!navigation.isFocused()) {
    // 路由方法, 动态跳转到对应界面
    navigation.navigate('Hall');
  }
};

const MainTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      path: '/',
      navigationOptions: {
        tabBarLabel: '首页',
        tabBarIcon: ({focused, tintColor}) => {
          return focused ? (
            <Image
              style={{width: 19, height: 19}}
              source={require('../assets/home.png')}
            />
          ) : (
            <Image
              style={{width: 19, height: 19}}
              source={require('../assets/hall.png')}
            />
          );
        },
      },
    },
    hall: {
      screen: HallScreen,
      path: '/hall',
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '大厅',
        tabBarIcon: ({focused, tintColor}) => {
          return focused ? (
            <Image
              style={{width: 16.5, height: 19.5}}
              source={require('../assets/home.png')}
            />
          ) : (
            <Image
              style={{width: 16.5, height: 19.5}}
              source={require('../assets/hall.png')}
            />
          );
        },
        tabBarOnPress: () => {
          route2(navigation);
        },
      }),
      // navigationOptions: {
      //   tabBarLabel: '大厅',
      //   tabBarIcon: ({ focused, tintColor }) => {
      //     return focused ? (
      //       <Image
      //         style={{ width: 20, height: 18.5 }}
      //         source={require('../assets/home.png')}
      //       />
      //     ) : (
      //         <Image
      //           style={{ width: 16.5, height: 19.5 }}
      //           source={require('../assets/hall.png')}
      //         />
      //       );
      //   },
      // },
    },
    extend: {
      screen: ExtendScreen,
      path: '/shop1',
      navigationOptions: {
        tabBarLabel: '经纪人',
        tabBarIcon: ({focused, tintColor}) => {
          return focused ? (
            <Image
              style={{width: 19, height: 19}}
              source={require('../assets/home.png')}
            />
          ) : (
            <Image
              style={{width: 19.5, height: 17}}
              source={require('../assets/agent.png')}
            />
          );
        },
      },
    },
    Shops2: {
      screen: ShopScreen2,
      path: '/shop2',
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '推广',
        tabBarIcon: ({focused, tintColor}) => {
          return focused ? (
            <Image
              style={{width: 19, height: 19}}
              source={require('../assets/home.png')}
            />
          ) : (
            <Image
              style={{width: 18, height: 20}}
              source={require('../assets/extend.png')}
            />
          );
        },
        tabBarOnPress: () => {
          route(navigation);
        },
      }),
    },
    MyInfo: {
      screen: MyInfoScreen,
      path: '/myinfo',
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: ({focused, tintColor}) => {
          return focused ? (
            <Image
              style={{width: 19, height: 19}}
              source={require('../assets/home.png')}
            />
          ) : (
            <Image
              style={{width: 18, height: 20}}
              source={require('../assets/myinfo.png')}
            />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      showIcon: true,
      activeTintColor: '#FFDB44',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: 'white',
      },
      inactiveTintColor: '#444444',
      adaptive: true,
    },
  },
);

MainTabNavigator.path = '';
export default MainTabNavigator;
