// @ts-nocheck
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
// import {loadStorage} from '../../utils/storage';
import {getLogin} from '../../api/login';
import {connect} from 'react-redux';
// import {
//   fetchHomeImg,
//   fetchHomeSignIn,
//   SignInHome,
//   fetchHomeRecommend,
// } from '../../actions/home';
import {
  fetchHomeImg,
  fetchHomeSignIn,
  SignInHome,
  fetchHomeRecommend,
} from '../../api/home';
import {paramToQuery2} from '../../utils/fetch';
import {WToast} from 'react-native-smart-tip';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swiperHeight: 0,
      width: 0,
      signFlag: true,
      recommendList: [],
      recommend: {},
      homeImgs: [],
    };
  }

  async componentDidMount() {
    let {width} = Dimensions.get('window');
    this.setState({
      swiperHeight: (180 * width) / 350,
      width: width,
    });
    // const data = await loadStorage('userNews');
    // console.log('持久化', data);
    // if (data !== 'err') {
    // }
    const data2 = {
      city: null,
      country: null,
      headimgurl: null,
      isAdmin: 0,
      isMember: 1,
      memberTime: null,
      nickName: null,
      openid: null,
      phone: '13337903991',
      province: null,
      reason: null,
      sex: null,
      status: 0,
      // uid: '1856659',
      uid: '39143550',
      upUID: null,
      userId: 7,
    };
    this.props.getLogin(data2);
    // this.props.fetchHomeImg();
    const [homeImgs, signStatus, recommend] = await Promise.all([
      fetchHomeImg(),
      fetchHomeSignIn(data2.userId),
      fetchHomeRecommend(1, 10),
    ]);
    this.setState({
      homeImgs: homeImgs.data,
      signFlag: signStatus.data == 2 ? true : false,
      recommend: recommend.data,
      recommendList: recommend.data.list,
    });
  }

  handelOnClickSign = () => {
    const {login} = this.props;
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    this.setState({
      signFlag: false,
    });
    SignInHome(login.userId).then(
      () => {
        toastOpts.data = '签到成功';
        WToast.show(toastOpts);
      },
      () => {
        toastOpts.data = '签到失败';
        WToast.show(toastOpts);
        this.setState({
          signFlag: true,
        });
      },
    );
  };

  handelOnJumpToHall = index => {
    const {navigation} = this.props;
    navigation.navigate('Hall', {
      labelStatus: index,
    });
  };

  render() {
    const {swiperHeight, width, signFlag, recommendList, homeImgs} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.homeView}>
        <ScrollView>
          <Swiper
            style={{width: width, height: swiperHeight}} //样式
            height={swiperHeight} //组件高度
            loop={true} //如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
            autoplay={true} //自动轮播
            autoplayTimeout={4} //每隔4秒切换
            horizontal={true} //水平方向，为false可设置为竖直方向
            paginationStyle={{bottom: 20}} //小圆点的位置：距离底部10px
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
            {homeImgs && homeImgs.length > 0 ? (
              homeImgs.map(item => {
                let url = paramToQuery2(item.img);
                return (
                  <Image
                    key={item.imgId}
                    source={{uri: url}}
                    style={styles.swiperImage}
                  />
                );
              })
            ) : (
              <Image
                source={require('../../assets/banner.png')}
                style={styles.swiperImage}
              />
            )
            /* <Image
              source={require('../../assets/banner.png')}
              style={styles.swiperImage}
            />
            <Image
              source={require('../../assets/banner.png')}
              style={styles.swiperImage}
            /> */
            }
          </Swiper>
          {/* <Image
            source={require('../../assets/banner.png')}
            style={{width: width, height: swiperHeight}}
          /> */}
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
                <TouchableOpacity
                  style={styles.navTitleCardIcon}
                  onPress={this.handelOnJumpToHall.bind(this, 1)}>
                  <View style={styles.navTitleCardIcon}>
                    <Image
                      style={styles.navTitleCardImg}
                      source={require('../../assets/newpeople.png')}
                    />
                    <Text>新人专区</Text>
                  </View>
                </TouchableOpacity>
                {signFlag ? (
                  <TouchableOpacity
                    style={styles.navTitleCardIcon}
                    onPress={this.handelOnClickSign}>
                    <View style={styles.navTitleCardIcon}>
                      <Image
                        style={styles.navTitleCardImg}
                        source={require('../../assets/sign.png')}
                      />
                      <Text>签到打卡</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.navTitleCardIcon}>
                    <Image
                      style={styles.navTitleCardImg}
                      source={require('../../assets/dissign.png')}
                    />
                    <Text>签到打卡</Text>
                  </View>
                )}

                <View style={styles.navTitleCardIcon}>
                  <Image
                    style={styles.navTitleCardImg}
                    source={require('../../assets/service.png')}
                  />
                  <Text>联系客服</Text>
                </View>
              </View>
              <View style={styles.navTitleCard}>
                <TouchableOpacity
                  style={styles.navTitleCardIcon}
                  onPress={this.handelOnJumpToHall.bind(this, 4)}>
                  <View style={styles.navTitleCardIcon}>
                    <Image
                      style={styles.navTitleCardImg}
                      source={require('../../assets/new.png')}
                    />
                    <Text>最新任务</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.navTitleCardIcon}
                  onPress={this.handelOnJumpToHall.bind(this, 2)}>
                  <View style={styles.navTitleCardIcon}>
                    <Image
                      style={styles.navTitleCardImg}
                      source={require('../../assets/easy.png')}
                    />
                    <Text>简单任务</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.navTitleCardIcon}
                  onPress={this.handelOnJumpToHall.bind(this, 3)}>
                  <View style={styles.navTitleCardIcon}>
                    <Image
                      style={styles.navTitleCardImg}
                      source={require('../../assets/highprice.png')}
                    />
                    <Text>高价悬赏</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bodyTitle}>
              <Text>推荐悬赏</Text>
            </View>
            <View style={styles.bodyList}>
              {recommendList
                ? recommendList.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={item.jobId}
                        // onPress={() => this._onPress(item)}
                      >
                        <View
                          style={
                            index != recommendList.length - 1
                              ? styles.homeList
                              : [styles.homeList, {borderBottomWidth: 0}]
                          }>
                          <View style={styles.homeListIcon}>
                            {item.headimgurl ? (
                              <Image
                                style={styles.homeListIconImg}
                                // @ts-ignore
                                source={{uri: paramToQuery2(item.headimgurl)}}
                              />
                            ) : (
                              <Image
                                style={styles.homeListIconImg}
                                // @ts-ignore
                                source={require('../../assets/head.png')}
                              />
                            )}
                          </View>
                          <View style={styles.homeListBody}>
                            <View>
                              <Text style={styles.homeListBodyText}>
                                {item.jobTitle}
                              </Text>
                            </View>
                            <View style={styles.homeListBodyView}>
                              <View style={styles.homeListBodybtn1}>
                                <View style={styles.homeListBodybtn}>
                                  <Text>{item.jobSource}</Text>
                                </View>
                              </View>
                              <View style={styles.homeListBodybtn2}>
                                <View style={styles.homeListBodybtn}>
                                  <Text>{item.typeName}</Text>
                                </View>
                              </View>
                            </View>
                          </View>
                          <View style={styles.homeListRight}>
                            <View style={styles.homeListRightBody}>
                              <View>
                                <Text style={styles.homeListRightTop}>
                                  赏{item.releasePrice}元
                                </Text>
                              </View>
                              <View>
                                <Text style={styles.homeListRightBottom}>
                                  剩余{item.surplusNum}份
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                : null}
            </View>
            <View style={styles.bottomTiTle}>
              <TouchableOpacity onPress={this.handelOnJumpToHall.bind(this, 0)}>
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
  navTitleCardIconTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  homeList: {
    height: 68,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  homeListIcon: {
    width: 36,
    height: '100%',
    alignItems: 'center',
  },
  homeListIconImg: {
    width: 36,
    height: 36,
    marginTop: 16,
  },
  homeListBody: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  homeListBodyView: {
    flexDirection: 'row',
    marginTop: 6,
  },
  homeListBodyText: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'bold',
  },
  homeListBodybtn1: {
    width: 60,
    height: 22,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  homeListBodybtn2: {
    width: 72,
    height: 22,
    borderRadius: 4,
    overflow: 'hidden',
  },
  homeListBodybtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDB44',
  },
  homeListRight: {
    width: 80,
    height: '100%',
  },
  homeListRightBody: {
    flex: 1,
    justifyContent: 'center',
  },
  homeListRightTop: {
    fontSize: 14,
    color: '#FD3F3F',
  },
  homeListRightBottom: {
    marginTop: 8,
    fontSize: 12,
    color: '#666666',
  },
});

function mapStateToProps(state) {
  return {
    img: state.home.img,
    signStatus: state.home.signStatus,
    login: state.login.login,
    recommendList: state.home.recommendList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getLogin: data => dispatch(getLogin(data)),
    // fetchHomeImg: () => dispatch(fetchHomeImg()),
    // fetchHomeSignIn: userId => dispatch(fetchHomeSignIn(userId)),
    // SignInHome: userId => dispatch(SignInHome(userId)),
    // fetchHomeRecommend: (pageNo, pageSize) =>
    //   dispatch(fetchHomeRecommend(pageNo, pageSize)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
