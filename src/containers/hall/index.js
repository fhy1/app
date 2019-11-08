import React from 'react';
import {View, Text} from 'react-native';
class HallScreen extends React.Component {
  static navigationOptions = {
    title: '全部任务',
    headerStyle: {
      backgroundColor: '#FFDB44',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home4Screen</Text>
      </View>
    );
  }
}

export default HallScreen;
