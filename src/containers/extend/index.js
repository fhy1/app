import React from 'react';
import { View, Text, Button } from 'react-native';
class ExtendScreen extends React.Component {
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
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Shop Screen2</Text>
        <Button
          buttonStyle={{ marginVertical: 10 }}
          title={'跳转到Home4界面'}
          onPress={() => navigation.navigate('Home4')}
        />
      </View>
    );
  }
}

export default ExtendScreen;
