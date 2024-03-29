import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FitImage from 'react-native-fit-image';
import {connect} from 'react-redux';
// import { fetchExtendInvite, fetchExtendUser } from '../../actions/extend';
import {fetchExtendInvite, fetchExtendUser} from '../../api/extend';
import QRCode from 'react-native-qrcode-svg';
import * as WeChat from 'react-native-wechat';
import {WToast} from 'react-native-smart-tip';
// import * as QQAPI from 'react-native-qq';
import ShareUtile from '../../utils/ShareUtil';

class ExtendScreen extends React.Component {
  static navigationOptions = {
    title: '推广有礼',
    headerStyle: {
      backgroundColor: '#f75139',
      borderBottomWidth: 0,
      shadowOpacity: 0,
    },
    headerTintColor: '#FFFFFF',
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
      invite: [],
      user: {},
      // myuri: 'http://lxiaomifeng.cn',
      myuri: 'http://212.64.70.14',
    };
  }

  componentDidMount = async () => {
    let {login, navigation} = this.props;
    console.log(login);
    if (login && login.userId) {
      console.log(1);
      const [invite, user] = await Promise.all([
        fetchExtendInvite(),
        fetchExtendUser(login.userId),
      ]);
      this.setState({
        invite: invite.data ? invite.data : [],
        user: user.data ? user.data : {},
      });
    } else {
      const invite = await fetchExtendInvite();
      this.setState({
        invite: invite.data ? invite.data : [],
      });
    }
    // this.props.fetchExtendInvite();
    // this.props.fetchExtendUser(login.userId);
  };

  OnShareWxFriend = () => {
    const {login, navigation} = this.props;
    const {myuri} = this.state;
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    if (login && login.uid) {
      WeChat.isWXAppInstalled().then(isInstalled => {
        if (isInstalled) {
          WeChat.shareToSession({
            title: '小蜜罐',
            description:
              '躺在家里就能赚钱了，真实，靠谱，高效的手机赚钱平台，抓紧加入吧',
            thumbImage:
              myuri +
              ':9099/resource/2019-12-12/png/1576135998492_%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20191212153250.png',
            type: 'news',
            webpageUrl:
              myuri +
              '/web/resign/main.html?nickName=' +
              encodeURI(login.nickname) +
              '&headImg=' +
              login.headimgurl +
              '&upUID=' +
              login.uid,
            // type: 'text',
            // description: '大家一起赚钱拉',
          }).catch(error => {
            // ToastShort(error.message);
            toastOpts.data = error.message;
            WToast.show(toastOpts);
          });
        } else {
          toastOpts.data = '没有安装微信软件，请您安装微信之后再试';
          WToast.show(toastOpts);
          // ToastShort('没有安装微信软件，请您安装微信之后再试');
        }
      });
    } else {
      navigation.navigate('Login');
    }
  };

  OnShareWxFriends = () => {
    const {login, navigation} = this.props;
    const {myuri} = this.state;
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    if (login && login.uid) {
      WeChat.isWXAppInstalled().then(isInstalled => {
        if (isInstalled) {
          WeChat.shareToTimeline({
            title: '小蜜罐',
            description:
              '躺在家里就能赚钱了，真实，靠谱，高效的手机赚钱平台，抓紧加入吧',
            thumbImage:
              myuri +
              ':9099/resource/2019-12-12/png/1576135998492_%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20191212153250.png',
            type: 'news',
            webpageUrl:
              myuri +
              '/web/resign/main.html?nickName=' +
              encodeURI(login.nickname) +
              '&headImg=' +
              login.headimgurl +
              '&upUID=' +
              login.uid,
            // type: 'text',
            // description: '大家一起赚钱拉',
          }).catch(error => {
            toastOpts.data = error.message;
            WToast.show(toastOpts);
          });
        } else {
          toastOpts.data = '没有安装微信软件，请您安装微信之后再试';
          WToast.show(toastOpts);
        }
      });
    } else {
      navigation.navigate('Login');
    }
  };

  OnShareQqFriend = () => {
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    const {login, navigation} = this.props;
    const {myuri} = this.state;
    if (login && login.uid) {
      let qqshareInfo = {
        type: 'news',
        imageUrl:
          myuri +
          ':9099/resource/2019-12-12/png/1576135998492_%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20191212153250.png',
        title: '小蜜罐',
        description:
          '躺在家里就能赚钱了，真实，靠谱，高效的手机赚钱平台，抓紧加入吧',
        webpageUrl:
          myuri +
          '/web/resign/main.html?nickName=' +
          encodeURI(login.nickname) +
          '&headImg=' +
          login.headimgurl +
          '&upUID=' +
          login.uid,
      };
      ShareUtile.share(
        '躺在家里就能赚钱了，真实，靠谱，高效的手机赚钱平台，抓紧加入吧',
        qqshareInfo.imageUrl,
        qqshareInfo.webpageUrl,
        qqshareInfo.title,
        0,
        code => {
          console.log(('code', code));
          if (code == 0) {
            toastOpts.data = '分享成功';
            WToast.show(toastOpts);
          } else {
            toastOpts.data = '分享失败';
            WToast.show(toastOpts);
          }
        },
      );
    } else {
      navigation.navigate('Login');
    }
    // QQAPI.isQQInstalled().then(
    //   install => {
    //     QQAPI.shareToQQ(qqshareInfo)
    //       .then(res => {})
    //       .catch(err => {
    //         console.log('分享失败');
    //       });
    //   },
    //   err => {
    //     toastOpts.data = '没有安装qq，请您安装qq之后再试';
    //     WToast.show(toastOpts);
    //   },
    // );
  };

  OnShareQqFriends = () => {
    const {login, navigation} = this.props;
    const {myuri} = this.state;
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    if (login && login.uid) {
      let qqshareInfo = {
        type: 'news',
        imageUrl:
          myuri +
          ':9099/resource/2019-12-12/png/1576135998492_%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20191212153250.png',
        title: '小蜜罐',
        description:
          '躺在家里就能赚钱了，真实，靠谱，高效的手机赚钱平台，抓紧加入吧',
        webpageUrl:
          myuri +
          '/web/resign/main.html?nickName=' +
          encodeURI(login.nickname) +
          '&headImg=' +
          login.headimgurl +
          '&upUID=' +
          login.uid,
      };
      ShareUtile.share(
        qqshareInfo.description,
        qqshareInfo.imageUrl,
        qqshareInfo.webpageUrl,
        qqshareInfo.title,
        4,
        code => {
          console.log(('code', code));
          if (code == 0) {
            toastOpts.data = '分享成功';
            WToast.show(toastOpts);
          } else {
            toastOpts.data = '分享失败';
            WToast.show(toastOpts);
          }
        },
      );
    } else {
      navigation.navigate('Login');
    }
    // let qqshareInfo = {
    //   type: 'news',
    //   imageUrl: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
    //   title: '小蜜罐',
    //   description: '大家一起赚钱拉',
    //   webpageUrl: 'http://www.lcode.org',
    // };
    // // QQAPI.isQQInstalledAction().then(res => {
    // QQAPI.shareToQzone(qqshareInfo)
    //   .then(res => {})
    //   .catch(err => {
    //     console.log('分享失败');
    //   });
    // // });
  };

  GotoMyinvite = () => {
    const {login, navigation} = this.props;
    if (login && login.uid) {
      navigation.navigate('MyInvite');
    } else {
      navigation.navigate('Login');
    }
  };

  ClickShowPerson = () => {
    const {login, navigation} = this.props;
    const {myuri} = this.state;
    if (login && login.uid) {
      navigation.navigate('PerExtend');
    } else {
      navigation.navigate('Login');
    }
  };

  render() {
    const {login} = this.props;
    const {invite, user, myuri} = this.state;
    const {width} = Dimensions.get('window');
    const newwidth = (width - width * 0.9) / 2;
    const navImageHeight = (width / 748) * 433;
    let dashView = [];
    for (let i = 0; i < 70; i++) {
      dashView.push(<View key={i} style={styles.extendDashed} />);
    }
    return (
      <View style={styles.extendView}>
        <ScrollView>
          <View style={[styles.extendTop, {paddingLeft: newwidth}]}>
            <FitImage
              // @ts-ignore
              source={require('../../assets/friend.png')}
              style={{width: width * 0.9, height: 10}}
              resizeMode="contain"
            />
          </View>
          <View style={{width: width, height: navImageHeight, marginTop: -10}}>
            <FitImage
              // @ts-ignore
              source={require('../../assets/person.png')}
              originalWidth={width}
              originalHeight={navImageHeight}
              resizeMode="contain"
            />
            <View
              style={[
                styles.extendEwm,
                {width: width, height: navImageHeight},
              ]}>
              <View
                style={{
                  width: (width / 375) * 110,
                  height: (width / 375) * 110,
                  backgroundColor: '#FFFFFF',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {login && login.uid ? (
                  <QRCode
                    value={
                      myuri +
                      '/web/resign/main.html?nickName=' +
                      encodeURI(login.nickname) +
                      '&headImg=' +
                      login.headimgurl +
                      '&upUID=' +
                      login.uid
                    }
                    logoBorderRadius={1}
                    color={'#191919'}
                    backgroundColor={'#ffffff'}
                    logoSize={30}
                    size={(width / 375) * 110 - 10}
                  />
                ) : null}
              </View>
            </View>
          </View>
          <View
            style={[
              styles.extendShare,
              {marginTop: -(navImageHeight - (width / 375) * 110) / 2 + 15},
            ]}>
            <View style={styles.extendShareView}>
              <Image
                style={styles.extendShareHb}
                // @ts-ignore
                source={require('../../assets/hb.png')}
              />
              <View style={styles.extendShareTitle}>
                <Text style={styles.extendShareText}>分享好友，一起赚钱</Text>
              </View>
              <View style={styles.extendDashedLine}>{dashView}</View>
              <View style={styles.extendShareBody}>
                <TouchableOpacity onPress={this.OnShareWxFriends}>
                  <View style={styles.extendShareBodyView}>
                    <View style={styles.extendShareBodyImg}>
                      <FitImage
                        style={styles.extendShareBodyIcon}
                        // @ts-ignore
                        source={require('../../assets/pyq.png')}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={styles.extendShareBodyText}>朋友圈</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.OnShareWxFriend}>
                  <View style={styles.extendShareBodyView}>
                    <View style={styles.extendShareBodyImg}>
                      <FitImage
                        style={styles.extendShareBodyIcon}
                        // @ts-ignore
                        source={require('../../assets/wx.png')}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={styles.extendShareBodyText}>微信好友</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.OnShareQqFriends}>
                  <View style={styles.extendShareBodyView}>
                    <View style={styles.extendShareBodyImg}>
                      <FitImage
                        style={styles.extendShareBodyIcon}
                        // @ts-ignore
                        source={require('../../assets/kj.png')}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={styles.extendShareBodyText}>qq空间</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.OnShareQqFriend}>
                  <View style={styles.extendShareBodyView}>
                    <View style={styles.extendShareBodyImg}>
                      <FitImage
                        style={styles.extendShareBodyIcon}
                        // @ts-ignore
                        source={require('../../assets/qq.png')}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={styles.extendShareBodyText}>qq好友</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.extendBtnView}>
              <TouchableOpacity onPress={this.ClickShowPerson}>
                <View style={styles.extendBtn}>
                  <Text style={styles.extendBtnTxt}>点击生成个人专属海报</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.extendShareView}>
              <View style={styles.extendShareTitle}>
                <Text style={styles.extendShareText}>我的邀请</Text>
              </View>
              <View style={styles.extendDashedLine}>{dashView}</View>
              <View style={[styles.extendShareBody, {height: 72}]}>
                <View style={styles.extendShareBodyView}>
                  <Text
                    style={{
                      color: '#444444',
                      fontWeight: 'bold',
                      fontSize: 14,
                      marginBottom: 6,
                    }}>
                    邀请好友
                  </Text>
                  <TouchableOpacity onPress={this.GotoMyinvite}>
                    <Text
                      style={{
                        color: '#F75139',
                        fontWeight: 'bold',
                        fontSize: 18,
                        textDecorationLine: 'underline',
                      }}>
                      {user.totalNum || 0} 人
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.extendShareBodyView}>
                  <Text
                    style={{
                      color: '#444444',
                      fontWeight: 'bold',
                      fontSize: 14,
                      marginBottom: 6,
                    }}>
                    获得奖励
                  </Text>
                  <Text
                    style={{
                      color: '#F75139',
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    {user.totalMoney || 0} 元
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.extendShareView, {marginTop: 20}]}>
              <View style={styles.extendShareTitle}>
                <Text style={styles.extendShareText}>本月推广排行榜</Text>
              </View>
              <View style={styles.extendDashedLine}>{dashView}</View>
              <View style={styles.extendRankListTitle}>
                <View style={styles.extendRank}>
                  {/* <Image
                    style={styles.extendRank}
                    source={require('../../assets/one.png')}
                  /> */}
                </View>
                <View style={styles.extendRankWidth}>
                  <Text style={styles.extendRankTitleTxt}>用户</Text>
                </View>
                <View style={styles.extendRankWidth}>
                  <Text style={styles.extendRankTitleTxt}>推广人数</Text>
                </View>
                <View style={styles.extendRankWidth}>
                  <Text style={styles.extendRankTitleTxt}>获得奖励</Text>
                </View>
              </View>
              {invite.map((item, index) => {
                let itemImg = '';
                if (index == 0) {
                  itemImg = (
                    <Image
                      style={styles.extendRank}
                      source={require('../../assets/one.png')}
                    />
                  );
                } else if (index == 1) {
                  itemImg = (
                    <Image
                      style={styles.extendRank}
                      source={require('../../assets/two.png')}
                    />
                  );
                } else if (index == 2) {
                  itemImg = (
                    <Image
                      style={styles.extendRank}
                      source={require('../../assets/three.png')}
                    />
                  );
                } else {
                  itemImg = index++;
                }

                return (
                  <View style={styles.extendRankList} key={index}>
                    <View style={styles.extendRank}>{itemImg}</View>
                    <View style={styles.extendRankWidth}>
                      <Text style={styles.extendRankTxt}>
                        {item.nickname
                          ? item.nickname
                          : item.phone
                          ? `${item.phone.substring(
                              0,
                              3,
                            )}****${item.phone.substring(
                              item.phone.length - 4,
                            )}`
                          : '-'}
                      </Text>
                    </View>
                    <View style={styles.extendRankWidth}>
                      <Text style={styles.extendRankTxt}>{item.totalNum}</Text>
                    </View>
                    <View style={styles.extendRankWidth}>
                      <Text style={styles.extendRankTxt}>
                        {item.totalMoney}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  extendView: {
    flex: 1,
    backgroundColor: '#f75139',
  },
  extendTop: {
    height: 150,
    // backgroundColor: '#FFFFFF',
  },
  extendTopImg: {
    width: 420,
    height: 10,
  },
  extendEwm: {
    position: 'absolute',
    left: 0,
    top: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  extendViewRwmView: {
    width: 110,
    height: 110,
    backgroundColor: '#FFFFFF',
  },
  extendShare: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
  extendShareView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingLeft: 15,
    paddingRight: 15,
  },
  extendShareHb: {
    width: 39.5,
    height: 39.5,
    position: 'absolute',
    left: 0,
    top: 0,
    marginLeft: -15,
    marginTop: -20,
  },
  extendShareTitle: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  extendShareText: {
    color: '#F23718',
    fontSize: 16,
    fontWeight: 'bold',
  },
  extendDashedLine: {
    height: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  extendDashed: {
    height: 1,
    width: 3,
    backgroundColor: '#F23718',
  },
  extendShareBody: {
    height: 104,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  extendShareBodyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extendShareBodyText: {
    fontSize: 14,
    color: '#666666',
  },
  extendShareBodyImg: {
    width: 58.5,
    height: 58.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderColor: '#ff583f',
    borderWidth: 1,
    backgroundColor: '#dddddd',
    marginBottom: 3,
  },
  extendShareBodyIcon: {
    width: 40,
    height: 40,
  },
  extendBtnView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 23,
  },
  extendBtn: {
    marginTop: 15,
    width: 275,
    height: 38.5,
    backgroundColor: '#fefeb8',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extendBtnTxt: {
    color: '#D41E00',
    fontSize: 16,
    fontWeight: 'bold',
  },
  extendRankListTitle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  extendRank: {
    width: 40,
    height: 44,
  },
  extendRankWidth: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extendRankTitleTxt: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'bold',
  },
  extendRankList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  extendRankTxt: {
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
  return {
    // fetchExtendInvite: () => dispatch(fetchExtendInvite()),
    // fetchExtendUser: userId => dispatch(fetchExtendUser(userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExtendScreen);
