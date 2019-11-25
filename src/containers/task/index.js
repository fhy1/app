import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchTaskCode} from '../../api/task';

class TaskScreen extends React.Component {
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
      labels: [
        {title: '进行中', id: 1},
        {title: '待审核', id: 3},
        {title: '审核通过', id: 4},
        {title: '审核拒绝', id: 5},
      ],
      labelStatus: 1,
      pageNo: 1,
      pageSize: 15,
      taskList: [],
      task: {},
    };
  }

  componentDidMount = async () => {
    const {pageNo, pageSize, labelStatus} = this.state;
    const {login} = this.props;
    const task = await fetchTaskCode(
      pageNo,
      pageSize,
      login.userId,
      labelStatus,
    );
    console.log(task);
    this.setState({
      task: task.data,
      taskList: task.data.list,
    });
  };

  onHandelPress = index => {
    const {pageNo, pageSize} = this.state;
    const {login} = this.props;
    this.setState({
      labelStatus: index,
    });
    fetchTaskCode(pageNo, pageSize, login.userId, index).then(task => {
      this.setState({
        task: task.data,
        taskList: task.data.list,
      });
    });
  };

  fetchListNext = () => {
    const {task, login} = this.props;
    if (task.pageNum < task.pages) {
      const {pageNo} = this.state;
      this.setState(
        {
          pageNo: pageNo + 1,
        },
        () => {
          const {pageNo, pageSize, labelStatus, taskList} = this.state;
          fetchTaskCode(pageNo, pageSize, login.userId, labelStatus).then(
            task => {
              this.setState({
                task: task.data,
                taskList: taskList.concat(task.data.list),
              });
            },
          );
        },
      );
    }
  };

  render() {
    const {labels, labelStatus, taskList, task} = this.state;
    console.log('task', task);
    return (
      <View style={styles.taskView}>
        <View style={styles.taskTitleView}>
          <View style={styles.taskTitle}>
            {labels.map((item, index) => {
              return item.id == labelStatus ? (
                <View
                  style={[styles.taskTitleText, styles.taskTitleClick]}
                  key={item.id}>
                  <Text style={styles.taskTitleTextClick}>{item.title}</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.taskTitleTextTouch}
                  onPress={this.onHandelPress.bind(this, item.id)}
                  key={item.id}>
                  <View
                    style={styles.taskTitleText}
                    onResponderGrant={this.onHandelPress}>
                    <Text style={styles.taskTitleTextNormal}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <FlatList
          style={styles.taskFlatList}
          data={taskList}
          ItemSeparatorComponent={() => (
            <View style={styles.taskFlatListLine}></View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.taskFlatListEmpty}>
              <Text style={styles.taskFlatListEmptyTxt}>暂无数据</Text>
            </View>
          )}
          refreshing={false}
          getItemLayout={(data, index) => ({
            length: 68,
            offset: 68 * index + 1,
            index,
          })}
          ListFooterComponent={() =>
            taskList.length > 0 ? (
              <View style={styles.taskFlatListEmpty}>
                <Text style={styles.taskFlatListEmptyTxt}>
                  {task.pageNum == task.pages
                    ? '没有更多了，亲'
                    : '正在加载中，请稍等~'}
                </Text>
              </View>
            ) : null
          }
          onEndReachedThreshold={0}
          onEndReached={this.fetchListNext}
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
          keyExtractor={item => JSON.stringify(item.jobId)}
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
  taskFlatListEmpty: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskFlatListEmptyTxt: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#444444',
  },
});

function mapStateToProps(state) {
  return {
    taskList: state.task.taskList,
    task: state.task.task,
    login: state.login.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskScreen);
// export default taskScreen;
