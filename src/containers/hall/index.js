import React from 'react';
import {
  StyleSheet, View, Text, Image
} from 'react-native';
import { connect } from 'react-redux';
import { fetchHalljob } from '../../actions/hall';

class HallScreen extends React.Component {
  static navigationOptions = {
    title: '全部任务',
    headerStyle: {
      backgroundColor: '#FFDB44',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    this.props.fetchHalljob();
  }

  render() {
    const { hall } = this.props;
    console.log(hall)
    console.log(hall.list)
    console.log(hall.list.data)
    return (
      <View style={styles.hallView}>
        <View style={styles.hallTitleView}>
          <View style={styles.hallTitle}>
            <View style={styles.hallTitleText}>
              <Text style={styles.hallTitleTextClick}>默认</Text>
            </View>
            <View style={styles.hallTitleText}>
              <Text style={styles.hallTitleTextNormal}>最新</Text>
            </View>
            <View style={styles.hallTitleText}>
              <Text style={styles.hallTitleTextNormal}>新人</Text>
            </View>
            <View style={styles.hallTitleText}>
              <Text style={styles.hallTitleTextNormal}>简单</Text>
            </View>
            <View style={styles.hallTitleText}>
              <Text style={styles.hallTitleTextNormal}>高价</Text>
            </View>
          </View>
        </View>
        <View style={styles.hallList}>
          <View style={styles.hallListIcon}>
            <Image
              style={styles.hallListIconImg}
              source={require('../../assets/head.png')}></Image>
          </View>
          <View style={styles.hallListBody}>
            <View><Text style={styles.hallListBodyText}>超级简单的任务</Text></View>
            <View style={styles.hallListBodyView}>
              <View style={styles.hallListBodybtn1}>
                <View style={styles.hallListBodybtn}>
                  <Text>云闪付</Text>
                </View>
              </View>
              <View style={styles.hallListBodybtn2}>
                <View style={styles.hallListBodybtn}>
                  <Text>认证转发</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.hallListRight}>
            <View style={styles.hallListRightBody}>
              <View>
                <Text style={styles.hallListRightTop}>赏2.25元</Text>
              </View>
              <View>
                <Text style={styles.hallListRightBottom}>剩余15份</Text>
              </View>
            </View>
          </View>
        </View>
        <Text>Home4Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hallView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  hallTitleView: {
    height: 40,
  },
  hallTitle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
  },
  hallTitleText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666666',
    fontSize: 14,
    fontWeight: "normal"
  },
  hallTitleTextClick: {
    fontSize: 14,
    color: '#444444',
    fontWeight: "bold"
  },
  hallTitleTextNormal: {
    fontSize: 14,
    color: '#666666',
    fontWeight: "normal"
  },
  hallList: {
    height: 68,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF'
  },
  hallListIcon: {
    width: 36,
    height: '100%',
    alignItems: "center"
  },
  hallListIconImg: {
    width: 36,
    height: 36,
    marginTop: 16
  },
  hallListBody: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 12
  },
  hallListBodyView: {
    flexDirection: 'row',
    marginTop: 6
  },
  hallListBodyText: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'bold'
  },
  hallListBodybtn1: {
    width: 60,
    height: 22,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10
  },
  hallListBodybtn2: {
    width: 72,
    height: 22,
    borderRadius: 4,
    overflow: 'hidden'
  },
  hallListBodybtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDB44'
  },
  hallListRight: {
    width: 80,
    height: '100%',
  },
  hallListRightBody: {
    flex: 1,
    justifyContent: "center"
  },
  hallListRightTop: {
    fontSize: 14,
    color: '#FD3F3F',
  },
  hallListRightBottom: {
    marginTop: 8,
    fontSize: 12,
    color: '#666666',
  }
})

function mapStateToProps(state) {
  return {
    hall: state.hall,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchHalljob: () => dispatch(fetchHalljob()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HallScreen);
// export default HallScreen;
