import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import FitImage from 'react-native-fit-image';

class ExtendScreen extends React.Component {
  static navigationOptions = {
    title: '推广有礼',
    headerStyle: {
      backgroundColor: '#f75139',
      borderBottomWidth: 0,
      shadowOpacity: 0,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    /// 注意：如果右边没有视图，那么添加一个空白视图即可
    headerRight: <View />,
  };

  render() {
    const {navigation} = this.props;
    const {width} = Dimensions.get('window');
    const newwidth = (width - 420) / 2;
    const navImageHeight = (width / 748) * 433;
    return (
      <View style={styles.extendView}>
        <ScrollView>
          <View style={[styles.extendTop, {paddingLeft: newwidth}]}>
            <FitImage
              // @ts-ignore
              source={require('../../assets/friend.png')}
              style={styles.extendTopImg}
              resizeMode="contain"
            />
          </View>
          <View style={{width: width, height: navImageHeight}}>
            <FitImage
              // @ts-ignore
              source={require('../../assets/person.png')}
              originalWidth={width}
              originalHeight={navImageHeight}
              resizeMode="contain"
            />
            <View
              style={[
                styles.extendEwm,
                {width: width, height: navImageHeight},
              ]}>
              <View
                style={{
                  width: (width / 375) * 110,
                  height: (width / 375) * 110,
                  backgroundColor: '#FFFFFF',
                }}></View>
            </View>
          </View>
          <View
            style={[
              styles.extendShare,
              {marginTop: -(navImageHeight - (width / 375) * 110) / 2 + 15},
            ]}>
            <View style={styles.extendShareView}>
              <Image
                style={styles.extendShareHb}
                // @ts-ignore
                source={require('../../assets/hb.png')}
              />
            </View>
          </View>
          <View>
            <Text>Shop Screen2</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  extendView: {
    flex: 1,
    backgroundColor: '#f75139',
  },
  extendTop: {
    height: 150,
    // backgroundColor: '#FFFFFF',
  },
  extendTopImg: {
    width: 420,
    height: 10,
  },
  extendEwm: {
    position: 'absolute',
    left: 0,
    top: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  extendViewRwmView: {
    width: 110,
    height: 110,
    backgroundColor: '#FFFFFF',
  },
  extendShare: {
    height: 142,
    paddingLeft: 15,
    paddingRight: 15,
  },
  extendShareView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
  },
  extendShareHb: {
    width: 39.5,
    height: 39.5,
    position: 'absolute',
    left: 0,
    top: 0,
    marginLeft: -15,
    marginTop: -20,
  },
});
export default ExtendScreen;
