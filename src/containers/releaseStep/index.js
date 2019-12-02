import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {upLoadImg} from '../../api/upload';
import {paramToQuery2} from '../../utils/fetch';
import FitImage from 'react-native-fit-image';
import {WToast} from 'react-native-smart-tip';
import {addNewJob} from '../../api/release';

class ReleaseStepScreen extends React.Component {
  static navigationOptions = {
    title: '设置步骤',
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
      stepTypes: [
        {
          title: '输入网址',
          type: '2',
          detail: '填写网址',
        },
        {
          title: '图文说明',
          type: '1',
          detail: '图片说明',
        },
        {
          title: '传二维码',
          type: '1',
          detail: '二维码图',
        },
        {
          title: '复制数据',
          type: '2',
          detail: '填写数据',
        },
        {
          title: '收集截图',
          type: '1',
          detail: '图片示例',
        },
        {
          title: '收集信息',
          type: '2',
          detail: '收集信息',
        },
      ],
      stepDetail: {},
      modalVisible: false,
      optionVisible: false,
      steps: [],
      imgUrl: '',
    };
  }

  componentDidMount = () => {
    const job = this.props.navigation.state.params.job;
    console.log(job);
  };

  componentWillUnmount = () => {
    this.setState({
      modalVisible: false,
      optionVisible: false,
    });
  };

  CloseModel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  changeItem = item => {
    item.checkPicture = '';
    item.website = '';
    item.introduce = '';
    this.setState({
      stepDetail: item,
      optionVisible: true,
    });
  };

  setStep = () => {
    this.setState({
      modalVisible: true,
      imgUrl: '',
    });
  };

  removeStep = index => {
    this.setState(state => {
      state.steps.splice(index, 1);
      return {
        stepDetail: state.steps,
      };
    });
  };

  addBack = () => {
    this.setState({
      modalVisible: false,
      optionVisible: false,
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
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.8,
      angle: 0,
      allowsEditing: false,
      noData: false,
      storageOptions: {
        skipBackup: true,
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

  handelOnChange = (item, e) => {
    this.setState(state => {
      state.stepDetail[item] = e;
      return {
        stepDetail: state.stepDetail,
      };
    });
  };

  ChangeCheck = check => {
    this.setState(state => {
      state.stepDetail['checkPicture'] = check;
      return {
        stepDetail: state.stepDetail,
      };
    });
  };

  addSubmit = () => {
    const {stepDetail, imgUrl} = this.state;
    this.setState(state => {
      const newsteps =
        stepDetail.type == 1
          ? state.steps.concat({
              introduce: stepDetail.introduce,
              checkPicture: stepDetail.checkPicture,
              stepType: stepDetail.type,
              picture: imgUrl,
            })
          : state.steps.concat({
              introduce: stepDetail.introduce,
              checkPicture: stepDetail.checkPicture,
              stepType: stepDetail.type,
              website: stepDetail.website,
            });
      return {
        steps: newsteps,
        modalVisible: false,
        optionVisible: false,
      };
    });
  };

  releaseAddStep = () => {
    let newJob = this.props.navigation.state.params.job;
    const {login, navigation} = this.props;
    const {steps} = this.state;
    console.log(newJob);
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };

    if (steps.length > 0) {
      console.log('steps', steps);
      newJob.stepList = steps;
      newJob.stepList.forEach((item, index) => {
        newJob.stepList[index]['sort'] = index + 1;
      });
      newJob.userId = login.userId;
      console.log('newJob', newJob);
      addNewJob(newJob).then(data => {
        if (data.status == 2) {
          toastOpts.data = '账户余额不足，请立即充值';
          WToast.show(toastOpts);
        } else {
          toastOpts.data = '申请成功请等待审核';
          WToast.show(toastOpts);
          setTimeout(() => {
            navigation.navigate('MyInfo');
          }, 1000);
        }
      });
    } else {
      toastOpts.data = '请添加步骤';
      WToast.show(toastOpts);
    }
  };

  render() {
    const {navigation} = this.props;
    const {width} = Dimensions.get('window');
    const {
      modalVisible,
      stepTypes,
      optionVisible,
      stepType,
      stepDetail,
      imgUrl,
      steps,
    } = this.state;
    return (
      <View style={styles.releaseStepView}>
        <ScrollView>
          <View style={styles.setStep}>
            <View>
              <Text style={styles.setStepTitle}>添加步骤</Text>
            </View>
            <View style={styles.setStepNav}>
              <Text style={styles.setStepNavTxt}>设置步骤</Text>
              <TouchableOpacity
                style={styles.setStepNavBtnTouch}
                onPress={this.setStep}>
                <View style={styles.setStepNavBtn}>
                  <Text style={styles.setStepNavBtnTxt}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {steps.map((item, index) => {
            return (
              <View style={styles.stepView} key={index}>
                <View style={styles.stepViewTitle}>
                  <Text style={styles.stepViewTitleTxt}>步骤{index + 1}</Text>
                  <TouchableOpacity
                    style={[styles.setStepNavBtnTouch, {right: 28, top: 10}]}
                    onPress={this.removeStep.bind(this, index)}>
                    <View
                      style={[
                        styles.setStepNavBtn,
                        {backgroundColor: '#f75139'},
                      ]}>
                      <Text style={[styles.setStepNavBtnTxt, {fontSize: 20}]}>
                        -
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.stepViewBody}>
                  <View style={styles.stepViewBodyIns}>
                    <Text style={styles.stepViewBodyTxt1}>步骤说明： </Text>
                    <Text style={styles.stepViewBodyTxt2}>
                      {item.introduce}
                    </Text>
                  </View>
                  <View style={styles.stepViewBodyInsLine} />
                  {item.stepType == 2 ? (
                    <View style={styles.stepViewBodyIns}>
                      <Text style={styles.stepViewBodyTxt1}>添加网址： </Text>
                      <Text style={styles.stepViewBodyTxt2}>
                        {item.website}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.stepViewBodyIns}>
                      <Text style={styles.stepViewBodyTxt1}>图文说明： </Text>
                      <FitImage
                        style={{width: 200, height: 200}}
                        source={{uri: paramToQuery2(item.picture)}}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                  <View style={styles.stepViewBodyInsLine} />
                  <View style={styles.stepViewBodyIns}>
                    <Text style={styles.stepViewBodyTxt1}>
                      是否需要验证图：{' '}
                    </Text>
                    <View
                      style={[
                        styles.releaseListCheck,
                        {flex: 1, alignItems: 'center'},
                      ]}>
                      {/* <TouchableWithoutFeedback
                        onPress={this.ChangeCheck.bind(this, 2)}> */}
                      {item.checkPicture === 1 ? (
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
                      {/* </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback
                        onPress={this.ChangeCheck.bind(this, 1)}> */}
                      <View>
                        <Text style={styles.releaseListCheckTxt}>需要</Text>
                      </View>
                      {/* </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback
                        onPress={this.ChangeCheck.bind(this, 1)}> */}
                      {item.checkPicture === 2 ? (
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
                      {/* </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback
                        onPress={this.ChangeCheck.bind(this, 2)}> */}
                      <Text style={styles.releaseListCheckTxt}>不需要</Text>
                      {/* </TouchableWithoutFeedback> */}
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
          {/* <View style={styles.stepView}>
            <View style={styles.stepViewTitle}>
              <Text style={styles.stepViewTitleTxt}>步骤1</Text>
              <TouchableOpacity
                style={[styles.setStepNavBtnTouch, {right: 28, top: 10}]}
                onPress={this.setStep}>
                <View
                  style={[styles.setStepNavBtn, {backgroundColor: '#f75139'}]}>
                  <Text style={[styles.setStepNavBtnTxt, {fontSize: 20}]}>
                    -
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.stepViewBody}>
              <View style={styles.stepViewBodyIns}>
                <Text style={styles.stepViewBodyTxt1}>步骤说明： </Text>
                <Text style={styles.stepViewBodyTxt2}>
                  hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha
                </Text>
              </View>
              <View style={styles.stepViewBodyInsLine} />
              <View style={styles.stepViewBodyIns}>
                <Text style={styles.stepViewBodyTxt1}>添加网址： </Text>
                <Text style={styles.stepViewBodyTxt2}>heihei</Text>
              </View>
            </View>
          </View>

          <View style={styles.stepView}>
            <View style={styles.stepViewTitle}>
              <Text style={styles.stepViewTitleTxt}>步骤2</Text>
            </View>
            <View style={styles.stepViewBody}>
              <View style={styles.stepViewBodyIns}>
                <Text style={styles.stepViewBodyTxt1}>步骤说明： </Text>
                <Text style={styles.stepViewBodyTxt2}></Text>
              </View>
              <View style={styles.stepViewBodyInsLine} />
              <View style={styles.stepViewBodyIns}>
                <Text style={styles.stepViewBodyTxt1}>是否需要验证图： </Text>
                <View
                  style={[
                    styles.releaseListCheck,
                    {flex: 1, alignItems: 'center'},
                  ]}>
                  <TouchableWithoutFeedback
                    onPress={this.ChangeCheck.bind(this, 2)}>
                    {stepDetail.checkPicture === 1 ? (
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
                      <Text style={styles.releaseListCheckTxt}>需要</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={this.ChangeCheck.bind(this, 1)}>
                    {stepDetail.checkPicture === 2 ? (
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
                    <Text style={styles.releaseListCheckTxt}>不需要</Text>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </View> */}
          <View style={styles.opinionAddBtn}>
            <TouchableOpacity onPress={this.releaseAddStep}>
              <View style={styles.opinionAddBtnView}>
                <Text style={styles.opinionBtnViewTxt}>申请发布</Text>
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
            {optionVisible ? (
              <View style={styles.opinionModalView}>
                <View style={styles.opinionTopTitle}>
                  <Text style={styles.opinionTopTitleTxt}>
                    {stepDetail.title}
                  </Text>
                </View>
                <Text style={styles.opinionTitle}>步骤说明</Text>
                <TextInput
                  style={styles.opinionInp}
                  multiline={true}
                  placeholder="请详细说明您的步骤说明"
                  maxLength={60}
                  value={stepDetail.introduce}
                  onChangeText={this.handelOnChange.bind(this, 'introduce')}
                />
                {stepDetail.type == 1 ? (
                  <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <Text style={styles.opinionTitle}>
                      {stepDetail.detail}： 点击上传
                    </Text>
                    {imgUrl ? (
                      <FitImage
                        style={{width: 200, height: 200}}
                        source={{uri: paramToQuery2(imgUrl)}}
                        resizeMode="contain"
                      />
                    ) : null}
                  </TouchableOpacity>
                ) : (
                  <>
                    <Text style={styles.opinionTitle}>{stepDetail.detail}</Text>
                    <TextInput
                      style={styles.opinionInp2}
                      multiline={true}
                      placeholder={'请输入' + stepDetail.detail}
                      maxLength={60}
                      value={stepDetail.website}
                      onChangeText={this.handelOnChange.bind(this, 'website')}
                    />
                  </>
                )}
                <Text style={[styles.opinionTitle, {marginBottom: 5}]}>
                  是否需要验证图
                </Text>
                <View style={styles.releaseListCheck}>
                  <TouchableWithoutFeedback
                    onPress={this.ChangeCheck.bind(this, 2)}>
                    {stepDetail.checkPicture === 2 ? (
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
                    onPress={this.ChangeCheck.bind(this, 2)}>
                    <View>
                      <Text style={styles.releaseListCheckTxt}>需要</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={this.ChangeCheck.bind(this, 1)}>
                    {stepDetail.checkPicture === 1 ? (
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
                    onPress={this.ChangeCheck.bind(this, 1)}>
                    <Text style={styles.releaseListCheckTxt}>不需要</Text>
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.opinionBtnView}>
                  <TouchableOpacity onPress={this.addBack}>
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
            ) : (
              <View style={styles.taskModalBottom}>
                {stepTypes.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={this.changeItem.bind(this, item)}
                      key={index}>
                      <View
                        style={[styles.taskModalBottomList, {width: width}]}>
                        <Text>{item.title}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
                <TouchableOpacity onPress={this.CloseModel}>
                  <View style={[styles.taskModalBottomBack, {width: width}]}>
                    <Text>关闭</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  releaseStepView: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  setStep: {
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFFFFF',
  },
  setStepTitle: {
    fontWeight: 'bold',
    paddingTop: 15,
    paddingBottom: 10,
    color: '#444444',
    fontSize: 14,
  },
  setStepNav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
  },
  setStepNavTxt: {
    fontWeight: 'normal',
    color: '#666666',
    fontSize: 12,
  },
  setStepNavBtnTouch: {
    flex: 1,
    position: 'absolute',
    right: 15,
    top: -5,
  },
  setStepNavBtn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFDB44',
    justifyContent: 'center',
    alignItems: 'center',
  },
  setStepNavBtnTxt: {
    color: '#FFFFFF',
    marginTop: -1,
  },
  //弹框 步骤
  opinionModalView: {
    backgroundColor: '#FFFFFF',
    width: 400,
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
    // flex: 1,
    flexDirection: 'row',
    height: 30,
    // justifyContent: 'center',
  },

  //弹框下拉
  taskModal: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    flex: 1,
    alignItems: 'center',
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
    marginBottom: -0.5,
  },
  taskModalBottomBack: {
    backgroundColor: '#F3F3F3',
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //步骤
  stepView: {
    backgroundColor: '#FFFFFF',
    marginTop: 10,
  },
  stepViewTitle: {
    paddingTop: 10.5,
    paddingBottom: 10.5,
    paddingLeft: 15,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
  },
  stepViewTitleTxt: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'bold',
  },
  stepViewBody: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  stepViewBodyIns: {
    paddingTop: 10.5,
    paddingBottom: 10.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepViewBodyInsLine: {
    height: 1,
    backgroundColor: '#DDDDDD',
  },
  stepViewBodyTxt1: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'bold',
  },
  stepViewBodyTxt2: {
    fontSize: 12,
    color: '#666666',
    fontWeight: 'normal',
    flex: 1,
  },

  //申请按钮
  opinionAddBtn: {
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#F3F3F3',
    paddingBottom: 15,
  },
  opinionAddBtnView: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDB44',
    borderRadius: 4,
    marginTop: 15,
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

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseStepScreen);
