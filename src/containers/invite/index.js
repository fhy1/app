import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import {fetchInviteRule} from '../../api/invite';

class InviteScreen extends React.Component {
  static navigationOptions = {
    title: '我的邀请码',
    headerStyle: {
      backgroundColor: '#FFDB44',
      borderBottomWidth: 0,
      shadowOpacity: 0,
    },
    headerTintColor: '#444444',
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
      inviteRule: [],
    };
  }

  componentDidMount = async () => {
    const inviteRule = await fetchInviteRule();
    this.setState({
      inviteRule: inviteRule.data,
    });
  };

  render() {
    const {login} = this.props;
    const {inviteRule} = this.state;
    let dashView = [];
    for (let i = 0; i < 70; i++) {
      dashView.push(<View key={i} style={styles.inviteDashed} />);
    }
    return (
      <View style={styles.inviteView}>
        <View style={styles.inviteViewBox}>
          <View style={styles.inviteTopBox}>
            <Text style={styles.inviteTitle}>您的邀请码</Text>
            <Text style={styles.inviteTitleUid}>{login.uid}</Text>
          </View>
          <View style={styles.inviteDashedLine}>{dashView}</View>
          <View style={styles.inviteBottomBox}>
            <View
              style={{
                marginLeft: 72,
                marginTop: 20,
                marginBottom: 20,
              }}>
              <QRCode
                value={login.uid}
                logoBorderRadius={1}
                color={'#191919'}
                backgroundColor={'#ffffff'}
                logoSize={30}
                size={120}
              />
            </View>
            <View>
              <Text style={styles.inviteEwm}>奖励规则: </Text>
              {inviteRule.map(item => {
                return (
                  <Text key={item.sort} style={styles.inviteEwmTxt}>
                    {item.sort} {item.introduce}
                  </Text>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inviteView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    paddingTop: 16,
  },
  inviteViewBox: {
    width: 300,
  },
  inviteTopBox: {
    height: 85,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteTitle: {
    fontSize: 16,
    color: '#444444',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inviteTitleUid: {
    color: '#FD2A2A',
    fontSize: 22,
    fontWeight: 'bold',
  },
  inviteBottomBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 20,
  },
  inviteDashedLine: {
    height: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 8,
    paddingRight: 8,
  },
  inviteDashed: {
    height: 1,
    width: 3,
    backgroundColor: '#e2e2e2',
  },
  inviteEwm: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'bold',
  },
  inviteEwmTxt: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'normal',
    marginTop: 4,
    lineHeight: 22,
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

export default connect(mapStateToProps, mapDispatchToProps)(InviteScreen);
