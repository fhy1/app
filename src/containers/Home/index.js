import React from 'react';
import {View, Image, StyleSheet, Text, Dimensions} from 'react-native';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swiperHeight: 0,
    };
  }

  componentWillMount() {
    let {height, width} = Dimensions.get('window');
    // console.warn(width);
    this.setState({
      // swiperHeight: width * (350 / 218),
    });
  }

  render() {
    const {swiperHeight} = this.state;
    return (
      <View style={styles.homeView}>
        {/* <View style={{height: swiperHeight}}>
          <Image
            style={styles.swiperImage}
            source={require('../../assets/banner.png')}
          />
        </View> */}
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
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;
