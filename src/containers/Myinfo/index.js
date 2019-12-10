import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import FitImage from 'react-native-fit-image';
import Swiper from 'react-native-swiper';
import {connect} from 'react-redux';
import {fetchMoneyAll, saveMoney} from '../../api/myinfo';
import {getLogin} from '../../api/login';
import {setData} from '../../utils/storage';

class MyInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topHeight: 0,
      topWidth: 0,
      money: {
        balance: 0,
        repaidBalance: 0,
        bonus: 0,
      },
    };
  }

  componentDidMount() {
    let {width} = Dimensions.get('window');
    console.log(isNaN(width));
    this.setState({
      topHeight: (915 * width) / 1513,
      topWidth: isNaN(width) ? 0 : width,
    });
    const {login} = this.props;
    if (login && login.userId) {
      fetchMoneyAll(login.userId).then(
        money => {
          this.props.saveMoney(money.data);
        },
        () => {},
      );
    }
  }

  logout = async () => {
    await setData('userNews', {});
    this.props.getLogin({});
    this.props.saveMoney({
      balance: 0,
      repaidBalance: 0,
      bonus: 0,
    });
  };

  render() {
    const {topHeight, topWidth} = this.state;
    const {navigation, login, money} = this.props;
    console.log(money);
    console.log('login', login);
    const imgWidth = parseInt((topWidth / 350) * 80);
    let member = '普通会员';
    if (login) {
      if (login.isMember == 1) {
        member = '普通会员';
      } else if (login.isMember == 2) {
        member = '周会员';
      } else if (login.isMember == 3) {
        member = '月会员';
      } else if (login.isMember == 4) {
        member = '季会员';
      } else if (login.isMember == 5) {
        member = '年会员';
      }
    }
    return (
      <View style={styles.myInfoView}>
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
              {/* headimgurl */}
            </Swiper>
            <View
              style={[
                styles.myInfoHead,
                {
                  width: imgWidth,
                  height: imgWidth,
                  borderRadius: imgWidth / 2,
                  overflow: 'hidden',
                  backgroundColor: login && login.headimgurl ? '' : 'gray',
                },
              ]}>
              {login && login.headimgurl ? (
                <Image
                  style={{
                    width: imgWidth,
                    height: imgWidth,
                    borderRadius: imgWidth / 2,
                  }}
                  source={{uri: login.headimgurl}}
                />
              ) : null}
            </View>
            {login && login.userId ? (
              <View
                style={{
                  position: 'absolute',
                  height: imgWidth,
                  justifyContent: 'center',
                  top: 30,
                  left: 30 + imgWidth,
                }}>
                <Text
                  style={{color: '#444444', fontSize: 14, marginBottom: 14}}>
                  ID: {login.uid}
                </Text>
                <Text style={{color: '#444444', fontSize: 14}}>{member}</Text>
              </View>
            ) : (
              <View
                style={{
                  position: 'absolute',
                  height: imgWidth,
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: 30,
                  left: 30 + imgWidth,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Login');
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#444444',
                    }}>
                    立即登录
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.topView}>
            <View style={styles.navView}>
              <View style={{flexDirection: 'row', height: 80}}>
                <View style={styles.navViewMoney}>
                  <View>
                    <Text style={styles.navViewMoneyTopTxt}>我的赏金</Text>
                  </View>
                  <View style={styles.navViewMoneyMiddle}>
                    <Text style={styles.navViewMoneyMiddleTxt1}>￥ </Text>
                    <Text style={styles.navViewMoneyMiddleTxt2}>
                      {money.balance} 元
                    </Text>
                  </View>
                  {/* <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Withdraw');
                  }}>
                  <View style={styles.navViewMoneybtn}>
                    <Text style={styles.navViewMoneybtnTxt}>提现</Text>
                  </View>
                </TouchableOpacity> */}
                </View>
                <View style={styles.navViewLine}>
                  <View style={styles.navViewLineIn}></View>
                </View>
                <View style={styles.navViewMoney}>
                  <View>
                    <Text style={styles.navViewMoneyTopTxt}>我的奖励</Text>
                  </View>
                  <View style={styles.navViewMoneyMiddle}>
                    <Text style={styles.navViewMoneyMiddleTxt1}>￥ </Text>
                    <Text style={styles.navViewMoneyMiddleTxt2}>
                      {money.bonus} 元
                    </Text>
                  </View>
                  {/* <TouchableOpacity
                  onPress={() => {
                    // getWxPay(7, 0.1, 2, '').then(data => {
                    //   let xxx = data.data;
                    //   WeChat.isWXAppInstalled().then(isInstalled => {
                    //     if (isInstalled) {
                    //       WeChat.pay({
                    //         partnerId: xxx.partnerid, // 商家向财付通申请的商家id
                    //         prepayId: xxx.prepayid, // 预支付订单
                    //         nonceStr: xxx.noncestr, // 随机串，防重发
                    //         timeStamp: xxx.timestamp, // 时间戳，防重发.
                    //         package: xxx.package, // 商家根据财付通文档填写的数据和签名
                    //         sign: xxx.sign, // 商家根据微信开放平台文档对数据做的签名
                    //       })
                    //         .then(requestJson => {
                    //           //支付成功回调
                    //           if (requestJson.errCode == '0') {
                    //             //回调成功处理
                    //             Alert.alert('支付失败');
                    //           }
                    //         })
                    //         .catch(err => {
                    //           Alert.alert('支付失败');
                    //         });
                    //     } else {
                    //       Alert.alert('请安装微信');
                    //     }
                    //   });
                    // });
                    // navigation.navigate('Withdraw');
                  }}>
                  <View style={styles.navViewMoneybtn}>
                    <Text style={styles.navViewMoneybtnTxt}>提现</Text>
                  </View>
                </TouchableOpacity> */}
                </View>
                <View style={styles.navViewLine}>
                  <View style={styles.navViewLineIn}></View>
                </View>
                <View style={styles.navViewMoney}>
                  <View>
                    <Text style={styles.navViewMoneyTopTxt}>我的余额</Text>
                  </View>
                  <View style={styles.navViewMoneyMiddle}>
                    <Text style={styles.navViewMoneyMiddleTxt1}>￥ </Text>
                    <Text style={styles.navViewMoneyMiddleTxt2}>
                      {money.repaidBalance} 元
                    </Text>
                  </View>
                  {/* <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Withdraw');
                  }}>
                  <View style={styles.navViewMoneybtn}>
                    <Text style={styles.navViewMoneybtnTxt}>提现</Text>
                  </View>
                </TouchableOpacity> */}
                </View>
              </View>
              <View style={{height: 0.5, paddingLeft: 15, paddingRight: 15}}>
                <View style={styles.navViewLineIn}></View>
              </View>
              <View style={{flexDirection: 'row', height: 40}}>
                <TouchableOpacity
                  style={{flex: 1}}
                  onPress={() => {
                    navigation.navigate('Member');
                  }}>
                  <View
                    style={{
                      height: 40,
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.navViewMoneyTopTxt}>会员中心</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.navViewLine}>
                  <View style={styles.navViewLineIn}></View>
                </View>
                <TouchableOpacity
                  style={{flex: 1}}
                  onPress={() => {
                    if (login && login.userId) {
                      navigation.navigate('Recharge');
                    } else {
                      navigation.navigate('Login');
                    }
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.navViewMoneyTopTxt}>充值提现</Text>
                    <Image
                      style={{width: 13, height: 26, marginLeft: 10}}
                      // @ts-ignore
                      source={require('../../assets/go.png')}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {/* <View style={{ height: 40 }}></View> */}
          </View>
          <View style={styles.myinfoMore}>
            <View style={styles.myinfoMoreView}>
              <TouchableOpacity
                onPress={() => {
                  if (login && login.userId) {
                    navigation.navigate('Task');
                  } else {
                    navigation.navigate('Login');
                  }
                }}>
                <View style={styles.myinfoMoreItem}>
                  <View style={styles.myinfoMoreIcon}>
                    <FitImage
                      style={{width: 21, height: 22}}
                      // @ts-ignore
                      source={require('../../assets/task.png')}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.myinfoMoreTxt}>
                    <Text style={styles.myinfoMoreTxtTitle}>我的任务</Text>
                  </View>
                  <View style={styles.myinfoMoreGo}>
                    <FitImage
                      style={{width: 15, height: 30}}
                      // @ts-ignore
                      source={require('../../assets/go.png')}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  if (login && login.userId) {
                    navigation.navigate('Release');
                  } else {
                    navigation.navigate('Login');
                  }
                }}>
                <View style={styles.myinfoMoreItem}>
                  <View style={styles.myinfoMoreIcon}>
                    <FitImage
                      style={{width: 21.5, height: 21}}
                      // @ts-ignore
                      source={require('../../assets/release.png')}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.myinfoMoreTxt}>
                    <Text style={styles.myinfoMoreTxtTitle}>发布/悬赏管理</Text>
                  </View>
                  <View style={styles.myinfoMoreGo}>
                    <FitImage
                      style={{width: 15, height: 30}}
                      // @ts-ignore
                      source={require('../../assets/go.png')}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (login && login.userId) {
                    navigation.navigate('Apply');
                  } else {
                    navigation.navigate('Login');
                  }
                }}>
                <View style={styles.myinfoMoreItem}>
                  <View style={styles.myinfoMoreIcon}>
                    <FitImage
                      style={{width: 22, height: 22}}
                      // @ts-ignore
                      source={require('../../assets/apply.png')}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.myinfoMoreTxt}>
                    <Text style={styles.myinfoMoreTxtTitle}>审核任务</Text>
                  </View>
                  <View style={styles.myinfoMoreGo}>
                    <FitImage
                      style={{width: 15, height: 30}}
                      // @ts-ignore
                      source={require('../../assets/go.png')}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (login && login.userId) {
                    navigation.navigate('Follow');
                  } else {
                    navigation.navigate('Login');
                  }
                }}>
                <View style={styles.myinfoMoreItem}>
                  <View style={styles.myinfoMoreIcon}>
                    {/* <FitImage
                      style={{width: 21, height: 19}}
                      // @ts-ignore
                      source={require('../../assets/report.png')}
                      resizeMode="contain"
                    /> */}
                  </View>
                  <View style={styles.myinfoMoreTxt}>
                    <Text style={styles.myinfoMoreTxtTitle}>我的关注</Text>
                  </View>
                  <View style={styles.myinfoMoreGo}>
                    <FitImage
                      style={{width: 15, height: 30}}
                      // @ts-ignore
                      source={require('../../assets/go.png')}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (login && login.userId) {
                    navigation.navigate('Report');
                  } else {
                    navigation.navigate('Login');
                  }
                }}>
                <View style={styles.myinfoMoreItem}>
                  <View style={styles.myinfoMoreIcon}>
                    <FitImage
                      style={{width: 21, height: 19}}
                      // @ts-ignore
                      source={require('../../assets/report.png')}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.myinfoMoreTxt}>
                    <Text style={styles.myinfoMoreTxtTitle}>举报维权</Text>
                  </View>
                  <View style={styles.myinfoMoreGo}>
                    <FitImage
                      style={{width: 15, height: 30}}
                      // @ts-ignore
                      source={require('../../assets/go.png')}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (login && login.userId) {
                    navigation.navigate('Tutorial');
                  } else {
                    navigation.navigate('Login');
                  }
                }}>
                <View style={styles.myinfoMoreItem}>
                  <View style={styles.myinfoMoreIcon}>
                    <FitImage
                      style={{width: 22, height: 15}}
                      // @ts-ignore
                      source={require('../../assets/tutorial.png')}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.myinfoMoreTxt}>
                    <Text style={styles.myinfoMoreTxtTitle}>教程协助</Text>
                  </View>
                  <View style={styles.myinfoMoreGo}>
                    <FitImage
                      style={{width: 15, height: 30}}
                      // @ts-ignore
                      source={require('../../assets/go.png')}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (login && login.userId) {
                    navigation.navigate('Opinion');
                  } else {
                    navigation.navigate('Login');
                  }
                }}>
                <View style={styles.myinfoMoreItem}>
                  <View style={styles.myinfoMoreIcon}>
                    <FitImage
                      style={{width: 22, height: 21}}
                      // @ts-ignore
                      source={require('../../assets/opinion.png')}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.myinfoMoreTxt}>
                    <Text style={styles.myinfoMoreTxtTitle}>意见反馈</Text>
                  </View>
                  <View style={styles.myinfoMoreGo}>
                    <FitImage
                      style={{width: 15, height: 30}}
                      // @ts-ignore
                      source={require('../../assets/go.png')}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (login && login.userId) {
                    navigation.navigate('Blacklist');
                  } else {
                    navigation.navigate('Login');
                  }
                }}>
                <View style={styles.myinfoMoreItem}>
                  <View style={styles.myinfoMoreIcon}>
                    <FitImage
                      style={{width: 21, height: 22}}
                      // @ts-ignore
                      source={require('../../assets/blacklist.png')}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.myinfoMoreTxt}>
                    <Text style={styles.myinfoMoreTxtTitle}>小黑屋</Text>
                  </View>
                  <View style={styles.myinfoMoreGo}>
                    <FitImage
                      style={{width: 15, height: 30}}
                      // @ts-ignore
                      source={require('../../assets/go.png')}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Setting');
                }}>
                <View style={[styles.myinfoMoreItem]}>
                  <View style={styles.myinfoMoreIcon}>
                    <FitImage
                      style={{width: 22, height: 22}}
                      // @ts-ignore
                      source={require('../../assets/setting.png')}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.myinfoMoreTxt}>
                    <Text style={styles.myinfoMoreTxtTitle}>设置</Text>
                  </View>
                  <View style={styles.myinfoMoreGo}>
                    <FitImage
                      style={{width: 15, height: 30}}
                      // @ts-ignore
                      source={require('../../assets/go.png')}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => {
                  if (login && login.userId) {
                    navigation.navigate('Invite');
                  } else {
                    navigation.navigate('Login');
                  }
                }}>
                <View style={[styles.myinfoMoreItem, {borderBottomWidth: 0}]}>
                  <View style={styles.myinfoMoreIcon}>
                    <FitImage
                      style={{width: 22, height: 22}}
                      // @ts-ignore
                      source={require('../../assets/invite.png')}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.myinfoMoreTxt}>
                    <Text style={styles.myinfoMoreTxtTitle}>我的邀请码</Text>
                  </View>
                  <View style={styles.myinfoMoreGo}>
                    <FitImage
                      style={{width: 15, height: 30}}
                      // @ts-ignore
                      source={require('../../assets/go.png')}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.opinionAddBtn}>
            <TouchableOpacity onPress={this.logout}>
              <View style={styles.opinionAddBtnView}>
                <Text style={styles.opinionBtnViewTxt}>注销</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  myInfoView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  topView: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: -80,
  },
  myInfoHead: {
    position: 'absolute',
    // backgroundColor: 'gray',
    top: 30,
    left: 15,
  },
  navView: {
    backgroundColor: '#FFFFFF',
    paddingTop: 5,
    paddingBottom: 5,
    // flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 4,
    overflow: 'hidden',
  },
  navViewMoney: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navViewLine: {
    width: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  navViewLineIn: {
    flex: 1,
    backgroundColor: '#DDDDDD',
  },
  navViewMoneyTopTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444444',
  },
  navViewMoneyMiddleTxt1: {
    fontSize: 14,
    color: '#FD2A2A',
  },
  navViewMoneyMiddleTxt2: {
    fontSize: 18,
    color: '#FD2A2A',
  },
  navViewMoneyMiddle: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'flex-end',
  },
  // navViewMoneybtn: {
  //   width: 70,
  //   height: 24,
  //   backgroundColor: '#FFDB44',
  //   borderRadius: 4,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // navViewMoneybtnTxt: {
  //   color: '#FFFFFF',
  //   fontSize: 12,
  // },
  swiperImage: {
    width: '100%',
    height: '100%',
  },
  myinfoMore: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  myinfoMoreView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    overflow: 'hidden',
  },
  myinfoMoreItem: {
    height: 48,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DDDDDD',
    flexDirection: 'row',
  },
  myinfoMoreIcon: {
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myinfoMoreGo: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myinfoMoreTxt: {
    flex: 1,
    justifyContent: 'center',
  },
  myinfoMoreTxtTitle: {
    fontSize: 16,
    color: '#444444',
  },
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
    money: state.myinfo.money,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveMoney: data => dispatch(saveMoney(data)),
    getLogin: data => dispatch(getLogin(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyInfoScreen);
// export default MyInfoScreen;
