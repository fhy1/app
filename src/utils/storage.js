import AsyncStorage from '@react-native-community/async-storage';

// 第三方框架
// import Storage from 'react-native-storage';

setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    return 'err';
  }
};

getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      console.log(value);
      return value;
    }
  } catch (e) {
    // error reading value
    return 'err';
  }
};

export {setData, getData};
