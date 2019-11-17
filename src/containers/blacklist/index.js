import React from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';

class blacklistScreen extends React.Component {
  static navigationOptions = {
    title: '小黑屋',
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

  constructor(props) {
    super(props);
    this.state = {
      labels: ['违规用户', '处罚方式', '恢复时间', '违规原因'],
    };
  }

  componentDidMount() {}

  render() {
    const {labels} = this.state;

    return (
      <View style={styles.blacklistView}>
        <View style={styles.blacklistTitleView}>
          <View style={styles.blacklistTitle}>
            {labels.map((item, index) => {
              return (
                <View style={styles.blacklistTitleText} key={index}>
                  <Text style={styles.blacklistTitleTextClick}>{item}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <FlatList
          style={styles.blacklistList}
          data={[{title: '超级简单的任务'}, {title: '超级简单的任务'}]}
          ItemSeparatorComponent={() => (
            <View style={styles.blacklistListLine}>
              <View style={styles.blacklistListLinebg} />
            </View>
          )}
          renderItem={({item, index, separators}) => (
            <View style={styles.blackList}>
              <View style={styles.blackListView}>
                <Text style={styles.blackListTxt}>张三三三</Text>
              </View>
              <View style={styles.blackListView}>
                <Text style={styles.blackListTxt}>永久禁言永久</Text>
              </View>
              <View style={styles.blackListView}>
                <Text style={styles.blackListTxt}>永久有效</Text>
              </View>
              <View style={styles.blackListView}>
                <View style={styles.blackListViewBox}>
                  <Text style={styles.blackListViewBoxtxt}>
                    恶意辱骂商家语 言不文明太不文 明了
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  blacklistView: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  blacklistTitleView: {
    height: 40,
    backgroundColor: '#FFFFFF',
  },
  blacklistTitle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  blacklistTitleText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blacklistTitleTextClick: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'bold',
  },
  blacklistList: {
    marginTop: 10,
  },
  blacklistListLine: {
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFFFFF',
  },
  blacklistListLinebg: {
    height: 1,
    backgroundColor: '#DDDDDD',
  },
  blackList: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  blackListView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blackListTxt: {
    fontSize: 12,
    color: '#444444',
  },
  blackListViewBox: {
    width: 80,
    padding: 6,
    textAlign: 'justify',
    backgroundColor: '#F3F3F3',
  },
  blackListViewBoxtxt: {
    fontSize: 10,
    lineHeight: 15,
    color: '#444444',
  },
});

export default blacklistScreen;
