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
    return (
      <View style={styles.extendView}>
        <ScrollView></ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  extendView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteScreen);
