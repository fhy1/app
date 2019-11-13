import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import FitImage from 'react-native-fit-image';

class ExtendScreen extends React.Component {
  static navigationOptions = {
    title: '推广有礼',
    headerStyle: {
      backgroundColor: '#f75139',
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

  render() {
    const { navigation } = this.props;
    const { width } = Dimensions.get('window');
    const newwidth = (width - 420) / 2;
    const navImageHeight = (width / 748) * 433;
    let dashView = [];
    for (let i = 0; i < 70; i++) {
      dashView.push(<View key={i} style={styles.extendDashed}></View>)
    }

    return (
      <View style={styles.extendView}>
        <ScrollView>
          <View style={[styles.extendTop, { paddingLeft: newwidth }]}>
            <FitImage
              // @ts-ignore
              source={require('../../assets/friend.png')}
              style={styles.extendTopImg}
              resizeMode="contain"
            />
          </View>
          <View style={{ width: width, height: navImageHeight }}>
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
                { width: width, height: navImageHeight },
              ]}>
              <View
                style={{
                  width: (width / 375) * 110,
                  height: (width / 375) * 110,
                  backgroundColor: '#FFFFFF',
                }}></View>
            </View>
          </View>
          <View
            style={[
              styles.extendShare,
              { marginTop: -(navImageHeight - (width / 375) * 110) / 2 + 15 },
            ]}>
            <View style={styles.extendShareView}>
              <Image
                style={styles.extendShareHb}
                // @ts-ignore
                source={require('../../assets/hb.png')}
              />
              <View style={styles.extendShareTitle}>
                <Text style={styles.extendShareText}>点击二维码，生成专属推广页</Text>
              </View>
              <View style={styles.extendDashedLine}>
                {dashView}
              </View>
              <View style={styles.extendShareBody}>
                <View style={styles.extendShareBodyView}>
                  <View style={styles.extendShareBodyImg}>
                    <FitImage style={styles.extendShareBodyIcon} source={require('../../assets/pyq.png')}
                      resizeMode="contain" />
                  </View>
                  <Text style={styles.extendShareBodyText}>朋友圈</Text>
                </View>
                <View style={styles.extendShareBodyView}>
                  <View style={styles.extendShareBodyImg}>
                    <FitImage style={styles.extendShareBodyIcon} source={require('../../assets/wx.png')}
                      resizeMode="contain" />
                  </View>
                  <Text style={styles.extendShareBodyText}>微信好友</Text>
                </View>
                <View style={styles.extendShareBodyView}>
                  <View style={styles.extendShareBodyImg}>
                    <FitImage style={styles.extendShareBodyIcon} source={require('../../assets/kj.png')}
                      resizeMode="contain" />
                  </View>
                  <Text style={styles.extendShareBodyText}>qq空间</Text>
                </View>
                <View style={styles.extendShareBodyView}>
                  <View style={styles.extendShareBodyImg}>
                    <FitImage style={styles.extendShareBodyIcon} source={require('../../assets/qq.png')}
                      resizeMode="contain" />
                  </View>
                  <Text style={styles.extendShareBodyText}>qq好友</Text>
                </View>
              </View>
            </View>
            <View style={styles.extendBtnView}>
              <View style={styles.extendBtn}>
                <Text style={styles.extendBtnTxt}>立即邀请</Text>
              </View>
            </View>
            <View style={styles.extendShareView}>
              <View style={styles.extendShareTitle}>
                <Text style={styles.extendShareText}>我的邀请</Text>
              </View>
              <View style={styles.extendDashedLine}>
                {dashView}
              </View>
              <View style={[styles.extendShareBody, { height: 72 }]}>
                <View style={styles.extendShareBodyView}>
                  <Text style={{ color: '#444444', fontWeight: 'bold', fontSize: 14, marginBottom: 6 }}>邀请好友</Text>
                  <Text style={{ color: '#F75139', fontWeight: 'bold', fontSize: 18 }}>50人</Text>
                </View>
                <View style={styles.extendShareBodyView}>
                  <Text style={{ color: '#444444', fontWeight: 'bold', fontSize: 14, marginBottom: 6 }}>获得奖励</Text>
                  <Text style={{ color: '#F75139', fontWeight: 'bold', fontSize: 18 }}>18元</Text>
                </View>
              </View>
            </View>
            <View style={[styles.extendShareView, { marginTop: 20 }]}>
              <View style={styles.extendShareTitle}>
                <Text style={styles.extendShareText}>本月推广排行榜</Text>
              </View>
              <View style={styles.extendDashedLine}>
                {dashView}
              </View>
              <View>

              </View>
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
    alignItems: "center",
  },
  extendShareText: {
    color: '#F23718',
    fontSize: 16,
    fontWeight: 'bold'
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
    justifyContent: 'center'
  },
  extendShareBodyText: {
    fontSize: 14,
    color: '#666666'
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
    marginBottom: 3
  },
  extendShareBodyIcon: {
    width: 40,
    height: 40
  },
  extendBtnView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 23
  },
  extendBtn: {
    marginTop: 15,
    width: 235,
    height: 38.5,
    backgroundColor: '#fefeb8',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extendBtnTxt: {
    color: '#D41E00',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
export default ExtendScreen;
