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
import {connect} from 'react-redux';
import {WToast} from 'react-native-smart-tip';
import {getWxPay} from '../../api/pay';
import * as WeChat from 'react-native-wechat';

class MemberScreen extends React.Component {
  static navigationOptions = {
    title: '会员中心',
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
      rules: [
        {
          title: '发布任务数量(个)',
          common: 3,
          week: 5,
          month: 8,
          quarter: '不限',
          year: '不限',
        },
        {
          title: '发布服务费(%)',
          common: 15,
          week: 15,
          month: 15,
          quarter: 12,
          year: 12,
        },
        {
          title: '任务提现手续费(%)',
          common: 2,
          week: 2,
          month: 0,
          quarter: 0,
          year: 0,
        },
        {
          title: '充值提现手续费(%)',
          common: 6,
          week: 6,
          month: 3,
          quarter: 3,
          year: 2,
        },
        {
          title: '刷新任务(次)',
          common: 0,
          week: 1,
          month: 5,
          quarter: 18,
          year: 88,
          before: true,
        },
      ],
    };
  }

  componentDidMount = () => {};

  memberPross = (sendMoney, index) => {
    const {login} = this.props;
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    getWxPay(login.userId, sendMoney, 1, index).then(data => {
      let money = data.data;
      WeChat.isWXAppInstalled().then(isInstalled => {
        if (isInstalled) {
          WeChat.pay({
            partnerId: money.partnerid, // 商家向财付通申请的商家id
            prepayId: money.prepayid, // 预支付订单
            nonceStr: money.noncestr, // 随机串，防重发
            timeStamp: JSON.stringify(money.timestamp), // 时间戳，防重发.
            package: money.package, // 商家根据财付通文档填写的数据和签名
            sign: money.sign, // 商家根据微信开放平台文档对数据做的签名
          })
            .then(requestJson => {
              //支付成功回调
              if (requestJson.errCode == '0') {
                //回调成功处理
                toastOpts.data = '支付成功';
                WToast.show(toastOpts);
              }
            })
            .catch(err => {
              toastOpts.data = '支付失败';
              WToast.show(toastOpts);
            });
        } else {
          toastOpts.data = '请先安装微信';
          WToast.show(toastOpts);
        }
      });
    });
  };

  render() {
    const {rules} = this.state;
    return (
      <View style={styles.memberView}>
        <ScrollView>
          <View style={styles.memberTop}>
            <View style={styles.memberNav}>
              <Text style={styles.memberNavTitle}>
                升级为会员，享受会员特权
              </Text>
              <View style={styles.memberNavList}>
                <Text style={styles.memberNavListTxt}>周费: 18.0</Text>
                <TouchableOpacity
                  style={styles.memberNavBtn}
                  onPress={this.memberPross.bind(this, 18, 1)}>
                  <View>
                    <Text style={styles.memberNavBtnTxt}>立即开通</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.memberNavList}>
                <Text style={styles.memberNavListTxt}>月费: 58.0</Text>
                <TouchableOpacity
                  style={styles.memberNavBtn}
                  onPress={this.memberPross.bind(this, 58, 2)}>
                  <View>
                    <Text style={styles.memberNavBtnTxt}>立即开通</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.memberNavList}>
                <Text style={styles.memberNavListTxt}>季费: 128.0</Text>
                <TouchableOpacity
                  style={styles.memberNavBtn}
                  onPress={this.memberPross.bind(this, 128, 3)}>
                  <View>
                    <Text style={styles.memberNavBtnTxt}>立即开通</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.memberNavList}>
                <Text style={styles.memberNavListTxt}>年费: 488.0 </Text>
                <TouchableOpacity
                  style={styles.memberNavBtn}
                  onPress={this.memberPross.bind(this, 488, 4)}>
                  <View>
                    <Text style={styles.memberNavBtnTxt}>立即开通</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.memberBodyTitle}>
            <Text style={styles.memberBodyTitletxt}>
              成为会员，享受会员权益
            </Text>
            {/* <View style={styles.memberTab}>
              <View style={styles.memberTabView}>非会员</View>
              <View style={styles.memberTabView}>周会员</View>
              <View style={styles.memberTabView}>月会员</View>
              <View style={styles.memberTabView}>季会员</View>
              <View style={styles.memberTabView}>年会员</View>
            </View> */}
          </View>
          <View style={styles.memberBodyTableView}>
            <View style={styles.memberTableTr}>
              <View style={styles.memberTrOne}>
                <Text style={styles.memberTrTxt}>名称</Text>
              </View>
              <View style={styles.memberTr}>
                <Text style={styles.memberTrTxt}>非会员</Text>
              </View>
              <View style={styles.memberTr}>
                <Text style={styles.memberTrTxt}>周</Text>
              </View>
              <View style={styles.memberTr}>
                <Text style={styles.memberTrTxt}>月</Text>
              </View>
              <View style={styles.memberTr}>
                <Text style={styles.memberTrTxt}>季</Text>
              </View>
              <View style={styles.memberTr}>
                <Text style={styles.memberTrTxt}>年</Text>
              </View>
            </View>
            {rules.map((item, index) => {
              return (
                <View style={styles.memberTableTd} key={index}>
                  <View style={styles.memberTdOne}>
                    <Text style={styles.memberTdTxt}>{item.title}</Text>
                  </View>
                  <View style={styles.memberTd}>
                    <Text style={styles.memberTdTxt}>{item.common}</Text>
                  </View>
                  <View style={styles.memberTd}>
                    <Text style={styles.memberTdTxt}>{item.week}</Text>
                  </View>
                  <View style={styles.memberTd}>
                    <Text style={styles.memberTdTxt}>{item.month}</Text>
                  </View>
                  <View style={styles.memberTd}>
                    <Text style={styles.memberTdTxt}>{item.quarter}</Text>
                  </View>
                  <View style={styles.memberTd}>
                    <Text style={styles.memberTdTxt}>{item.year}</Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={styles.memberBodyShow}>
            <Text style={styles.memberBodyShowtxt}>
              说明：会员开通过后不做退费处理，请认真阅读后开通
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  memberView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  memberTop: {
    height: 250,
    backgroundColor: '#FFDB44',
    justifyContent: 'flex-end',
    paddingLeft: 20,
    paddingRight: 20,
    overflow: 'hidden',
  },
  memberNav: {
    backgroundColor: '#7E6C1F',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: -20,
    borderRadius: 10,
  },
  memberNavTitle: {
    fontSize: 20,
    color: '#EFDFAE',
  },
  memberNavList: {
    height: 40,
    justifyContent: 'center',
  },
  memberNavListTxt: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  memberNavBtn: {
    position: 'absolute',
    right: 0,
    backgroundColor: '#EFDFAE',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15,
  },
  memberNavBtnTxt: {
    color: '#444444',
  },
  memberBodyTitle: {
    height: 50,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  memberBodyTitletxt: {
    fontSize: 18,
    color: '#444444',
    fontWeight: 'normal',
  },

  memberBodyShow: {
    height: 50,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  memberBodyShowtxt: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'normal',
  },

  memberBodyTableView: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  memberTableTr: {
    height: 40,
    backgroundColor: '#FAE895',
    flexDirection: 'row',
  },
  memberTrOne: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberTr: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberTrTxt: {
    fontWeight: 'normal',
    fontSize: 12,
    color: '#444444',
  },
  memberTableTd: {
    height: 60,
    backgroundColor: '#FCF0BC',
    flexDirection: 'row',
  },
  memberTd: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberTdOne: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberTdTxt: {
    fontWeight: 'normal',
    fontSize: 12,
    color: '#444444',
  },

  memberTab: {
    flexDirection: 'row',
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

export default connect(mapStateToProps, mapDispatchToProps)(MemberScreen);
