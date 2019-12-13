import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import FitImage from 'react-native-fit-image';

class ReportOneScreen extends React.Component {
  static navigationOptions = {
    title: '举报维权',
    headerStyle: {
      backgroundColor: '#FFDB44',
      borderBottomWidth: 0,
      shadowOpacity: 0,
    },
    headerTintColor: '#444444',
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center',
      fontWeight: 'normal',
    },
    /// 注意：如果右边没有视图，那么添加一个空白视图即可
    headerRight: <View />,
  };

  componentDidMount = () => {};

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.tutorialView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Report');
          }}>
          <View style={styles.tutorialList}>
            <Text style={styles.tutorialListTxt}>我的举报</Text>
            <View style={styles.myinfoMoreGo}>
              <FitImage
                style={{width: 15, height: 30}}
                // @ts-ignore
                source={require('../../assets/go.png')}
                resizeMode="contain"
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Reported');
          }}>
          <View style={styles.tutorialList}>
            <Text style={styles.tutorialListTxt}>我被举报</Text>
            <View style={styles.myinfoMoreGo}>
              <FitImage
                style={{width: 15, height: 30}}
                // @ts-ignore
                source={require('../../assets/go.png')}
                resizeMode="contain"
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tutorialView: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  tutorialList: {
    height: 45,
    backgroundColor: '#FFFFFF',
    borderTopColor: '#DDDDDD',
    borderTopWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
  },
  tutorialListTxt: {
    color: '#444444',
    fontSize: 14,
    flex: 1,
  },
  myinfoMoreGo: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportOneScreen);
