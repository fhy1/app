import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

class MyInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swiperHeight: 0,
      width: 0,
    };
  }

  componentDidMount() {
    let { width } = Dimensions.get('window');
    this.setState({
      swiperHeight: (180 * width) / 350,
      width: width,
    });
  }

  render() {
    const { swiperHeight, width } = this.state;
    const { navigation } = this.props;
    images = [
      require('../../assets/banner.png'),
      require('../../assets/banner.png'),
      require('../../assets/banner.png'),
      require('../../assets/banner.png'),
    ];
    return (
      <View style={styles.homeView}>
        <ScrollView contentContainerStyle={styles.contentContainer}>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {

  },

});

export default MyInfoScreen;
