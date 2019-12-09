import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import {WToast} from 'react-native-smart-tip';
import {fetchHallType} from '../../api/hall';

class ReleaseTaskScreen extends React.Component {
  static navigationOptions = {
    title: '发布任务',
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
      taskJob: {
        jobSource: '',
        jobTitle: '',
        introduce: '',
        submissionTime: 24,
        jobRate: 1,
        jobPrice: '',
        jobNum: '',
        typeId: '',
      },
      modalVisible: false,
      modalVisible2: false,
      hallType: [],
      typeName: '',
    };
  }

  componentDidMount = () => {
    fetchHallType().then(res => {
      this.setState({
        hallType: res.data,
      });
    });
  };

  componentWillUnmount = () => {
    this.setState({
      modalVisible: false,
      modalVisible2: false,
    });
  };

  jumpToNext = () => {
    const {taskJob} = this.state;
    const {navigation} = this.props;
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };

    if (taskJob.jobSource === '') {
      toastOpts.data = '请输入项目名称';
      WToast.show(toastOpts);
    } else if (taskJob.jobTitle === '') {
      toastOpts.data = '请输入任务标题';
      WToast.show(toastOpts);
    } else if (taskJob.introduce === '') {
      toastOpts.data = '请输入描述';
      WToast.show(toastOpts);
    } else if (taskJob.label === '') {
      toastOpts.data = '请选择任务标签';
      WToast.show(toastOpts);
    } else if (taskJob.typeId === '') {
      toastOpts.data = '请选择任务类型';
      WToast.show(toastOpts);
    } else {
      if (parseFloat(taskJob.jobPrice) >= 0.3) {
        if (parseInt(taskJob.jobNum) >= 11) {
          taskJob.jobPrice = parseFloat(
            parseFloat(taskJob.jobPrice).toFixed(2),
          );
          taskJob.jobNum = parseInt(taskJob.jobNum);
          navigation.navigate('ReleaseStep', {
            job: taskJob,
          });
        } else {
          toastOpts.data = '请输入正确的悬赏名额';
          WToast.show(toastOpts);
        }
      } else {
        toastOpts.data = '请输入正确的悬赏金额';
        WToast.show(toastOpts);
      }
    }
  };

  handelOnChange = (item, e) => {
    this.setState(state => {
      state.taskJob[item] = e;
      return {
        taskJob: state.taskJob,
      };
    });
  };

  ShowModel = () => {
    this.setState({
      modalVisible: true,
    });
  };

  ShowModel2 = () => {
    this.setState({
      modalVisible2: true,
    });
  };

  CloseModel = () => {
    this.setState({
      modalVisible: false,
      modalVisible2: false,
    });
  };

  changeTime = time => {
    this.setState(state => {
      state.taskJob.submissionTime = time;
      return {
        taskJob: state.taskJob,
        modalVisible: false,
      };
    });
  };

  changeType = (typeId, typeName) => {
    this.setState(state => {
      state.taskJob.typeId = typeId;
      return {
        taskJob: state.taskJob,
        typeName: typeName,
        modalVisible2: false,
      };
    });
  };

  ChangeCheck = check => {
    this.setState(state => {
      state.taskJob.jobRate = check;
      return {
        taskJob: state.taskJob,
      };
    });
  };

  ChangeLabelCheck = check => {
    this.setState(state => {
      state.taskJob.label = check;
      return {
        taskJob: state.taskJob,
      };
    });
  };

  render() {
    const {
      taskJob,
      modalVisible,
      modalVisible2,
      hallType,
      typeName,
    } = this.state;
    const {width} = Dimensions.get('window');
    console.log(hallType);
    return (
      <View style={styles.releaseTaskView}>
        <ScrollView>
          <View style={styles.releaseList}>
            <Text style={styles.releaseListTxt}>项目名称</Text>
            <TextInput
              style={styles.releaseListInput}
              placeholder="需填写真实项目名称"
              onChangeText={this.handelOnChange.bind(this, 'jobSource')}
              value={taskJob.jobSource}
            />
          </View>
          <View style={styles.releaseList}>
            <Text style={styles.releaseListTxt}>任务标题</Text>
            <TextInput
              style={styles.releaseListInput}
              placeholder="需填写真实项目名称"
              onChangeText={this.handelOnChange.bind(this, 'jobTitle')}
              value={taskJob.jobTitle}
            />
          </View>
          <View style={styles.releaseList}>
            <Text style={styles.releaseListTxt}>任务描述</Text>
            <TextInput
              style={styles.releaseListInput}
              placeholder="描述任务的要求与限制"
              onChangeText={this.handelOnChange.bind(this, 'introduce')}
              value={taskJob.introduce}
            />
          </View>
          <View style={styles.releaseList}>
            <Text style={styles.releaseListTxt}>提交时间</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.releaseListInput}
              placeholder="限制提交时间 （小时）"
              onChangeText={this.handelOnChange.bind(this, 'submissionTime')}
              value={taskJob.submissionTime}
            />
          </View>
          {/* <TouchableOpacity onPress={this.ShowModel}>
            <View style={styles.releaseList}>
              <Text style={styles.releaseListTxt}>提交时间</Text>
              <Text style={styles.releaseListInpTxt}>
                限制{' '}
                <Text style={styles.releaseListInpNum}>
                  {taskJob.submissionTime}
                </Text>{' '}
                小时内提交
              </Text>
            </View>
          </TouchableOpacity> */}
          {/* <View style={styles.releaseList}>
            <Text style={styles.releaseListTxt}>审核时间</Text>
            <Text style={styles.releaseListInpTxt}>
              将在 <Text style={styles.releaseListInpNum}>24</Text> 小时内审核
            </Text>
          </View> */}
          <View style={styles.releaseList}>
            <Text style={styles.releaseListTxt}>重复任务</Text>
            <View style={styles.releaseListCheck}>
              <TouchableWithoutFeedback
                onPress={this.ChangeCheck.bind(this, 1)}>
                {taskJob.jobRate === 1 ? (
                  <Image
                    style={[
                      styles.releaseListCheckImg,
                      styles.releaseListCheckOne,
                    ]}
                    source={require('../../assets/checkbox.png')}
                  />
                ) : (
                  <Image
                    style={[
                      styles.releaseListCheckImg,
                      styles.releaseListCheckOne,
                    ]}
                    source={require('../../assets/checkboxno.png')}
                  />
                )}
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={this.ChangeCheck.bind(this, 1)}>
                <View>
                  <Text style={styles.releaseListCheckTxt}>仅一次</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={this.ChangeCheck.bind(this, 2)}>
                {taskJob.jobRate === 2 ? (
                  <Image
                    style={[
                      styles.releaseListCheckImg,
                      styles.releaseListCheckTwo,
                    ]}
                    source={require('../../assets/checkbox.png')}
                  />
                ) : (
                  <Image
                    style={[
                      styles.releaseListCheckImg,
                      styles.releaseListCheckTwo,
                    ]}
                    source={require('../../assets/checkboxno.png')}
                  />
                )}
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={this.ChangeCheck.bind(this, 2)}>
                <Text style={styles.releaseListCheckTxt}>每天一次</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.releaseList}>
            <Text style={styles.releaseListTxt}>任务标签</Text>
            <View style={styles.releaseListCheck}>
              <TouchableWithoutFeedback
                onPress={this.ChangeLabelCheck.bind(this, 1)}>
                {taskJob.label === 1 ? (
                  <Image
                    style={[
                      styles.releaseListCheckImg,
                      styles.releaseListCheckOne,
                    ]}
                    source={require('../../assets/checkbox.png')}
                  />
                ) : (
                  <Image
                    style={[
                      styles.releaseListCheckImg,
                      styles.releaseListCheckOne,
                    ]}
                    source={require('../../assets/checkboxno.png')}
                  />
                )}
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={this.ChangeLabelCheck.bind(this, 1)}>
                <View>
                  <Text style={styles.releaseListCheckTxt}>新人</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={this.ChangeLabelCheck.bind(this, 2)}>
                {taskJob.label === 2 ? (
                  <Image
                    style={[
                      styles.releaseListCheckImg,
                      styles.releaseListCheckTwo,
                    ]}
                    source={require('../../assets/checkbox.png')}
                  />
                ) : (
                  <Image
                    style={[
                      styles.releaseListCheckImg,
                      styles.releaseListCheckTwo,
                    ]}
                    source={require('../../assets/checkboxno.png')}
                  />
                )}
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={this.ChangeLabelCheck.bind(this, 2)}>
                <Text style={styles.releaseListCheckTxt}>简单</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={this.ChangeLabelCheck.bind(this, 3)}>
                {taskJob.label === 3 ? (
                  <Image
                    style={[
                      styles.releaseListCheckImg,
                      styles.releaseListCheckTwo,
                    ]}
                    source={require('../../assets/checkbox.png')}
                  />
                ) : (
                  <Image
                    style={[
                      styles.releaseListCheckImg,
                      styles.releaseListCheckTwo,
                    ]}
                    source={require('../../assets/checkboxno.png')}
                  />
                )}
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={this.ChangeLabelCheck.bind(this, 3)}>
                <Text style={styles.releaseListCheckTxt}>高价</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <TouchableOpacity onPress={this.ShowModel2}>
            <View style={[styles.releaseList, {marginBottom: 10}]}>
              <Text style={styles.releaseListTxt}>任务类型</Text>
              <Text style={styles.releaseListInpTxt}>
                {typeName ? (
                  typeName
                ) : (
                  <Text style={styles.chooseType}>请选择任务类型</Text>
                )}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.releaseList}>
            <Text style={styles.releaseListTxt}>悬赏单价</Text>
            <TextInput
              style={styles.releaseListInput}
              keyboardType="numeric"
              placeholder="最少0.3元/人"
              onChangeText={this.handelOnChange.bind(this, 'jobPrice')}
              value={taskJob.jobPrice}
            />
          </View>
          <View style={styles.releaseList}>
            <Text style={styles.releaseListTxt}>悬赏名额</Text>
            <TextInput
              style={styles.releaseListInput}
              keyboardType="numeric"
              placeholder="最少11人"
              onChangeText={this.handelOnChange.bind(this, 'jobNum')}
              value={taskJob.jobNum}
            />
          </View>
          <View style={styles.releaseListBtn}>
            <TouchableOpacity onPress={this.jumpToNext}>
              <View style={styles.releaseListBtnView}>
                <Text style={styles.releaseListBtnViewTxt}>
                  下一步 (设置步骤)
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={this.CloseModel}>
          <View style={styles.taskModal}>
            <View style={styles.taskModalBottom}>
              <TouchableOpacity onPress={this.changeTime.bind(this, 1)}>
                <View style={[styles.taskModalBottomList, {width: width}]}>
                  <Text>1小时</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.changeTime.bind(this, 6)}>
                <View style={[styles.taskModalBottomList, {width: width}]}>
                  <Text>6小时</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.changeTime.bind(this, 24)}>
                <View style={[styles.taskModalBottomList, {width: width}]}>
                  <Text>1天</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.changeTime.bind(this, 72)}>
                <View style={[styles.taskModalBottomList, {width: width}]}>
                  <Text>3天</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.changeTime.bind(this, 120)}>
                <View style={[styles.taskModalBottomList, {width: width}]}>
                  <Text>5天</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.CloseModel}>
                <View style={[styles.taskModalBottomBack, {width: width}]}>
                  <Text>取消</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={this.CloseModel}>
          <View style={styles.taskModal}>
            <View style={styles.taskModalBottom}>
              {hallType.map(item => {
                return (
                  <TouchableOpacity
                    key={item.typeId}
                    onPress={this.changeType.bind(
                      this,
                      item.typeId,
                      item.typeName,
                    )}>
                    <View style={[styles.taskModalBottomList, {width: width}]}>
                      <Text>{item.typeName}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
              <TouchableOpacity onPress={this.CloseModel}>
                <View style={[styles.taskModalBottomBack, {width: width}]}>
                  <Text>取消</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  releaseTaskView: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  releaseList: {
    height: 46,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
  },
  releaseListTxt: {
    color: '#444444',
    fontSize: 14,
    fontWeight: 'bold',
  },
  releaseListInput: {
    flex: 1,
    color: '#666666',
    paddingLeft: 12,
    fontSize: 12,
    height: 46,
  },
  chooseType: {
    color: '#666666',
    fontSize: 12,
  },
  releaseListInpTxt: {
    flex: 1,
    color: '#666666',
    paddingLeft: 12,
    fontSize: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  releaseListInpNum: {
    color: '#FD3F3F',
  },
  releaseListBtn: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  releaseListBtnView: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDB44',
    borderRadius: 4,
    marginTop: 30,
  },
  releaseListBtnViewTxt: {
    fontSize: 14,
    color: '#444444',
  },
  releaseListCheckTxt: {
    color: '#666666',
  },
  releaseListCheckImg: {
    width: 22,
    height: 22,
    marginRight: 11,
  },
  releaseListCheckOne: {
    marginLeft: 12,
  },
  releaseListCheckTwo: {
    marginLeft: 55,
  },
  releaseListCheck: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
  },

  taskModal: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    flex: 1,
  },
  taskModalBottom: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  taskModalBottomList: {
    backgroundColor: '#FFFFFF',
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskModalBottomBack: {
    backgroundColor: '#F3F3F3',
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseTaskScreen);
