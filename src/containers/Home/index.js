import React from 'react';
import {View,Image,StyleSheet,Text} from 'react-native';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.homeView}>
        <View style={styles.swiperView}>
          <Image style={styles.swiperImage} source={require('../../assets/banner.png')} />
        </View>
        <View></View>
        <View></View>
        {/* <Text>11111</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  swiperView: {
    height: 217.5,
  },
  swiperImage: {
    flex: 1
  }
});

export default HomeScreen;