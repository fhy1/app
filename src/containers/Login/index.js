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
import Swiper from 'react-native-swiper';
import {WToast} from 'react-native-smart-tip';
import {
  fetchUserCode,
  fetchCheckCode,
  fetchCheckEnroll,
} from '../../actions/login';
import {connect} from 'react-redux';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: '登录',
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
      topHeight: 0,
      topWidth: 0,
      showFlag: false,
      clickTime: 60,
      phone: '',
      code: '',
    };
  }

  Time = null;

  componentDidMount() {
    let {width} = Dimensions.get('window');
    this.setState({
      topHeight: (915 * width) / 1513,
      topWidth: isNaN(width) ? 0 : width,
    });
  }

  componentWillUnmount() {
    clearInterval(this.Time);
  }

  validateTel(tel) {
    const TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
    if (TEL_REGEXP.test(tel)) {
      return true;
    }
    return false;
  }

  onClickPress = () => {
    const {phone} = this.state;
    const isPhone = this.validateTel(phone);
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    console.log(isPhone);
    if (isPhone) {
      this.setState({
        showFlag: true,
      });

      this.Time = setInterval(() => {
        this.setState(state => {
          if (state.clickTime === 0) {
            clearInterval(this.Time);
            return {
              clickTime: 60,
              showFlag: false,
            };
          } else {
            return {
              clickTime: state.clickTime - 1,
              showFlag: true,
            };
          }
        });
      }, 1000);
      this.props.fetchUserCode(phone).then(
        () => {},
        e => {
          console.log(e);
          toastOpts.data = '获取验证码失败，请稍后再试';
          WToast.show(toastOpts);
        },
      );
    } else {
      toastOpts.data = '请输入正确的手机号';
      WToast.show(toastOpts);
    }
  };

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

  onClickLogin = () => {
    const {phone, code} = this.state;
    const isPhone = this.validateTel(phone);
    const {navigation} = this.props;
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    if (isPhone) {
      if (code) {
        this.props.fetchCheckCode({phone, code}).then(
          () => {
            console.log('成功啦');
            this.props.fetchCheckEnroll({phone}).then(() => {
              navigation.navigate('Home');
            });
          },
          () => {
            toastOpts.data = '手机号或验证码不正确';
            WToast.show(toastOpts);
            this.setState({
              code: '',
            });
          },
        );
      } else {
        toastOpts.data = '请输入验证码';
        WToast.show(toastOpts);
      }
    } else {
      toastOpts.data = '请输入正确的手机号';
      WToast.show(toastOpts);
    }
  };

  onHandelPress = () => {};

  render() {
    const {topHeight, topWidth, showFlag, clickTime, phone, code} = this.state;
    return (
      <View style={styles.loginView}>
        <ScrollView>
          <View>
            <Swiper
              style={{
                width: topWidth,
                height: topHeight,
                marginTop: -1,
              }} //样式
              height={topHeight} //组件高度
              loop={false} //如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
              autoplay={false} //自动轮播
              autoplayTimeout={4} //每隔4秒切换
              horizontal={false} //水平方向，为false可设置为竖直方向
              paginationStyle={{bottom: 20}} //小圆点的位置：距离底部10px
              showsButtons={false} //为false时不显示控制按钮
              showsPagination={false} //为false不显示下方圆点
              dot={
                <View
                  style={{
                    //未选中的圆点样式
                    backgroundColor: 'rgba(0,0,0,.2)',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: 10,
                    marginRight: 9,
                    marginTop: 9,
                    marginBottom: 9,
                  }}
                />
              }
              activeDot={
                <View
                  style={{
                    //选中的圆点样式
                    backgroundColor: '#000000',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: 10,
                    marginRight: 9,
                    marginTop: 9,
                    marginBottom: 9,
                  }}
                />
              }>
              <Image
                // @ts-ignore
                source={require('../../assets/login_bg.png')}
                style={styles.swiperImage}
              />
            </Swiper>
            <View
              style={[
                styles.loginHead,
                {
                  width: topWidth,
                  height: topHeight,
                },
              ]}>
              <Image
                style={{width: 127, height: 127}}
                source={require('../../assets/logo.png')}
              />
            </View>
          </View>
          <View style={styles.loginTitle}>
            <Text style={styles.loginTitleTxt}>欢迎登陆</Text>
          </View>
          <View style={styles.loginNavView}>
            <View style={styles.loginNavViewInput}>
              <TextInput
                style={styles.loginNavViewTextInput}
                placeholder="请输入手机号"
                value={phone}
                onChangeText={this.onChangePhone}
              />
            </View>
            <View style={styles.loginNavViewInput}>
              <TextInput
                placeholder="请输入验证码"
                style={styles.loginNavViewTextInput}
                value={code}
                onChangeText={this.onChangeCode}
              />
              <View style={styles.loginNavViewInputBtn}>
                {showFlag ? (
                  <Text style={styles.loginNavViewInputTxt}>
                    {clickTime + '秒'}
                  </Text>
                ) : (
                  <TouchableOpacity onPress={this.onClickPress}>
                    <Text style={styles.loginNavViewInputTxt}>获取验证码</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <TouchableOpacity onPress={this.onClickLogin}>
              <View style={styles.loginNavViewBtn}>
                <Text style={styles.loginNavViewTxt}>登录</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.loginWx}>
            <TouchableOpacity
              style={styles.loginWxPress}
              onPress={this.onHandelPress}>
              <Image
                style={styles.loginWxImg}
                source={require('../../assets/wxLogo.png')}
              />
              <Text style={styles.loginWxTxt}>微信登录</Text>
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
  loginHead: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiperImage: {
    width: '100%',
    height: '100%',
  },
  loginTitle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTitleTxt: {
    fontSize: 22,
    fontWeight: 'normal',
    color: '#333333',
    marginTop: 15,
    marginBottom: 20,
  },
  loginNavView: {
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
  return {
    fetchUserCode: phone => dispatch(fetchUserCode(phone)),
    fetchCheckCode: data => dispatch(fetchCheckCode(data)),
    fetchCheckEnroll: data => dispatch(fetchCheckEnroll(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
// export default LoginScreen;
