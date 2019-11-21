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

class TutorialScreen extends React.Component {
  static navigationOptions = {
    title: '教程协助',
    headerStyle: {
      backgroundColor: '#FFDB44',
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

  componentDidMount = () => {};

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.tutorialView}>
        <ScrollView>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TutorialDetail');
            }}>
            <View style={styles.tutorialList}>
              <Text style={styles.tutorialListTxt}>发布任务</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TutorialDetail');
            }}>
            <View style={styles.tutorialList}>
              <Text style={styles.tutorialListTxt}>发布任务</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TutorialDetail');
            }}>
            <View style={styles.tutorialList}>
              <Text style={styles.tutorialListTxt}>发布任务</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TutorialDetail');
            }}>
            <View style={styles.tutorialList}>
              <Text style={styles.tutorialListTxt}>发布任务</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
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
    justifyContent: 'center',
    paddingLeft: 15,
  },
  tutorialListTxt: {
    color: '#444444',
    fontSize: 14,
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(TutorialScreen);
