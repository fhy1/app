import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {WToast} from 'react-native-smart-tip';
import {wxGetWxInfo, fetchIsPhone, register} from '../../api/login';
import {connect} from 'react-redux';
import * as WeChat from 'react-native-wechat';

class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: '注册',
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
      phone: '',
      code: '',
      newcode: '',
      wx: {},
      phoneFlag: false,
      codeFlag: false,
      upUID: '',
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  validateTel(tel) {
    const TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
    if (TEL_REGEXP.test(tel)) {
      return true;
    }
    return false;
  }

  onChangePhone = e => {
    this.setState({
      phone: e,
    });
  };

  onChangeCode = e => {
    this.setState({
      code: e,
    });
  };

  onChangeNewCode = e => {
    this.setState({
      newcode: e,
    });
  };

  onChangeupUID = e => {
    this.setState({
      upUID: e,
    });
  };

  onClickLogin = () => {
    const {phone, code, phoneFlag, newcode, wx, upUID} = this.state;
    const isPhone = this.validateTel(phone);
    const {navigation} = this.props;
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    if (phoneFlag) {
      toastOpts.data = '请输入正确的手机号';
      WToast.show(toastOpts);
      return;
    }
    if (isPhone) {
      if (!code) {
        toastOpts.data = '请输入密码';
        WToast.show(toastOpts);
      } else if (!newcode) {
        toastOpts.data = '请输入确认密码';
        WToast.show(toastOpts);
      } else {
        if (code == newcode) {
          let data = {
            phone: phone,
            password: code,
            openid: wx.openid,
            nickname: wx.nickname,
            sex: wx.sex,
            headimgurl: wx.headimgurl,
            province: wx.province,
            city: wx.city,
            country: wx.country,
            upUID: upUID,
          };
          register(data).then(
            () => {
              toastOpts.data = '注册成功';
              WToast.show(toastOpts);
              setTimeout(() => {
                this.props.navigation.goBack();
              }, 1000);
            },
            () => {
              toastOpts.data = '注册失败';
              WToast.show(toastOpts);
            },
          );
        } else {
          toastOpts.data = '两次密码输入不一致';
          WToast.show(toastOpts);
        }
      }
    } else {
      toastOpts.data = '请输入正确的手机号';
      WToast.show(toastOpts);
    }
  };

  onChangePhoneBlur = () => {
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    const {phone} = this.state;
    if (phone.length != 11) {
      toastOpts.data = '请输入正确的手机号';
      WToast.show(toastOpts);
      this.setState({
        phoneFlag: true,
      });
    } else {
      fetchIsPhone(phone).then(data => {
        if (data.status == 0) {
          toastOpts.data = data.msg;
          WToast.show(toastOpts);
          this.setState({
            phoneFlag: false,
            phone: 0,
          });
        } else {
          this.setState({
            phoneFlag: false,
          });
        }
      });
    }
  };

  onBindWx = () => {
    const {navigation} = this.props;
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.LONG, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    WeChat.sendAuthRequest('snsapi_userinfo').then(
      data => {
        console.log(data);
        wxGetWxInfo(data.code).then(
          data => {
            console.log('授权成功', data);
            toastOpts.data = '微信授权成功';
            WToast.show(toastOpts);
            this.setState({
              wx: data,
            });
          },
          () => {
            toastOpts.data = '微信授权失败';
            WToast.show(toastOpts);
          },
        );
      },
      () => {
        toastOpts.data = '微信授权失败';
        WToast.show(toastOpts);
      },
    );
  };

  render() {
    const {phone, code, newcode, wx, upUID} = this.state;
    return (
      <View style={styles.loginView}>
        <ScrollView>
          <View style={styles.loginNavView}>
            <View style={styles.loginNavViewInput}>
              <TextInput
                style={styles.loginNavViewTextInput}
                placeholder="请输入手机号"
                value={phone}
                onChangeText={this.onChangePhone}
                onBlur={this.onChangePhoneBlur}
              />
            </View>
            <View style={styles.loginNavViewInput}>
              <TextInput
                placeholder="请输入密码"
                secureTextEntry={true}
                style={styles.loginNavViewTextInput}
                value={code}
                onChangeText={this.onChangeCode}
              />
            </View>
            <View style={styles.loginNavViewInput}>
              <TextInput
                placeholder="请输入确认密码"
                secureTextEntry={true}
                style={styles.loginNavViewTextInput}
                value={newcode}
                onChangeText={this.onChangeNewCode}
              />
            </View>
            <View style={styles.loginNavViewInput}>
              <TextInput
                placeholder="请输入邀请码 (可选填)"
                style={styles.loginNavViewTextInput}
                value={upUID}
                onChangeText={this.onChangeupUID}
              />
            </View>
            <TouchableOpacity onPress={this.onBindWx}>
              <View
                style={{
                  paddingBottom: 30,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {wx.headimgurl ? (
                  <>
                    <Text
                      style={{
                        color: '#444444',
                      }}>
                      微信：
                    </Text>
                    <Image
                      source={{uri: wx.headimgurl}}
                      style={{width: 30, height: 30, borderRadius: 15}}
                    />
                  </>
                ) : (
                  <Text
                    style={{
                      color: '#444444',
                    }}>
                    点击此处绑定微信
                  </Text>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onClickLogin}>
              <View style={styles.loginNavViewBtn}>
                <Text style={styles.loginNavViewTxt}>注册</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loginNavView: {
    paddingTop: 30,
    paddingLeft: 40,
    paddingRight: 40,
  },
  loginNavViewInput: {
    marginBottom: 30,
    height: 44,
    borderColor: '#C4C4C4',
    borderWidth: 0.5,
    borderRadius: 4,
    paddingLeft: 20,
    flexDirection: 'row',
  },
  loginNavViewTextInput: {
    flex: 1,
  },
  loginNavViewInputBtn: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFDB44',
  },
  loginNavViewInputTxt: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  loginNavViewBtn: {
    height: 44,
    backgroundColor: '#FFDB44',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  loginNavViewTxt: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  loginWx: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginWxPress: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginWxImg: {
    width: 32,
    height: 27,
    marginBottom: 7,
  },
  loginWxTxt: {
    color: '#666666',
    fontSize: 14,
  },
});

function mapStateToProps(state) {
  return {
    // hall: state.hall,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
// export default LoginScreen;
