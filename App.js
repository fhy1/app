import React, {useEffect} from 'react';
import {ToastAndroid, BackHandler} from 'react-native';
import AppMain from './src/index';
import 'react-native-gesture-handler';
import * as WeChat from 'react-native-wechat';
let firstClick = 0;

const App: () => React$Node = () => {
  useEffect(() => {
    function handleBack() {
      var timestamp = new Date().valueOf();
      if (timestamp - firstClick > 1000) {
        firstClick = timestamp;
        return false;
      } else {
        ToastAndroid.show('退出程序', ToastAndroid.SHORT);
        BackHandler.exitApp();
        return true;
      }
    }
    WeChat.registerApp('wxc8e1a3732b85cd01');

    BackHandler.addEventListener('hardwareBackPress', handleBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
    };
  }, []);
  return (
    <>
      <AppMain />
    </>
  );
};

export default App;
