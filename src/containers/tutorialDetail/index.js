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

class TutorialDetailScreen extends React.Component {
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
    return (
      <View style={styles.tutorialDetailView}>
        <ScrollView>
          <View style={styles.tutorialDetailTitle}>
            <Text style={styles.tutorialDetailTxt}>标题</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tutorialDetailView: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  tutorialDetailTitle: {
    height: 47,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tutorialDetailTxt: {
    color: '#444444',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TutorialDetailScreen);
