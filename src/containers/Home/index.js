import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swiperHeight: 0,
      width: 0,
    };
  }

  componentDidMount() {
    let { width } = Dimensions.get('window');
    this.setState({
      swiperHeight: (180 * width) / 350,
      width: width,
    });
  }

  render() {
    const { swiperHeight, width } = this.state;
    const { navigation } = this.props;
    images = [
      require('../../assets/banner.png'),
      require('../../assets/banner.png'),
      require('../../assets/banner.png'),
      require('../../assets/banner.png'),
    ];
    return (
      <View style={styles.homeView}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Swiper
            style={{ width: width, height: swiperHeight }} //样式
            height={swiperHeight} //组件高度
            loop={true} //如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
            autoplay={true} //自动轮播
            autoplayTimeout={4} //每隔4秒切换
            horizontal={true} //水平方向，为false可设置为竖直方向
            paginationStyle={{ bottom: 20 }} //小圆点的位置：距离底部10px
            showsButtons={false} //为false时不显示控制按钮
            showsPagination={true} //为false不显示下方圆点
            dot={
              <View
                style={{
                  //未选中的圆点样式
                  backgroundColor: 'rgba(0,0,0,.2)',
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginLeft: 10,
                  marginRight: 9,
                  marginTop: 9,
                  marginBottom: 9,
                }}
              />
            }
            activeDot={
              <View
                style={{
                  //选中的圆点样式
                  backgroundColor: '#000000',
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginLeft: 10,
                  marginRight: 9,
                  marginTop: 9,
                  marginBottom: 9,
                }}
              />
            }>
            <Image
              source={require('../../assets/banner.png')}
              style={styles.swiperImage}
            />
            <Image
              source={require('../../assets/banner.png')}
              style={styles.swiperImage}
            />
            <Image
              source={require('../../assets/banner.png')}
              style={styles.swiperImage}
            />
            <Image
              source={require('../../assets/banner.png')}
              style={styles.swiperImage}
            />
          </Swiper>
          <View style={styles.navView}>
            <View style={styles.navSearch}>
              <Image
                style={styles.navSearchImg}
                source={require('../../assets/search.png')}
              />
              <TextInput
                style={styles.navSearchTextInput}
                placeholder="搜索你喜欢的任务!"
              />
            </View>
            <View style={styles.navTitle}>
              <View style={styles.navTitleCard}>
                <View style={styles.navTitleCardIcon}>
                  <Image
                    style={styles.navTitleCardImg}
                    source={require('../../assets/newpeople.png')}
                  />
                  <Text>新人专区</Text>
                </View>
                <View style={styles.navTitleCardIcon}>
                  <Image
                    style={styles.navTitleCardImg}
                    source={require('../../assets/sign.png')}
                  />
                  <Text>签到打卡</Text>
                </View>
                <View style={styles.navTitleCardIcon}>
                  <Image
                    style={styles.navTitleCardImg}
                    source={require('../../assets/service.png')}
                  />
                  <Text>联系客服</Text>
                </View>
              </View>
              <View style={styles.navTitleCard}>
                <View style={styles.navTitleCardIcon}>
                  <Image
                    style={styles.navTitleCardImg}
                    source={require('../../assets/new.png')}
                  />
                  <Text>最新任务</Text>
                </View>
                <View style={styles.navTitleCardIcon}>
                  <Image
                    style={styles.navTitleCardImg}
                    source={require('../../assets/easy.png')}
                  />
                  <Text>简单任务</Text>
                </View>
                <View style={styles.navTitleCardIcon}>
                  <Image
                    style={styles.navTitleCardImg}
                    source={require('../../assets/highprice.png')}
                  />
                  <Text>高价悬赏</Text>
                </View>
              </View>
            </View>
            <View style={styles.bodyTitle}>
              <Text>推荐悬赏</Text>
            </View>
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
            <View style={styles.bottomTiTle}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Extend');
                }}>
                <Text>-查看更多悬赏-</Text>
              </TouchableOpacity>
            </View>
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
    alignItems: 'center',
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
    marginTop: 15,
  },
  navTitleCard: {
    height: 78,
    flex: 1,
    flexDirection: 'row',
  },
  navTitleCardIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitleCardImg: {
    width: 32,
    height: 32,
    marginBottom: 8,
  },
  bodyTitle: {
    marginTop: 19,
    marginBottom: 15,
    borderLeftWidth: 1,
    borderLeftColor: '#FFDB44',
    paddingLeft: 11,
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
  },
  bottomTiTle: {
    height: 42,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
