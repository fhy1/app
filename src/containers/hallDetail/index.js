import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchHallDetail, fetchHallSignUp} from '../../api/hall';
import {paramToQuery2} from '../../utils/fetch';
import {WToast} from 'react-native-smart-tip';

class HallDetailScreen extends React.Component {
  static navigationOptions = {
    title: '悬赏详情',
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
      imgH: [],
      jobDetail: {},
      jobStepList: [],
    };
  }

  componentDidMount = () => {
    const jobId = this.props.navigation.state.params.jobId;
    const {login} = this.props;
    console.log(login);
    fetchHallDetail(jobId, login.userId).then(jobDetail => {
      console.log(jobDetail);
      this.setState({
        jobDetail: jobDetail.data,
        jobStepList: jobDetail.data.jobStepList,
      });
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

  handelSavePicture = () => {};

  hallEnroll = status => {
    const jobId = this.props.navigation.state.params.jobId;
    const {login} = this.props;
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    if (status == 0) {
      this.props.fetchHallSignUp(jobId, login.userId).then(
        () => {
          toastOpts.data = '报名成功';
          WToast.show(toastOpts);
        },
        err => {
          toastOpts.data = err;
          WToast.show(toastOpts);
        },
      );
    }
  };

  render() {
    const {imgH, jobDetail, jobStepList} = this.state;
    console.log('jobDetail:', jobDetail);
    console.log('jobStepList:', jobStepList);
    return (
      <View style={styles.hallDetailView}>
        <ScrollView>
          <View style={styles.hallDetail}>
            <View style={styles.hallDetailIcon}>
              {jobDetail.headimgurl ? (
                <Image
                  style={styles.hallDetailIconImg}
                  // @ts-ignore
                  source={{uri: paramToQuery2(jobDetail.headimgurl)}}
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
              <View>
                <Text style={styles.hallDetailBodyText}>
                  悬赏ID: {jobDetail.uid}
                </Text>
              </View>
              <View style={styles.hallDetailBodyView}>
                <View style={styles.hallDetailBodybtn1}>
                  <View style={styles.hallDetailBodybtn}>
                    <Text>{jobDetail.jobSource}</Text>
                  </View>
                </View>
                <View style={styles.hallDetailBodybtn2}>
                  <View style={styles.hallDetailBodybtn}>
                    <Text>{jobDetail.typeName}</Text>
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
              <Text style={styles.hallViewTitleTxt}>任务要求</Text>
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
                          <TouchableOpacity
                            onPress={this.handelSavePicture.bind(this)}>
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
                      {item.stepType == 2 ? (
                        <View>
                          <Text style={styles.hallStepBodyTxt}>
                            item.website
                          </Text>
                        </View>
                      ) : null}
                      {item.checkPicture == 1 ? (
                        <View>
                          <View style={styles.upLoadCarmea}>
                            <Image
                              style={{
                                width: 22,
                                height: 21,
                              }}
                              source={require('../../assets/camera.png')}
                            />
                          </View>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#444444',
                              marginLeft: 34,
                              marginTop: 10,
                            }}>
                            添加图片
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                </View>
              );
            })}
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
    fontSize: 14,
    color: '#444444',
    fontWeight: 'normal',
  },
  hallDetailBodybtn1: {
    width: 60,
    height: 22,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  hallDetailBodybtn2: {
    width: 72,
    height: 22,
    borderRadius: 4,
    overflow: 'hidden',
  },
  hallDetailBodybtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDB44',
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
  },
  hallDetailBtnTxt: {
    color: '#444444',
    fontSize: 16,
  },
});

function mapStateToProps(state) {
  return {
    login: state.login.login,
    jobDetail: state.hall.jobDetail,
    jobStepList: state.hall.jobStepList,
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
