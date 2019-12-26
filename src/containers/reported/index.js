import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchReward, fetchRewardAudit, rewardReply} from '../../api/report';
import {paramToQuery2} from '../../utils/fetch';
import {upLoadImg} from '../../api/upload';
import ImagePicker from 'react-native-image-picker';
import FitImage from 'react-native-fit-image';
import {WToast} from 'react-native-smart-tip';

class ReportedScreen extends React.Component {
  static navigationOptions = {
    title: '我被举报',
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
        {title: '待回复', id: 1},
        {title: '已回复', id: 2},
        {title: '已提交', id: 3},
        {title: '已审核', id: 4},
      ],
      labelStatus: 1,
      report: {},
      reportList: [],
      page: 1,
      size: 15,
      modalVisible: false,
      reply: '',
      imgUrl: '',
      reportId: '',
      flag: true,
    };
  }

  componentDidMount = () => {
    const {labelStatus, page, size} = this.state;
    const {login} = this.props;
    fetchReward(login.userId, labelStatus, page, size).then(report => {
      this.setState({
        report: report.data,
        reportList: report.data.list,
      });
    });
  };

  componentWillUnmount = () => {
    this.setState({
      modalVisible: false,
    });
  };

  onHandelPress = index => {
    const {login} = this.props;
    this.setState({
      labelStatus: index,
      pageNo: 1,
      pageSize: 15,
    });
    if (index != 4) {
      fetchReward(login.userId, index, 1, 15).then(report => {
        this.setState({
          report: report.data,
          reportList: report.data.list,
        });
      });
    } else {
      fetchRewardAudit(login.userId, 1, 15).then(report => {
        this.setState({
          report: report.data,
          reportList: report.data.list,
        });
      });
    }
  };

  fetchListNext = () => {
    const {report, flag} = this.state;
    const {login} = this.props;
    if (report.pageNum < report.pages && flag) {
      const {page} = this.state;
      this.setState(
        {
          page: page + 1,
          flag: false,
        },
        () => {
          const {page, size, reportList, labelStatus} = this.state;
          if (labelStatus != 4) {
            fetchReward(login.userId, labelStatus, page, size).then(
              report => {
                this.setState({
                  report: report.data,
                  reportList: reportList.concat(report.data.list),
                  flag: true,
                });
              },
              () => {
                this.setState({flag: false});
              },
            );
          } else {
            fetchRewardAudit(login.userId, 1, 15).then(
              report => {
                this.setState({
                  report: report.data,
                  reportList: report.data.list,
                  flag: true,
                });
              },
              () => {
                this.setState({flag: false});
              },
            );
          }
        },
      );
    }
  };

  handelOnChangereply = e => {
    this.setState({
      reply: e,
    });
  };

  showModal = reportId => {
    this.setState({
      modalVisible: true,
      reply: '',
      imgUrl: '',
      reportId: reportId,
    });
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
      maxWidth: 800,
      maxHeight: 800,
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
    const {reply, imgUrl, reportId} = this.state;
    if (!reply) {
      toastOpts.data = '请输入回复';
      WToast.show(toastOpts);
    } else {
      rewardReply(reportId, reply, imgUrl).then(
        e => {
          console.log(e);
          this.setState({
            modalVisible: false,
          });
          toastOpts2.data = '回复成功';
          WToast.show(toastOpts2);
          this.onHandelPress(2);
        },
        () => {
          toastOpts.data = '回复失败';
          WToast.show(toastOpts);
        },
      );
    }
  };

  render() {
    const {
      labels,
      labelStatus,
      reportList,
      report,
      modalVisible,
      reply,
      imgUrl,
    } = this.state;
    const {width} = Dimensions.get('window');
    return (
      <View style={styles.reportView}>
        <View style={styles.reportTitleView}>
          <View style={styles.reportTitle}>
            {labels.map(item => {
              return item.id == labelStatus ? (
                <View
                  style={[styles.reportTitleText, styles.reportTitleClick]}
                  key={item.id}>
                  <Text style={styles.reportTitleTextClick}>{item.title}</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.reportTitleTextTouch}
                  key={item.id}
                  onPress={this.onHandelPress.bind(this, item.id)}>
                  <View
                    style={styles.reportTitleText}
                    onResponderGrant={this.onHandelPress}>
                    <Text style={styles.reportTitleTextNormal}>
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <FlatList
          style={styles.reportFlatList}
          data={reportList}
          ItemSeparatorComponent={() => (
            <View style={styles.reportFlatListLine} />
          )}
          ListEmptyComponent={() => (
            <View style={styles.taskFlatListEmpty}>
              <Text style={styles.taskFlatListEmptyTxt}>暂无数据</Text>
            </View>
          )}
          refreshing={false}
          ListFooterComponent={() =>
            reportList.length > 0 ? (
              <View style={styles.taskFlatListEmpty}>
                <Text style={styles.taskFlatListEmptyTxt}>
                  {report.pageNum == report.pages
                    ? '没有更多了，亲'
                    : '正在加载中，请稍等~'}
                </Text>
              </View>
            ) : null
          }
          onEndReachedThreshold={1}
          onEndReached={this.fetchListNext}
          renderItem={({item, index, separators}) => (
            <View style={styles.reportList}>
              <View style={styles.reportListTitle}>
                <Text style={styles.reportListTitleTxt}>{item.jobTitle}</Text>
                {/* <Text style={styles.reportListTitleMoney}>赏2.25元</Text> */}
              </View>
              <View style={styles.reportListNav}>
                <Text style={styles.reportListNavTxt}>
                  发布时间： {item.reportTime}
                </Text>
                {/* <Text
                  style={[styles.reportListNavTxt, styles.reportListNavRight]}>
                  剩余100份
                </Text> */}
              </View>
              <View style={styles.reportListBtnView}>
                <View style={styles.reportListBtn}>
                  <Text style={styles.reportListBtnTxt}>{item.jobSource}</Text>
                </View>
              </View>
              <View style={styles.applyListLine}></View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text style={styles.applyNoPassTxt}>
                    举报原因: {item.reportReason}
                  </Text>
                  {item.reportImg ? (
                    <View style={styles.applyListButton}>
                      <Text style={styles.applyNoPassTxt}>举报图片:</Text>
                      <Image
                        style={{width: 100, height: 100}}
                        source={{uri: paramToQuery2(item.reportImg)}}
                      />
                    </View>
                  ) : null}
                </View>
                {labelStatus == 1 ? (
                  <View
                    style={{
                      paddingBottom: 8,
                      justifyContent: 'flex-end',
                    }}>
                    <TouchableOpacity
                      onPress={this.showModal.bind(this, item.reportId)}>
                      <View
                        style={{
                          backgroundColor: '#FFDB44',
                          paddingLeft: 10,
                          paddingRight: 10,
                          paddingTop: 2,
                          paddingBottom: 2,
                          borderRadius: 3,
                        }}>
                        <Text
                          style={{
                            color: '#FFFFFF',
                            fontSize: 12,
                          }}>
                          回复
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
              {labelStatus == 2 ? (
                <>
                  <View style={styles.applyListLine}></View>
                  <View>
                    <Text style={styles.applyNoPassTxt}>
                      赏金主回复: {item.replyReason}
                    </Text>
                    <Text style={styles.applyNoPassTxt2}>
                      回复时间: {item.replyTime}
                    </Text>
                    {item.replyImg ? (
                      <View style={styles.applyListButton}>
                        <Text style={styles.applyNoPassTxt}>举报图片:</Text>
                        <Image
                          style={{width: 100, height: 100}}
                          source={{uri: paramToQuery2(item.replyImg)}}
                        />
                      </View>
                    ) : null}
                  </View>
                </>
              ) : null}

              {labelStatus == 3 ? (
                <>
                  <View style={styles.applyListLine}></View>
                  <View>
                    <Text style={styles.applyNoPassTxt}>
                      赏金主回复: {item.replyReason}
                    </Text>
                    <Text style={styles.applyNoPassTxt2}>
                      回复时间: {item.replyTime}
                    </Text>
                    {item.replyImg ? (
                      <View>
                        <Text style={styles.applyNoPassTxt}>举报图片:</Text>
                        <Image
                          style={{width: 100, height: 100}}
                          source={{uri: paramToQuery2(item.replyImg)}}
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.applyListLine}></View>
                  <View>
                    <Text style={styles.applyNoPassTxt}>
                      提交原因: {item.refuteReason}
                    </Text>
                    <Text style={styles.applyNoPassTxt2}>
                      提交时间: {item.refuteTime}
                    </Text>
                  </View>
                </>
              ) : null}

              {labelStatus == 4 ? (
                <>
                  <View style={styles.applyListLine}></View>
                  <View>
                    <Text style={styles.applyNoPassTxt}>
                      赏金主回复: {item.replyReason}
                    </Text>
                    <Text style={styles.applyNoPassTxt2}>
                      回复时间: {item.replyTime}
                    </Text>
                    {item.replyImg ? (
                      <View>
                        <Text style={styles.applyNoPassTxt}>举报图片:</Text>
                        <Image
                          style={{width: 100, height: 100}}
                          source={{uri: paramToQuery2(item.replyImg)}}
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.applyListLine}></View>
                  <View>
                    <Text style={styles.applyNoPassTxt}>
                      提交原因: {item.refuteReason}
                    </Text>
                    <Text style={styles.applyNoPassTxt2}>
                      提交时间: {item.refuteTime}
                    </Text>
                  </View>
                  <View style={styles.applyListLine}></View>
                  <View>
                    <Text style={styles.applyNoPassTxt}>
                      审核结果: {item.auditReason}
                    </Text>
                    <Text style={styles.applyNoPassTxt2}>
                      审核时间: {item.auditTime}
                    </Text>
                  </View>
                </>
              ) : null}
              {/* <View>
                <Text>举报结果：通过</Text>
              </View> */}
            </View>
          )}
          keyExtractor={(item, index) => JSON.stringify(index)}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={this.CloseModel}>
          <View style={styles.taskModal}>
            <View style={[styles.opinionModalView, {width: width * 0.8}]}>
              <View style={styles.opinionTopTitle}>
                <Text style={styles.opinionTopTitleTxt}>回复举报</Text>
              </View>
              <Text style={styles.opinionTitle}>回复举报</Text>
              <TextInput
                style={styles.opinionInp}
                multiline={true}
                placeholder="请详细回复他人举报（必填）"
                maxLength={60}
                value={reply}
                onChangeText={this.handelOnChangereply}
              />
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <Text style={styles.opinionTitle}>上传回复图片（选填）</Text>
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
  reportView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  reportTitleView: {
    height: 40,
  },
  reportTitle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
  },
  reportTitleText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666666',
    fontSize: 14,
    fontWeight: 'normal',
  },
  reportTitleClick: {
    borderBottomColor: '#FD3F3F',
    borderBottomWidth: 1,
  },
  reportTitleTextTouch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportTitleTextClick: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'bold',
  },
  reportTitleTextNormal: {
    fontSize: 14,
    color: '#666666',
    fontWeight: 'normal',
  },
  reportFlatList: {
    backgroundColor: '#F3F3F3',
  },
  reportFlatListLine: {
    height: 10,
    backgroundColor: '#F3F3F3',
  },
  reportList: {
    backgroundColor: '#FFFFFF',
    paddingLeft: 15,
    paddingRight: 15,
  },
  reportListTitle: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12,
  },
  reportListNav: {
    flexDirection: 'row',
  },
  reportListBtnView: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  reportListTitleTxt: {
    color: '#444444',
    fontSize: 14,
    fontWeight: 'bold',
  },
  reportListTitleMoney: {
    position: 'absolute',
    right: 0,
    top: 12,
    fontSize: 14,
    color: '#FD3F3F',
  },
  reportListNavTxt: {
    color: '#666666',
    fontSize: 12,
  },
  reportListNavRight: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  reportListBtn: {
    paddingLeft: 12,
    paddingRight: 12,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#FFDB44',
    marginRight: 10,
  },
  reportListBtnTxt: {
    fontSize: 12,
    color: '#444444',
    fontWeight: 'normal',
  },
  reportListLine: {
    height: 0.5,
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
  applyNoPassTxt2: {
    paddingTop: 0,
    paddingBottom: 10.5,
    color: '#444444',
    fontSize: 12,
  },

  applyListLine: {
    height: 0.5,
    backgroundColor: '#DDDDDD',
  },
  applyListButton: {
    // flexDirection: 'row',
  },
  applyNoPassTxt: {
    paddingTop: 10.5,
    paddingBottom: 10.5,
    color: '#444444',
    fontSize: 12,
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
});

function mapStateToProps(state) {
  return {
    login: state.login.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportedScreen);
