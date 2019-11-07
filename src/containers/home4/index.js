import React from 'react';
import { View, Text } from 'react-native';
class Home4Screen extends React.Component {
  static navigationOptions = {
    title: '悬赏详情',
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home4Screen</Text>
      </View>
    );
  }
}

export default Home4Screen;
