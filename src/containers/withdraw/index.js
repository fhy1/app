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
import {HeaderBackButton} from 'react-navigation-stack';
import FitImage from 'react-native-fit-image';
import {fetchRule} from '../../api/rule';
import {WToast} from 'react-native-smart-tip';

class WithdrawScreen extends React.Component {
  static navigationOptions = {
    title: '提现',
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
    this.state = {type: '', ruleList: []};
  }

  componentDidMount = () => {
    const type = this.props.navigation.state.params.type;
    this.setState({
      type: type,
    });
    fetchRule(8).then(rule => {
      this.setState({
        ruleList: rule.data,
      });
    });
  };

  withdrawWx = () => {
    const {navigation} = this.props;
    const {type} = this.state;
    navigation.navigate('WxwithDraw', {
      type: type,
    });
  };

  withdrawZfb = () => {
    const {navigation} = this.props;
    const {type} = this.state;
    navigation.navigate('ZfbwithDraw', {
      type: type,
    });
  };

  render() {
    const {type, ruleList} = this.state;
    const {money} = this.props;
    return (
      <View style={styles.withdrawView}>
        <ScrollView>
          <View style={styles.withdrawTop}>
            <Image
              style={styles.hbb}
              source={require('../../assets/hbb.png')}
            />
            <Text style={styles.withdrawMoney}>￥ {money[type]}</Text>
            <Text style={styles.withdrawMoneyTxt}>（可提现金额）</Text>
          </View>
          <View style={styles.withdrawBody}>
            <View style={styles.withdrawList}>
              <Text style={styles.withdrawListTiTle}>提现至： </Text>
            </View>
            <View style={styles.withdrawLine}></View>
            <TouchableOpacity onPress={this.withdrawZfb}>
              <View style={styles.withdrawList}>
                <Image
                  style={styles.withdrawLogo}
                  source={require('../../assets/zfb.png')}
                />
                <Text style={styles.withdrawLogoTxt}>支付宝</Text>
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
            <View style={styles.withdrawLine}></View>
            <TouchableOpacity onPress={this.withdrawWx}>
              <View style={styles.withdrawList}>
                <Image
                  style={styles.withdrawLogo}
                  source={require('../../assets/wx.png')}
                />
                <Text style={styles.withdrawLogoTxt}>微信</Text>
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
          <View style={styles.ruleView}>
            {ruleList.map(item => {
              return item.sort > 1 ? (
                <Text key={item.sort} style={styles.inviteEwmTxt}>
                  {item.sort - 1}: {item.introduce}
                </Text>
              ) : (
                <Text key={item.sort} style={styles.inviteEwm}>
                  {item.introduce}
                </Text>
              );
              // return {item.sort > 1
              //       ?
              //       <Text key={item.sort} style={styles.inviteEwmTxt}>`${item.sort - 1} ${item.introduce}`
              //   </Text>
              //       : item.introduce}
              // );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  withdrawView: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  withdrawTop: {
    paddingTop: 18,
    paddingBottom: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  hbb: {
    width: 44,
    height: 36,
    marginBottom: 11,
  },
  withdrawMoney: {
    fontSize: 18,
    color: '#FD3F3F',
    paddingRight: 3,
    marginBottom: 7,
  },
  withdrawMoneyTxt: {
    fontSize: 12,
    color: '#666666',
  },
  withdrawBody: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
  },
  withdrawLine: {
    height: 1,
    backgroundColor: '#DDDDDD',
  },
  withdrawList: {
    height: 46,
    alignItems: 'center',
    flexDirection: 'row',
  },
  withdrawListTiTle: {
    color: '#444444',
    fontSize: 14,
  },
  withdrawLogo: {
    width: 23,
    height: 23,
  },
  withdrawLogoTxt: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 10,
  },
  myinfoMoreGo: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -15,
  },

  ruleView: {
    marginTop: 15,
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  inviteEwmTxt: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'normal',
    marginTop: 4,
    lineHeight: 22,
    paddingTop: 10,
  },
  inviteEwm: {
    fontSize: 16,
    color: '#444444',
    fontWeight: 'bold',
  },
});

function mapStateToProps(state) {
  return {
    money: state.myinfo.money,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawScreen);
