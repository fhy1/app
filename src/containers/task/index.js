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
import {fetchTaskCode} from '../../api/task';
import ImagePicker from 'react-native-image-picker';
import {upLoadImg} from '../../api/upload';
import FitImage from 'react-native-fit-image';
import {paramToQuery2} from '../../utils/fetch';
import {report} from '../../api/report';
import {WToast} from 'react-native-smart-tip';

class TaskScreen extends React.Component {
  static navigationOptions = {
    title: '我的任务',
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
      modalVisible: false,
      imgUrl: '',
      reportDetail: '',
      taskId: '',
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

  componentWillUnmount = () => {
    this.setState({modalVisible: false});
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
    const {task} = this.state;
    const {login} = this.props;
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

  CloseModel = () => {
    this.setState({
      modalVisible: false,
      reportDetail: '',
      imgUrl: '',
    });
  };

  addSubmit = () => {
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.BOTTOM, // 1.TOP 2.CENTER 3.BOTTOM
    };
    let toastOpts2 = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    const {reportDetail, imgUrl, taskId} = this.state;
    const {login} = this.props;
    if (!reportDetail) {
      toastOpts.data = '请输入举报原因';
      WToast.show(toastOpts);
    } else {
      report(login.userId, taskId, reportDetail, imgUrl).then(
        e => {
          console.log(e);
          this.setState({
            modalVisible: false,
          });
          toastOpts2.data = '提交成功请等待回复';
          WToast.show(toastOpts2);
        },
        () => {
          toastOpts.data = '提交失败';
          WToast.show(toastOpts);
        },
      );
    }
  };

  handelOnJumpToDetail = jobId => {
    console.log(jobId);
    const {navigation, login} = this.props;
    if (login && login.userId) {
      navigation.navigate('HallDetail', {
        jobId: jobId,
      });
    } else {
      navigation.navigate('Login');
    }
  };

  //选择图片
  selectPhotoTapped = () => {
    const options = {
      title: '选择图片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '选择照片',
      // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      cameraType: 'back',
      mediaType: 'photo',
      videoQuality: 'high',
      durationLimit: 10,
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.8,
      angle: 0,
      allowsEditing: false,
      noData: false,
      storageOptions: {
        skipBackup: true,
      },
      permissionDenied: {
        title: '没有权限',
        text: '需要调用您的摄像头和图库权限，可去设置-应用-权限中赋予',
        reTryTitle: '重试',
        okTitle: '确定',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {
          uri: response.uri,
          name: response.fileName,
          type: 'image/png',
        };
        console.log(source);
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        upLoadImg(source).then(img => {
          console.log('source', img);
          this.setState({
            imgUrl: img.data,
          });
        });
        // this.setState({
        //   avatarSource: source,
        // });
      }
    });
  };

  clickReport = taskId => {
    this.setState({
      modalVisible: true,
      reportDetail: '',
      imgUrl: '',
      taskId: taskId,
    });
  };

  handelOnChange = e => {
    this.setState({reportDetail: e});
  };

  render() {
    const {
      labels,
      labelStatus,
      taskList,
      task,
      modalVisible,
      imgUrl,
      reportDetail,
    } = this.state;
    const {width} = Dimensions.get('window');
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
              onPress={() => this.handelOnJumpToDetail(item.jobId)}
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
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.taskListBodyText}>{item.jobId}</Text>
                    {labelStatus == 5 ? (
                      <TouchableOpacity
                        onPress={this.clickReport.bind(this, item.taskId)}>
                        <View
                          style={{
                            width: 60,
                            height: 18,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: '#FFDB44',
                            borderWidth: 1,
                            borderRadius: 7,
                            marginLeft: 5,
                          }}>
                          <Text style={{fontSize: 12, color: '#666666'}}>
                            点击举报
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ) : null}
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
              {labelStatus == 5 ? (
                <>
                  {/* <View style={styles.applyListLine}></View> */}
                  <View style={styles.applyListButton}>
                    <Text style={styles.applyNoPassTxt}>
                      未通过原因: {item.refuseReason}
                    </Text>
                  </View>
                </>
              ) : null}
            </TouchableOpacity>
          )}
          keyExtractor={item => JSON.stringify(item.jobId)}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={this.CloseModel}>
          <View style={styles.taskModal}>
            <View style={[styles.opinionModalView, {width: width * 0.8}]}>
              <View style={styles.opinionTopTitle}>
                <Text style={styles.opinionTopTitleTxt}>举报任务</Text>
              </View>
              <Text style={styles.opinionTitle}>举报原因</Text>
              <TextInput
                style={styles.opinionInp}
                multiline={true}
                placeholder="请详细说明举报原因（必填）"
                maxLength={60}
                value={reportDetail}
                onChangeText={this.handelOnChange}
              />
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <Text style={styles.opinionTitle}>上传举报图片（选填）</Text>
                {imgUrl ? (
                  <FitImage
                    style={{width: 200, height: 200}}
                    source={{uri: paramToQuery2(imgUrl)}}
                    resizeMode="contain"
                  />
                ) : null}
              </TouchableOpacity>
              <View style={styles.opinionBtnView}>
                <TouchableOpacity onPress={this.CloseModel}>
                  <View
                    style={[styles.opinionBtn, {backgroundColor: '#DDDDDD'}]}>
                    <Text style={styles.opinionTxt}>取消</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.addSubmit}>
                  <View
                    style={[styles.opinionBtn, {backgroundColor: '#FFDB44'}]}>
                    <Text style={styles.opinionTxt}>提交</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
    fontSize: 16,
    color: '#444444',
    fontWeight: 'bold',
  },
  taskListBodybtn1: {
    minWidth: 60,
    height: 20,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  taskListBodybtn2: {
    width: 72,
    height: 20,
    borderRadius: 4,
    overflow: 'hidden',
  },
  taskListBodybtn: {
    paddingLeft: 8,
    paddingRight: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDB44',
  },
  taskListBodybtnTxt: {
    fontSize: 12,
    color: '#444444',
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskScreen);
// export default taskScreen;
