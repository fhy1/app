import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {WToast} from 'react-native-smart-tip';
import {zfbUpMoney} from '../../api/withDraw';

class ZfbwithDrawScreen extends React.Component {
  static navigationOptions = {
    title: '支付宝提现',
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
    this.state = {type: '', dragmoney: 0, zfbName: '', zfbAccount: ''};
  }

  componentDidMount = () => {
    const type = this.props.navigation.state.params.type;
    this.setState({
      type: type,
    });
  };

  applyWidthDraw = () => {
    const {type, dragmoney, zfbName, zfbAccount} = this.state;
    const {money, login} = this.props;
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    let newMoney = parseInt(dragmoney);
    console.log(newMoney, dragmoney);
    if (!zfbName) {
      toastOpts.data = '请输入支付宝姓名';
      WToast.show(toastOpts);
    } else if (!zfbAccount) {
      toastOpts.data = '请输入支付宝账号';
      WToast.show(toastOpts);
    } else if (parseInt(dragmoney) > money[type]) {
      toastOpts.data = '您输入的提现金额大于那您的可提现资产';
      WToast.show(toastOpts);
    } else if (parseInt(dragmoney) < 1) {
      toastOpts.data = '提现金额必须大于100元';
      WToast.show(toastOpts);
    } else if (newMoney != dragmoney) {
      toastOpts.data = '提现金额必须为1的倍数';
      WToast.show(toastOpts);
    } else {
      let typeId = '';
      if (type == 'balance') {
        typeId = 2;
      } else if (type == 'bonus') {
        typeId = 4;
      } else if (type == 'repaidBalance') {
        typeId = 3;
      }
      zfbUpMoney(
        login.userId,
        typeId,
        parseInt(dragmoney),
        zfbName,
        zfbAccount,
      ).then(
        data => {
          if (data.status == 2) {
            toastOpts.data = '您已被加入黑名单，提现申请失败';
            WToast.show(toastOpts);
          } else if (data.status == 0) {
            toastOpts.data = data.msg;
            WToast.show(toastOpts);
          } else {
            toastOpts.data = '申请成功，请等待审核';
            WToast.show(toastOpts);
          }
        },
        () => {
          toastOpts.data = '申请失败';
          WToast.show(toastOpts);
        },
      );
    }
  };

  handelOnChange = e => {
    this.setState({
      dragmoney: e,
    });
  };

  handelOnChangeName = e => {
    this.setState({
      zfbName: e,
    });
  };

  handelOnChangeAccount = e => {
    this.setState({
      zfbAccount: e,
    });
  };

  render() {
    const {type, dragmoney, zfbName, zfbAccount} = this.state;
    const {money} = this.props;
    return (
      <View style={styles.withdrawView}>
        <View style={styles.withdrawTop}>
          <View style={styles.withdrawList}>
            <Text>姓名： </Text>
            <TextInput
              keyboardType="numeric"
              style={styles.withdrawListInput}
              placeholder={'请输入支付宝姓名'}
              onChangeText={this.handelOnChangeName}
              value={zfbName}
            />
          </View>
          <View style={styles.withdrawList}>
            <Text>账户： </Text>
            <TextInput
              keyboardType="numeric"
              style={styles.withdrawListInput}
              placeholder={'请输入支付宝账户'}
              onChangeText={this.handelOnChangeAccount}
              value={zfbAccount}
            />
          </View>
          <View style={styles.withdrawList}>
            <Text>提现金额：</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.withdrawListInput}
              placeholder={
                '最多可提现' + money[type] + '元,每次体现必须大于100元'
              }
              onChangeText={this.handelOnChange}
              value={dragmoney}
            />
          </View>
        </View>
        <View style={styles.opinionAddBtn}>
          <TouchableOpacity onPress={this.applyWidthDraw}>
            <View style={styles.opinionAddBtnView}>
              <Text style={styles.opinionBtnViewTxt}>申请提现</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#FFFFFF',
    paddingLeft: 15,
  },

  withdrawList: {
    flexDirection: 'row',
    height: 46,
    alignItems: 'center',
  },
  withdrawListInput: {
    flex: 1,
    color: '#666666',
    paddingLeft: 12,
    fontSize: 12,
    height: 46,
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
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ZfbwithDrawScreen);
