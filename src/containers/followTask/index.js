import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {
  fetchJobRelease,
  fetchReleaseEnd,
  editReleaseEnd,
} from '../../api/release';
import FitImage from 'react-native-fit-image';
import {paramToQuery2} from '../../utils/fetch';
import {report} from '../../api/report';
import {WToast} from 'react-native-smart-tip';

class FollowTaskScreen extends React.Component {
  static navigationOptions = {
    title: '任务列表',
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

  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,
      pageSize: 15,
      taskList: [],
      task: {},
      userId: 0,
    };
  }

  componentDidMount = async () => {
    const {pageNo, pageSize} = this.state;
    let id = this.props.navigation.state.params.id;
    const {login} = this.props;
    const task = await fetchJobRelease(id, 3, pageNo, pageSize);
    console.log(task);
    console.log(task);
    this.setState({
      task: task.data,
      taskList: task.data.list,
      userId: id,
    });
  };

  fetchListNext = () => {
    const {task, userId} = this.state;
    if (task.pageNum < task.pages) {
      const {pageNo} = this.state;
      this.setState(
        {
          pageNo: pageNo + 1,
        },
        () => {
          const {pageNo, pageSize, labelStatus, taskList} = this.state;
          fetchJobRelease(userId, 3, pageNo, pageSize).then(task => {
            this.setState({
              task: task.data,
              taskList: taskList.concat(task.data.list),
            });
          });
        },
      );
    }
  };

  handelOnJumpToDetail = jobId => {
    const {navigation, login} = this.props;
    if (login && login.userId) {
      navigation.navigate('HallDetail', {
        jobId: jobId,
      });
    } else {
      navigation.navigate('Login');
    }
  };

  render() {
    const {taskList, task} = this.state;
    const {width} = Dimensions.get('window');
    console.log('task', task);
    return (
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
        onEndReachedThreshold={1}
        onEndReached={this.fetchListNext}
        renderItem={({item, index, separators}) => (
          <TouchableOpacity
            key={index}
            onPress={() => this.handelOnJumpToDetail(item.jobId)}
            // onShowUnderlay={separators.highlight}
            // onHideUnderlay={separators.unhighlight}
          >
            <View style={styles.taskList}>
              <View style={styles.taskListIcon}>
                {item.headimgurl ? (
                  <Image
                    style={styles.taskListIconImg}
                    // @ts-ignore
                    source={{uri: item.headimgurl}}
                  />
                ) : (
                  <Image
                    style={styles.taskListIconImg}
                    // @ts-ignore
                    source={require('../../assets/head.png')}
                  />
                )}
              </View>
              <View style={styles.taskListBody}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.taskListBodyText} numberOfLines={1}>
                    {item.jobTitle}
                  </Text>
                </View>
                <View style={styles.taskListBodyView}>
                  <View style={styles.taskListBodybtn1}>
                    <View style={styles.taskListBodybtn}>
                      <Text style={styles.taskListBodybtnTxt}>
                        {item.jobSource}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.taskListBodybtn2}>
                    <View style={styles.taskListBodybtn}>
                      <Text style={styles.taskListBodybtnTxt}>
                        {item.typeName}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.taskListRight}>
                <View style={styles.taskListRightBody}>
                  <View>
                    <Text style={styles.taskListRightTop}>
                      赏{item.releasePrice}元
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.taskListRightBottom}>
                      剩余{item.surplusNum}份
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => JSON.stringify(item.jobId)}
      />
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
    fontSize: 15,
    color: '#444444',
    fontWeight: 'bold',
  },
  taskListBodybtn1: {
    height: 20,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  taskListBodybtn2: {
    height: 20,
    borderRadius: 4,
    overflow: 'hidden',
  },
  taskListBodybtn: {
    paddingLeft: 6,
    paddingRight: 6,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDB44',
  },
  taskListBodybtnTxt: {
    fontSize: 12,
    color: '#444444',
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
    textAlign: 'right',
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

  //弹框
  taskModal: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    flex: 1,
    alignItems: 'center',
  },
  opinionModalView: {
    backgroundColor: '#FFFFFF',
    marginTop: 96,
    padding: 13,
    borderRadius: 4,
  },
  opinionTopTitle: {
    alignItems: 'center',
  },
  opinionTopTitleTxt: {
    fontSize: 16,
    color: '#444444',
    fontWeight: 'bold',
  },
  opinionTitle: {
    marginTop: 16.5,
    marginBottom: 16.5,
    fontSize: 14,
    color: '#444444',
    lineHeight: 30,
    fontWeight: 'normal',
  },
  opinionInp: {
    height: 80,
    backgroundColor: '#F3F3F3',
    textAlignVertical: 'top',
  },
  opinionInp2: {
    height: 40,
    backgroundColor: '#F3F3F3',
    textAlignVertical: 'top',
  },
  opinionBtnView: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  opinionBtn: {
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    overflow: 'hidden',
  },
  opinionTxt: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'normal',
  },

  applyListLine: {
    height: 0.5,
    backgroundColor: '#DDDDDD',
  },
  applyListButton: {
    flexDirection: 'row',
  },
  applyNoPassTxt: {
    paddingTop: 10.5,
    paddingBottom: 10.5,
    color: '#444444',
    fontSize: 12,
  },
});

function mapStateToProps(state) {
  return {
    login: state.login.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowTaskScreen);
// export default taskScreen;
