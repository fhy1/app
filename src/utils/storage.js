import AsyncStorage from '@react-native-community/async-storage';

// 第三方框架
// import Storage from 'react-native-storage';

async function setData(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // saving error
    return 'err';
  }
}

async function getData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
    return 'err';
  }
}

export {setData, getData};
