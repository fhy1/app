import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {getWxPay} from '../../api/pay';
import * as WeChat from 'react-native-wechat';
import {WToast} from 'react-native-smart-tip';

class RechargeScreen extends React.Component {
  static navigationOptions = {
    title: '账户资产',
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
      modalVisible: false,
      sendMoney: '',
    };
  }

  componentDidMount = () => {};

  moneyIn = () => {
    this.setState({
      modalVisible: true,
      sendMoney: '',
    });
  };

  CloseModel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  handelOnChange = e => {
    this.setState({
      sendMoney: e,
    });
  };

  addSubmit = () => {
    const {login} = this.props;
    const {sendMoney} = this.state;
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    getWxPay(login.userId, sendMoney, 2, '').then(data => {
      let money = data.data;
      WeChat.isWXAppInstalled().then(isInstalled => {
        if (isInstalled) {
          WeChat.pay({
            partnerId: money.partnerid, // 商家向财付通申请的商家id
            prepayId: money.prepayid, // 预支付订单
            nonceStr: money.noncestr, // 随机串，防重发
            timeStamp: money.timestamp, // 时间戳，防重发.
            package: money.package, // 商家根据财付通文档填写的数据和签名
            sign: money.sign, // 商家根据微信开放平台文档对数据做的签名
          })
            .then(requestJson => {
              //支付成功回调
              if (requestJson.errCode == '0') {
                //回调成功处理
                toastOpts.data = '支付成功';
                WToast.show(toastOpts);
                this.setState({
                  modalVisible: false,
                });
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
    const {money, navigation} = this.props;
    const {modalVisible, sendMoney} = this.state;
    const {width} = Dimensions.get('window');
    return (
      <View style={styles.rechargeView}>
        <ScrollView>
          <View style={styles.rechargeTop}>
            <View style={styles.rechargeCircle}>
              <View style={styles.rechargeCircleIn}>
                <Text style={styles.rechargeCircleInTxt}>
                  {money.balance + money.bonus + money.repaidBalance}
                </Text>
                <Text style={styles.rechargeCircleInTxt}>元</Text>
              </View>
            </View>
          </View>
          <View style={styles.rechargeNav}>
            <TouchableOpacity style={{flex: 1}} onPress={this.moneyIn}>
              <View style={styles.rechargeNavBtn}>
                <Text style={styles.rechargeNavBtnTxt}>在线充值</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.rechargeNavLine}></View>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                navigation.navigate('PayDetail');
              }}>
              <View style={styles.rechargeNavBtn}>
                <Text style={styles.rechargeNavBtnTxt}>收支明细</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rechargeListTitle}>
            <Text style={styles.rechargeListTitleTxt}>资产列表: </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Withdraw', {
                type: 'balance',
              });
            }}>
            <View style={styles.rechargeList}>
              <Text style={styles.rechargeListTxt}>
                我的赏金: {money.balance} 元
              </Text>
              <Text style={styles.rechargeListTxt2}>
                完成任务获得的奖励，可提现，有手续费!
              </Text>
              <View style={styles.rechargeGo}>
                <Text style={styles.rechargeGoTxt}>去提现</Text>
                <Image
                  style={{width: 12, height: 24}}
                  // @ts-ignore
                  source={require('../../assets/go.png')}
                  resizeMode="contain"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Withdraw', {
                type: 'bonus',
              });
            }}>
            <View style={styles.rechargeList}>
              <Text style={styles.rechargeListTxt}>
                我的奖励: {money.bonus} 元
              </Text>
              <Text style={styles.rechargeListTxt2}>
                签到邀请获得的奖励，可提现，有手续费!
              </Text>
              <View style={styles.rechargeGo}>
                <Text style={styles.rechargeGoTxt}>去提现</Text>
                <Image
                  style={{width: 12, height: 24}}
                  // @ts-ignore
                  source={require('../../assets/go.png')}
                  resizeMode="contain"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Withdraw', {
                type: 'repaidBalance',
              });
            }}>
            <View style={styles.rechargeList}>
              <Text style={styles.rechargeListTxt}>
                我的余额: {money.repaidBalance} 元
              </Text>
              <Text style={styles.rechargeListTxt2}>
                发布任务等站内消费，可提现，有手续费!
              </Text>
              <View style={styles.rechargeGo}>
                <Text style={styles.rechargeGoTxt}>去提现</Text>
                <Image
                  style={{width: 12, height: 24}}
                  // @ts-ignore
                  source={require('../../assets/go.png')}
                  resizeMode="contain"
                />
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={this.CloseModel}>
          <View style={styles.taskModal}>
            <View style={[styles.opinionModalView, {width: width * 0.8}]}>
              <View style={styles.opinionTopTitle}>
                <Text style={styles.opinionTopTitleTxt}>账户充值</Text>
              </View>
              <Text style={styles.opinionTitle}>目前仅支持微信充值</Text>
              <TextInput
                style={styles.opinionInp}
                multiline={true}
                placeholder="请输入充值金额"
                maxLength={60}
                value={sendMoney}
                onChangeText={this.handelOnChange}
              />
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
                    <Text style={styles.opinionTxt}>充值</Text>
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
  rechargeView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  rechargeTop: {
    height: 180,
    backgroundColor: '#FFDB44',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rechargeCircle: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: '#FFF7CE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rechargeCircleIn: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#FCE37C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rechargeCircleInTxt: {
    color: '#444444',
    fontSize: 16,
  },
  rechargeNav: {
    height: 50,
    backgroundColor: '#FACE17',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  rechargeNavBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rechargeNavLine: {
    width: 1,
    backgroundColor: '#FFFFFF',
  },
  rechargeNavBtnTxt: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  rechargeListTitle: {
    height: 60,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  rechargeListTitleTxt: {
    fontSize: 16,
    color: '#444444',
  },
  rechargeList: {
    backgroundColor: '#FFFFFF',
    height: 70,
    justifyContent: 'center',
    paddingLeft: 15,
    marginBottom: 2,
  },
  rechargeListTxt: {
    fontSize: 14,
    color: '#666666',
  },
  rechargeListTxt2: {
    fontSize: 12,
    color: '#666666',
    marginTop: 5,
  },
  rechargeGo: {
    position: 'absolute',
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rechargeGoTxt: {
    color: '#666666',
    fontSize: 14,
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
    height: 40,
    backgroundColor: '#F3F3F3',
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
    money: state.myinfo.money,
    login: state.login.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(RechargeScreen);
