import React from 'react';
import { View, Image, StyleSheet, ScrollView, Dimensions, TextInput, Text } from 'react-native';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swiperHeight: 0,
    };
  }

  componentDidMount() {
    let { width } = Dimensions.get('window');
    this.setState({
      swiperHeight: 180 * width / 350,
    });

  }

  render() {
    const { swiperHeight } = this.state;
    return (
      <View style={styles.homeView}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={{ height: swiperHeight }}>
            <Image
              style={styles.swiperImage}
              source={require('../../assets/banner.png')}
            />
          </View>
          <View style={styles.navView}>
            <View style={styles.navSearch}>
              <Image style={styles.navSearchImg} source={require('../../assets/search.png')} />
              <TextInput style={styles.navSearchTextInput}
                placeholder="搜索你喜欢的任务!" />
            </View>
            <View style={styles.navTitle}>
              <View style={styles.navTitleCard}>
                <View style={styles.navTitleCardIcon}>
                  <Image style={styles.navTitleCardImg}
                    source={require('../../assets/newpeople.png')} />
                  <Text>新人专区</Text>
                </View>
                <View style={styles.navTitleCardIcon}>
                  <Image style={styles.navTitleCardImg}
                    source={require('../../assets/sign.png')} />
                  <Text>签到打卡</Text>
                </View>
                <View style={styles.navTitleCardIcon}>
                  <Image style={styles.navTitleCardImg}
                    source={require('../../assets/service.png')} />
                  <Text>联系客服</Text>
                </View>
              </View>
              <View style={styles.navTitleCard}>
                <View style={styles.navTitleCardIcon}>
                  <Image style={styles.navTitleCardImg}
                    source={require('../../assets/new.png')} />
                  <Text>最新任务</Text>
                </View>
                <View style={styles.navTitleCardIcon}>
                  <Image style={styles.navTitleCardImg}
                    source={require('../../assets/easy.png')} />
                  <Text>简单任务</Text>
                </View>
                <View style={styles.navTitleCardIcon}>
                  <Image style={styles.navTitleCardImg}
                    source={require('../../assets/highprice.png')} />
                  <Text>高价悬赏</Text>
                </View>
              </View>
            </View>
            <View style={styles.bodyTitle}><Text>推荐悬赏</Text></View>
            <View style={styles.bodyList}>
              <View style={styles.bodyListItem}></View>
              <View style={styles.bodyListItem}></View>
              <View style={styles.bodyListItem}></View>
              <View style={styles.bodyListItem}></View>
              <View style={styles.bodyListItem}></View>
              <View style={styles.bodyListItem}></View>
              <View style={styles.bodyListItem}></View>
              <View style={styles.bodyListItem}></View>
              <View style={styles.bodyListItem}></View>
              <View style={styles.bodyListItem}></View>
              <View style={styles.bodyListItemLast}></View>
            </View>
            <View><Text>-查看更多悬赏-</Text></View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    // flex: 1
  },
  swiperImage: {
    width: '100%',
    height: '100%',
  },
  navView: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
  },
  navSearch: {
    height: 44,
    marginTop: -22,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    paddingLeft: 10.5,
    paddingRight: 10.5,
    flexDirection: 'row',
    alignItems: "center"
  },
  navSearchImg: {
    width: 21,
    marginRight: 5,
  },
  navSearchTextInput: {
    flex: 1,
  },
  navTitle: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    height: 156,
    borderRadius: 4,
    marginTop: 15
  },
  navTitleCard: {
    height: 78,
    flex: 1,
    flexDirection: 'row'
  },
  navTitleCardIcon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  navTitleCardImg: {
    width: 32,
    height: 32,
    marginBottom: 8
  },
  bodyTitle: {
    marginTop: 19,
    marginBottom: 15,
    borderLeftWidth: 1,
    borderLeftColor: '#FFDB44',
    paddingLeft: 11
  },
  bodyList: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 4,
    paddingLeft: 10.5,
    paddingRight: 10.5,
  },
  bodyListItem: {
    height: 70,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  bodyListItemLast: {
    height: 70,
    flex: 1,
  }
});

export default HomeScreen;
