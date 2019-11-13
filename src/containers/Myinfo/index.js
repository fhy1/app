import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Text,
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

  }

  render() {
    return (
      <View style={styles.homeView}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.myinfoMore}>
            <View style={styles.myinfoMoreView}>
              <View style={styles.myinfoMoreItem}>
                <Image />
                <Text>我的任务</Text>
              </View>
            </View>
          </View>
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
  myinfoMore: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  myinfoMoreView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    overflow: 'hidden'
  },
  myinfoMoreItem: {
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD'
  }
});

export default MyInfoScreen;
