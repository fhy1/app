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
} from 'react-native';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';

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
      step: [],
    };
  }

  componentDidMount = () => {
    // const job = this.props.navigation.state.params.job;
  };

  CloseModel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  changeItem = item => {
    this.setState({
      stepDetail: item,
      optionVisible: true,
    });
  };

  setStep = () => {
    this.setState({
      modalVisible: true,
    });
  };

  addBack = () => {
    this.setState({
      modalVisible: false,
      optionVisible: false,
    });
  };

  //选择图片
  selectPhotoTapped() {
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
        let source = {uri: response.uri};

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  render() {
    const {navigation} = this.props;
    const {width} = Dimensions.get('window');
    const {
      modalVisible,
      stepTypes,
      optionVisible,
      stepType,
      stepDetail,
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
                />
                {stepDetail.type == 1 ? (
                  <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <Text style={styles.opinionTitle}>
                      {stepDetail.detail}： 点击上传
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <Text style={styles.opinionTitle}>{stepDetail.detail}</Text>
                    <TextInput
                      style={styles.opinionInp2}
                      multiline={true}
                      placeholder={'请输入' + stepDetail.detail}
                      maxLength={60}
                    />
                  </>
                )}
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
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseStepScreen);
