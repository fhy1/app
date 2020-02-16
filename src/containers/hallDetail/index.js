import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Linking,
  TouchableHighlight,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchHallDetail, fetchHallSignUp, HallSubmit} from '../../api/hall';
import {addFollow, isFollow, delFollow} from '../../api/follow';
import {paramToQuery2} from '../../utils/fetch';
import {WToast} from 'react-native-smart-tip';
import ImagePicker from 'react-native-image-picker';
import {upLoadImg} from '../../api/upload';
import {DownloadImage} from '../../utils/downloadImage';
import ImageViewer from 'react-native-image-zoom-viewer';

class HallDetailScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: '悬赏详情',
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
      headerRight: (
        <TouchableOpacity onPress={navigation.getParam('changeChoose')}>
          <View
            style={{
              alignItems: 'center',
              paddingRight: 20,
              paddingLeft: 20,
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: '#444444',
                marginBottom: 3,
              }}></View>
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: '#444444',
                marginBottom: 3,
              }}></View>
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: '#444444',
              }}></View>
          </View>
        </TouchableOpacity>
      ),
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      imgH: [],
      jobDetail: {},
      jobStepList: [],
      isFollow: false,
      isClick: false,
      imgVisible: false,
      images: [],
      commitInfo: '',
      ruleShow: false,
    };
  }

  componentDidMount = () => {
    this.props.navigation.setParams({changeChoose: this.changeChoose});
    const jobId = this.props.navigation.state.params.jobId;
    // const jobUserId = this.props.navigation.state.params.jobUserId;
    const {login} = this.props;
    console.log(login);
    fetchHallDetail(jobId, login.userId).then(jobDetail => {
      console.log('jobDetailsss', jobDetail);
      this.setState({
        jobDetail: jobDetail.data,
        jobStepList: jobDetail.data.jobStepList,
      });
      isFollow(login.userId, jobDetail.data.userId).then(data => {
        this.setState({
          isFollow: data.data == 2 ? false : true,
        });
      });
    });
  };

  changeChoose = () => {
    const {ruleShow} = this.state;
    console.log(ruleShow);
    this.setState({
      ruleShow: !ruleShow,
    });
  };

  //android
  setSize = (imgItem, index) => {
    let {imgH} = this.state;
    let showH;
    if (Platform.OS != 'ios') {
      Image.getSize(imgItem, (w, h) => {
        //多张则循环判断处理
        showH = Math.floor(h / (w / 100));
        imgH[index] = showH;
        console.log('index', index);
        console.log('imgH', imgH);
        this.setState({imgH: imgH});
      });
    }
  };
  //ios
  setSizeIos = (imgItem, index) => {
    let {imgH} = this.state;
    let showH;
    if (Platform.OS == 'ios') {
      Image.getSize(imgItem, (w, h) => {
        //同安卓
        showH = Math.floor(h / (w / 100));
        imgH[index] = showH;
        this.setState({imgH: imgH});
      });
    }
  };

  handelSavePicture = uri => {
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    DownloadImage(uri)
      .then(res => {
        console.log(res);
        if (res.statusCode == 200) {
          this.setState({
            imgVisible: false,
          });
          // toastOpts.data = '图片保存成功';
          // WToast.show(toastOpts);
        } else {
          // toastOpts.data = '图片保存失败';
          // WToast.show(toastOpts);
        }
      })
      .catch(error => {
        toastOpts.data = '图片保存失败';
        WToast.show(toastOpts);
        console.log(error);
      });
  };

  onChangecommitInfo = e => {
    this.setState({
      commitInfo: e,
    });
  };

  contactBaidu = httpDetail => {
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    var baiduURL = 'http://www.baidu.com/';

    Linking.canOpenURL(httpDetail)
      .then(supported => {
        if (!supported) {
          toastOpts.data = '不支持链接至: ' + httpDetail;
          WToast.show(toastOpts);
        } else {
          return Linking.openURL(httpDetail);
        }
      })
      .catch(err => {
        toastOpts.data = '链接错误 : ' + httpDetail;
        WToast.show(toastOpts);
      });
  };

  hallEnroll = status => {
    const jobId = this.props.navigation.state.params.jobId;
    const {login} = this.props;
    const {jobStepList, isClick, commitInfo} = this.state;
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    if (!isClick) {
      this.setState(
        {
          isClick: true,
        },
        () => {
          if (status == 0) {
            fetchHallSignUp(jobId, login.userId).then(
              () => {
                toastOpts.data = '报名成功';
                WToast.show(toastOpts);
                this.setState(state => {
                  state.jobDetail.status = 1;
                  return {
                    isClick: false,
                    jobDetail: state.jobDetail,
                  };
                });
              },
              err => {
                toastOpts.data = err;
                WToast.show(toastOpts);
                this.setState({
                  isClick: false,
                });
              },
            );
          } else if (status == 1) {
            let newApply = {
              jobId: jobId,
              userId: login.userId,
              jobStepDtoList: [],
            };
            let flag = true;
            jobStepList.forEach(item => {
              if (item.checkPicture == 2) {
                if (item.checkStepPicture) {
                  newApply.jobStepDtoList.push({
                    checkPicture: item.checkStepPicture,
                    sort: item.sort,
                  });
                } else {
                  flag = false;
                  toastOpts.data = '步骤' + item.sort + '未提交审核图';
                  // toastOpts.data = '提交成功，请等待审核 ...';
                  WToast.show(toastOpts);
                  this.setState({
                    isClick: false,
                  });
                }
              }
            });
            if (commitInfo == '') {
              flag = false;
              toastOpts.data = '请输入您的提交信息';
              WToast.show(toastOpts);
              this.setState({
                isClick: false,
              });
            }
            if (flag) {
              newApply.commitInfo = commitInfo;
              HallSubmit(newApply).then(
                () => {
                  toastOpts.data = '提交成功，请等待审核 ...';
                  WToast.show(toastOpts);
                  this.setState(state => {
                    state.jobDetail.status = 3;
                    return {
                      isClick: false,
                      jobDetail: state.jobDetail,
                    };
                  });
                },
                e => {
                  console.log(e);
                  toastOpts.data = '提交失败，请检查网络';
                  WToast.show(toastOpts);
                  this.setState({
                    isClick: false,
                  });
                },
              );
            }
          }
        },
      );
    }
  };

  //选择图片
  selectPhotoTapped = index => {
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
      quality: 1,
      angle: 0,
      allowsEditing: false,
      noData: false,
      storageOptions: {
        skipBackup: true,
      },
      permissionDenied: {
        title: '没有权限',
        text: '需要调用您的摄像头权限，可去设置-应用-权限中赋予',
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
        upLoadImg(source).then(img => {
          console.log('source', img);
          this.setState(state => {
            state.jobStepList[index]['checkStepPicture'] = img.data;
            return {
              jobStepList: state.jobStepList,
            };
          });
          // this.setState({
          //   imgUrl: img.data,
          // });
        });
        // let source = {uri: response.uri};

        // // You can also display the image using data:
        // // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        // this.setState({
        //   avatarSource: source,
        // });
      }
    });
  };

  clickToPerson = () => {
    const {login} = this.props;
    // const jobUserId = this.props.navigation.state.params.jobUserId;
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    const {isFollow, jobDetail} = this.state;
    if (!isFollow) {
      console.log(login.userId, jobDetail.userId);
      addFollow(login.userId, jobDetail.userId).then(
        () => {
          toastOpts.data = '关注成功';
          WToast.show(toastOpts);
          this.setState({
            isFollow: true,
          });
        },
        () => {
          toastOpts.data = '关注失败，请检查网络';
          WToast.show(toastOpts);
        },
      );
    } else {
      delFollow(login.userId, jobDetail.userId).then(
        () => {
          this.setState({
            isFollow: false,
          });
        },
        () => {
          toastOpts.data = '取关失败，请检查网络';
          WToast.show(toastOpts);
        },
      );
    }
  };

  goToChart = () => {
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    const {navigation, login} = this.props;
    const {jobDetail} = this.state;
    if (login.userId == jobDetail.userId) {
      toastOpts.data = '无法和自己聊天';
      WToast.show(toastOpts);
    } else {
      navigation.navigate('Chart', {chartUserId: jobDetail.userId});
    }
  };

  clickImg = uri => {
    let img = [{url: uri}];
    this.setState({
      images: img,
      imgVisible: true,
    });
  };

  GotoRule = id => {
    const {navigation} = this.props;
    navigation.navigate('Rule', {id: id});
  };

  savePhoto = () => {
    let {images} = this.state;
    this.handelSavePicture(images[0].url);
  };

  render() {
    const {
      imgH,
      jobDetail,
      jobStepList,
      isFollow,
      images,
      commitInfo,
      ruleShow,
    } = this.state;
    return (
      <View style={styles.hallDetailView}>
        <ScrollView>
          <View style={styles.hallDetail}>
            <View style={styles.hallDetailIcon}>
              {jobDetail.headimgurl ? (
                <Image
                  style={styles.hallDetailIconImg}
                  // @ts-ignore
                  source={{uri: jobDetail.headimgurl}}
                />
              ) : (
                <Image
                  style={styles.hallDetailIconImg}
                  // @ts-ignore
                  source={require('../../assets/head.png')}
                />
              )}
            </View>
            <View style={styles.hallDetailBody}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.hallDetailBodyText}>
                  悬赏ID: {jobDetail.uid}
                </Text>
                <TouchableOpacity onPress={this.clickToPerson}>
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
                      {isFollow ? '取消关注' : '+ 关注'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.hallDetailBodyView}>
                <View style={styles.hallDetailBodybtn1}>
                  <View style={styles.hallDetailBodybtn}>
                    <Text style={styles.hallDetailBodybtnTxt}>
                      {jobDetail.jobSource}
                    </Text>
                  </View>
                </View>
                <View style={styles.hallDetailBodybtn2}>
                  <View style={styles.hallDetailBodybtn}>
                    <Text style={styles.hallDetailBodybtnTxt}>
                      {jobDetail.typeName}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.hallDetailRight}>
              <View style={styles.hallDetailRightBody}>
                <View>
                  <Text style={styles.hallDetailRightTop}>
                    赏{jobDetail.releasePrice}元
                  </Text>
                </View>
                <View>
                  <Text style={styles.hallDetailRightBottom}>
                    {jobDetail.submissionTime}小时内提交
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.hallViewDetail}>
            <View style={styles.hallViewTitle}>
              <View style={styles.hallViewTitleLeft}></View>
              <Text style={styles.hallViewTitleTxt}>
                任务要求{' '}
                <Text style={{fontSize: 13}}>
                  （{jobDetail.audit} 小时内审核通过）
                </Text>
              </Text>
            </View>
            <View style={styles.hallDetailTitle}>
              <Text style={styles.hallDetailTitleTxt}>
                {jobDetail.jobTitle}
              </Text>
            </View>
            <View>
              <Text style={styles.hallDetailBodyTxt}>
                {jobDetail.introduce}
              </Text>
            </View>
          </View>
          <View style={styles.hallViewDetail}>
            <View style={styles.hallViewTitle}>
              <View style={styles.hallViewTitleLeft}></View>
              <Text style={styles.hallViewTitleTxt}>任务步骤</Text>
            </View>
            {jobStepList.map((item, index) => {
              return (
                <View style={styles.hallDetailStep} key={item.stepId}>
                  <View style={styles.hallStepIndex}>
                    <View style={styles.hallStepIndexRow}>
                      <Text style={styles.hallStepIndexRowTxt}>
                        {index + 1}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.hallStepBody}>
                    <Text style={styles.hallStepBodyTxt}>{item.introduce}</Text>

                    <View style={styles.hallStepNav}>
                      {item.stepType == 1 ? (
                        <View>
                          <TouchableOpacity
                            onPress={this.clickImg.bind(
                              this,
                              paramToQuery2(item.picture),
                            )}>
                            <Image
                              onLoadStart={this.setSize.bind(
                                this,
                                paramToQuery2(item.picture),
                                index,
                              )} //多张可多加该图index参数
                              onLayout={this.setSizeIos.bind(
                                this,
                                paramToQuery2(item.picture),
                                index,
                              )}
                              style={{
                                width: 100,
                                height: imgH[index],
                                marginTop: 10,
                              }}
                              source={{uri: paramToQuery2(item.picture)}}
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={this.handelSavePicture.bind(
                              this,
                              paramToQuery2(item.picture),
                            )}>
                            <View style={styles.savePicture}>
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: '#444444',
                                }}>
                                保存图片
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ) : null}
                      {item.stepType == 3 ? (
                        <View>
                          <TouchableOpacity
                            onPress={this.contactBaidu.bind(
                              this,
                              item.website,
                            )}>
                            <Text style={styles.hallStepBodyTxt}>
                              {item.website}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : null}
                      {item.stepType == 2 ? (
                        <View>
                          <Text style={styles.hallStepBodyTxt}>
                            {item.website}
                          </Text>
                        </View>
                      ) : null}
                      {item.checkPicture == 2 ? (
                        <View>
                          <TouchableOpacity
                            onPress={this.selectPhotoTapped.bind(this, index)}>
                            <View style={styles.upLoadCarmea}>
                              <Image
                                style={{
                                  width: 22,
                                  height: 21,
                                }}
                                source={require('../../assets/camera.png')}
                              />
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={this.selectPhotoTapped.bind(this, index)}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#444444',
                                marginLeft: 34,
                                marginTop: 10,
                              }}>
                              添加图片
                            </Text>
                          </TouchableOpacity>
                          {item.checkStepPicture ? (
                            <Image
                              onLoadStart={this.setSize.bind(
                                this,
                                paramToQuery2(item.checkStepPicture),
                                index + jobStepList.length,
                              )} //多张可多加该图index参数
                              onLayout={this.setSizeIos.bind(
                                this,
                                paramToQuery2(item.checkStepPicture),
                                index + jobStepList.length,
                              )}
                              style={{
                                width: 100,
                                height: imgH[index + jobStepList.length],
                                marginTop: 10,
                              }}
                              source={{
                                uri: paramToQuery2(item.checkStepPicture),
                              }}
                            />
                          ) : null}
                        </View>
                      ) : null}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.opinionInpView}>
            <TextInput
              style={styles.opinionInp}
              multiline={true}
              value={commitInfo}
              placeholder="请输入您的提交信息"
              onChangeText={this.onChangecommitInfo}
              maxLength={60}
            />
          </View>

          <TouchableOpacity
            onPress={this.hallEnroll.bind(this, jobDetail.status)}>
            <View style={styles.hallDetailBtn}>
              <Text style={styles.hallDetailBtnTxt}>
                {jobDetail.status == 0
                  ? '报名'
                  : jobDetail.status == 1
                  ? '提交'
                  : jobDetail.status == 3
                  ? '审核中'
                  : ''}
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity style={styles.chartOut} onPress={this.goToChart}>
          <View style={styles.chart}>
            <Text style={styles.chartTxt}>私信</Text>
          </View>
        </TouchableOpacity>
        <Modal
          visible={this.state.imgVisible}
          transparent={true}
          onRequestClose={() => this.setState({imgVisible: false})}>
          <ImageViewer
            onClick={() => this.setState({imgVisible: false})}
            enableImageZoom={true}
            imageUrls={images}
            index={0}
            menuContext={{saveToLocal: '保存图片', cancel: '取消'}}
            onSave={url => {
              this.savePhoto(url);
            }}
          />
        </Modal>
        {ruleShow ? (
          <View style={styles.ruleShow}>
            <TouchableHighlight onPress={this.GotoRule.bind(this, 1)}>
              <View style={styles.ruleShowView}>
                <Text style={styles.ruleShowViewTxt}>发布规则</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.GotoRule.bind(this, 2)}>
              <View style={styles.ruleShowView}>
                <Text style={styles.ruleShowViewTxt}>接单规则</Text>
              </View>
            </TouchableHighlight>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hallDetailView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  hallDetail: {
    paddingLeft: 15,
    height: 68,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  hallDetailIcon: {
    width: 36,
    height: '100%',
    alignItems: 'center',
  },
  hallDetailIconImg: {
    width: 36,
    height: 36,
    marginTop: 16,
  },
  hallDetailBody: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  hallDetailBodyView: {
    flexDirection: 'row',
    marginTop: 6,
  },
  hallDetailBodyText: {
    fontSize: 16,
    color: '#444444',
    fontWeight: 'normal',
  },
  hallDetailBodybtn1: {
    minWidth: 60,
    height: 20,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  hallDetailBodybtn2: {
    width: 72,
    height: 20,
    borderRadius: 4,
    overflow: 'hidden',
  },
  hallDetailBodybtn: {
    paddingLeft: 8,
    paddingRight: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDB44',
  },
  hallDetailBodybtnTxt: {
    color: '#444444',
    fontSize: 12,
  },
  hallDetailRight: {
    width: 80,
    height: '100%',
  },
  hallDetailRightBody: {
    flex: 1,
    justifyContent: 'center',
  },
  hallDetailRightTop: {
    fontSize: 14,
    color: '#FD3F3F',
  },
  hallDetailRightBottom: {
    marginTop: 8,
    fontSize: 12,
    color: '#666666',
  },
  hallViewDetail: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
  },
  hallViewTitle: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  hallViewTitleLeft: {
    height: 18,
    width: 2,
    backgroundColor: '#FFDB44',
    marginRight: 10,
  },
  hallDetailTitle: {
    marginBottom: 5,
  },
  hallViewTitleTxt: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'bold',
  },
  hallDetailTitleTxt: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'bold',
  },
  hallDetailBodyTxt: {
    color: '#444444',
    fontSize: 14,
    lineHeight: 25,
    fontWeight: 'normal',
  },
  hallDetailStep: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  hallStepIndex: {
    width: 41,
    alignItems: 'center',
    paddingTop: 7.5,
  },
  hallStepIndexRow: {
    width: 16,
    height: 16,
    backgroundColor: '#DDDDDD',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hallStepIndexRowTxt: {
    color: '#444444',
    fontSize: 10,
  },
  hallStepBody: {
    flex: 1,
  },
  hallStepBodyTxt: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444444',
    fontWeight: 'normal',
  },
  hallStepNav: {
    flexDirection: 'row',
  },
  savePicture: {
    width: 80,
    height: 28,
    backgroundColor: '#FFDB44',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  upLoadCarmea: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFDB44',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: 34,
  },
  hallDetailBtn: {
    height: 40,
    backgroundColor: '#FFDB44',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  hallDetailBtnTxt: {
    color: '#444444',
    fontSize: 16,
  },
  chartOut: {
    position: 'absolute',
    right: 20,
    bottom: 80,
  },
  // 聊天按钮
  chart: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartTxt: {
    color: '#FFFFFF',
  },

  opinionInpView: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#FFFFFF',
  },
  opinionInp: {
    height: 150,
    backgroundColor: '#F3F3F3',
    textAlignVertical: 'top',
    borderRadius: 5,
  },

  // 规则
  ruleShow: {
    position: 'absolute',
    right: 0,
    top: 0,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  ruleShowView: {
    width: 120,
    height: 40,
    backgroundColor: '#FFFFFF',
    paddingLeft: 15,
    justifyContent: 'center',
  },
  ruleShowViewTxt: {
    color: '#666666',
  },
});

function mapStateToProps(state) {
  return {
    login: state.login.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // fetchHallDetail: (jobId, userId) =>
    //   dispatch(fetchHallDetail(jobId, userId)),
    // fetchHallSignUp: (jobId, userId) =>
    //   dispatch(fetchHallSignUp(jobId, userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HallDetailScreen);
