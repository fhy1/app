import React from 'react';
import {
  StyleSheet, View, Text, Image, TouchableOpacity, FlatList
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
      labels: ['默认', '最新', '新人', '简单', '高价'],
      labelStatus: 0
    };
  }

  componentDidMount = () => {
    // this.props.fetchHalljob();
  }

  onHandelPress = (index) => {
    console.log(111)
    this.setState({
      labelStatus: index
    })
  }

  render() {
    const { hall } = this.props;
    const { labels, labelStatus } = this.state;
    console.log('hall', hall)
    console.log(hall.list)
    console.log(hall.list.data)
    return (
      <View style={styles.hallView}>
        <View style={styles.hallTitleView}>
          <View style={styles.hallTitle}>
            {
              labels.map((item, index) => {
                return index == labelStatus ?
                  <View style={[styles.hallTitleText, styles.hallTitleClick]} key={index}>
                    <Text style={styles.hallTitleTextClick}>{item}</Text>
                  </View> : <View style={styles.hallTitleText} onResponderGrant={this.onHandelPress} key={index}>
                    <TouchableOpacity style={styles.hallTitleTextTouch} onPress={this.onHandelPress.bind(this, index)}><Text style={styles.hallTitleTextNormal}>{item}</Text></TouchableOpacity>
                  </View>
              })
            }
          </View>
        </View>
        <FlatList style={styles.hallFlatList} data={[{ title: '超级简单的任务' }, { title: '超级简单的任务' }]}
          ItemSeparatorComponent={() => (
            <View style={styles.hallFlatListLine}></View>
          )}
          renderItem={({ item, index, separators }) => (
            <TouchableOpacity
            // onPress={() => this._onPress(item)}
            // onShowUnderlay={separators.highlight}
            // onHideUnderlay={separators.unhighlight}
            >
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
            </TouchableOpacity>
          )} />
        {/* <Text>Home4Screen {hall.data.data.pageSize}</Text> */}
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
    fontWeight: "normal",
  },
  hallTitleClick: {
    borderBottomColor: '#FD3F3F',
    borderBottomWidth: 1
  },
  hallTitleTextTouch: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  hallFlatList: {
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFFFFF'
  },
  hallFlatListLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#DDDDDD'
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
