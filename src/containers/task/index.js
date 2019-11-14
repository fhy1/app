import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

class taskScreen extends React.Component {
  static navigationOptions = {
    title: '我的任务',
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
      labels: ['未审核', '已审核'],
      labelStatus: 0,
    };
  }

  componentDidMount() {}

  onHandelPress = index => {
    console.log(111);
    this.setState({
      labelStatus: index,
    });
  };

  render() {
    const {labels, labelStatus} = this.state;

    return (
      <View style={styles.taskView}>
        <View style={styles.taskTitleView}>
          <View style={styles.taskTitle}>
            {labels.map((item, index) => {
              return index == labelStatus ? (
                <View
                  style={[styles.taskTitleText, styles.taskTitleClick]}
                  key={index}>
                  <Text style={styles.taskTitleTextClick}>{item}</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.taskTitleTextTouch}
                  onPress={this.onHandelPress.bind(this, index)}>
                  <View
                    style={styles.taskTitleText}
                    onResponderGrant={this.onHandelPress}
                    key={index}>
                    <Text style={styles.taskTitleTextNormal}>{item}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <FlatList
          style={styles.taskFlatList}
          data={[{title: '超级简单的任务'}, {title: '超级简单的任务'}]}
          ItemSeparatorComponent={() => (
            <View style={styles.taskFlatListLine}></View>
          )}
          renderItem={({item, index, separators}) => (
            <TouchableOpacity
              key={index}
              // onPress={() => this._onPress(item)}
              // onShowUnderlay={separators.highlight}
              // onHideUnderlay={separators.unhighlight}
            >
              <View style={styles.taskList}>
                <View style={styles.taskListIcon}>
                  <Image
                    style={styles.taskListIconImg}
                    // @ts-ignore
                    source={require('../../assets/head.png')}></Image>
                </View>
                <View style={styles.taskListBody}>
                  <View>
                    <Text style={styles.taskListBodyText}>超级简单的任务</Text>
                  </View>
                  <View style={styles.taskListBodyView}>
                    <View style={styles.taskListBodybtn1}>
                      <View style={styles.taskListBodybtn}>
                        <Text>云闪付</Text>
                      </View>
                    </View>
                    <View style={styles.taskListBodybtn2}>
                      <View style={styles.taskListBodybtn}>
                        <Text>认证转发</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.taskListRight}>
                  <View style={styles.taskListRightBody}>
                    <View>
                      <Text style={styles.taskListRightTop}>赏2.25元</Text>
                    </View>
                    <View>
                      <Text style={styles.taskListRightBottom}>剩余15份</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  taskView: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  taskTitleView: {
    height: 40,
  },
  taskTitle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
  },
  taskTitleText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666666',
    fontSize: 14,
    fontWeight: 'normal',
  },
  taskTitleClick: {
    borderBottomColor: '#FD3F3F',
    borderBottomWidth: 1,
  },
  taskTitleTextTouch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTitleTextClick: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'bold',
  },
  taskTitleTextNormal: {
    fontSize: 14,
    color: '#666666',
    fontWeight: 'normal',
  },
  taskList: {
    height: 68,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  taskListIcon: {
    width: 36,
    height: '100%',
    alignItems: 'center',
  },
  taskListIconImg: {
    width: 36,
    height: 36,
    marginTop: 16,
  },
  taskListBody: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  taskListBodyView: {
    flexDirection: 'row',
    marginTop: 6,
  },
  taskListBodyText: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'bold',
  },
  taskListBodybtn1: {
    width: 60,
    height: 22,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  taskListBodybtn2: {
    width: 72,
    height: 22,
    borderRadius: 4,
    overflow: 'hidden',
  },
  taskListBodybtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDB44',
  },
  taskListRight: {
    width: 80,
    height: '100%',
  },
  taskListRightBody: {
    flex: 1,
    justifyContent: 'center',
  },
  taskListRightTop: {
    fontSize: 14,
    color: '#FD3F3F',
  },
  taskListRightBottom: {
    marginTop: 8,
    fontSize: 12,
    color: '#666666',
  },
  taskFlatList: {
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFFFFF',
  },
  taskFlatListLine: {
    height: 1,
    backgroundColor: '#DDDDDD',
  },
});

export default taskScreen;
