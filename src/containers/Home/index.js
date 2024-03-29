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
  TouchableWithoutFeedback,
  Linking,
  Modal,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {getData} from '../../utils/storage';
import {getLogin} from '../../api/login';
import {connect} from 'react-redux';
import {
  fetchHomeImg,
  fetchHomeSignIn,
  SignInHome,
  fetchHomeRecommend,
  fetchVersion,
} from '../../api/home';
import {paramToQuery2} from '../../utils/fetch';
import {WToast} from 'react-native-smart-tip';
import SplashScreen from 'react-native-splash-screen';

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
      modalVisible: false,
    };
  }

  async componentDidMount() {
    let {width} = Dimensions.get('window');
    this.setState({
      swiperHeight: (180 * width) / 350,
      width: width,
    });
    fetchVersion().then(verson => {
      console.log('版本', verson);
      if (verson.data != '1.0.0') {
        this.setState({modalVisible: true});
      }
    });
    const data = await getData('userNews');
    if (data && data !== 'err') {
      this.props.getLogin(data);
    }
    const [homeImgs, recommend] = await Promise.all([
      fetchHomeImg(),
      fetchHomeRecommend(1, 10),
    ]);
    let signStatus = null;
    if (data && data.userId) {
      signStatus = await fetchHomeSignIn(data.userId);
    }
    SplashScreen.hide();
    this.setState({
      homeImgs: homeImgs.data ? homeImgs.data : [],
      signFlag: signStatus && signStatus.data == 2 ? true : false,
      recommend: recommend.data,
      recommendList: recommend.data.list,
    });
  }

  async componentDidUpdate(prevProps) {
    console.log(prevProps);
    console.log(this.props);
    if (
      prevProps.login &&
      this.props.login &&
      this.props.login.userId !== prevProps.login.userId
    ) {
      try {
        let signStatus = null;
        if (this.props.login && this.props.login.userId) {
          signStatus = await fetchHomeSignIn(this.props.login.userId);
        }
        this.setState({
          signFlag: signStatus && signStatus.data == 2 ? true : false,
        });
      } catch (error) {}
    }
  }

  componentWillUnmount = () => {
    this.setState({
      modalVisible: false,
    });
  };

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
    if (login && login.userId) {
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
    } else {
      navigation.navigate('Login');
    }
  };

  handelOnJumpToHall = index => {
    const {navigation} = this.props;
    navigation.navigate('Hall', {
      labelStatus: index,
    });
  };

  handelOnJumpToDetail = (jobId, userId) => {
    const {navigation, login} = this.props;
    if (login && login.userId) {
      navigation.navigate('HallDetail', {
        jobId: jobId,
      });
    } else {
      navigation.navigate('Login');
    }
  };

  focusSearch = () => {
    const {navigation} = this.props;
    navigation.navigate('Search');
  };

  goImgDetail = detail => {
    const {navigation} = this.props;
    console.log(detail);
    navigation.navigate('ImgDetail', {
      detail: detail ? detail : '',
    });
  };

  img(flag, url) {
    if (flag) {
      return (
        <Image
          source={require('../../assets/banner.png')}
          style={{width: width, height: swiperHeight}}
        />
      );
    }
  }

  addSubmit = () => {
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    let httpDetail = 'http://212.64.70.14/app/xiaomiguan.apk';

    Linking.canOpenURL(httpDetail)
      .then(supported => {
        if (!supported) {
          toastOpts.data = '不支持链接至: ' + httpDetail;
          WToast.show(toastOpts);
        } else {
          return Linking.openURL(httpDetail);
        }
      })
      .catch(err => {
        toastOpts.data = '链接错误 : ' + httpDetail;
        WToast.show(toastOpts);
      });
  };

  handelOnClickKeFu = () => {
    const {navigation, login} = this.props;
    if (login && login.userId) {
      navigation.navigate('Service');
    } else {
      navigation.navigate('Login');
    }
  };

  CloseModel = () => {};

  render() {
    const {
      swiperHeight,
      width,
      signFlag,
      recommendList,
      homeImgs,
      modalVisible,
    } = this.state;

    let homeimg = null;
    if (homeImgs.length == 0) {
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
        dot={<View style={styles.noDot} />}
        activeDot={<View style={styles.dot} />}>
        <TouchableWithoutFeedback>
          <Image
            // source={require('../../assets/banner.png')}
            source={{
              uri: '',
            }}
            style={styles.swiperImage}
          />
        </TouchableWithoutFeedback>
      </Swiper>;
    } else if (homeImgs.length == 1) {
      homeimg = (
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
          dot={<View style={styles.noDot} />}
          activeDot={<View style={styles.dot} />}>
          <TouchableWithoutFeedback
            onPress={this.goImgDetail.bind(this, homeImgs[0].details)}>
            <Image
              // source={require('../../assets/banner.png')}
              source={{
                uri: paramToQuery2(homeImgs[0].img),
              }}
              style={styles.swiperImage}
            />
          </TouchableWithoutFeedback>
        </Swiper>
      );
    } else if (homeImgs.length == 2) {
      homeimg = (
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
          dot={<View style={styles.noDot} />}
          activeDot={<View style={styles.dot} />}>
          <TouchableWithoutFeedback
            onPress={this.goImgDetail.bind(this, homeImgs[0].details)}>
            <Image
              // source={require('../../assets/banner.png')}
              source={{
                uri: paramToQuery2(homeImgs[0].img),
              }}
              style={styles.swiperImage}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={this.goImgDetail.bind(this, homeImgs[1].details)}>
            <Image
              // source={require('../../assets/banner.png')}
              source={{
                uri: paramToQuery2(homeImgs[1].img),
              }}
              style={styles.swiperImage}
            />
          </TouchableWithoutFeedback>
        </Swiper>
      );
    } else if (homeImgs.length == 3) {
      homeimg = (
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
          dot={<View style={styles.noDot} />}
          activeDot={<View style={styles.dot} />}>
          <TouchableWithoutFeedback
            onPress={this.goImgDetail.bind(this, homeImgs[0].details)}>
            <Image
              // source={require('../../assets/banner.png')}
              source={{
                uri: paramToQuery2(homeImgs[0].img),
              }}
              style={styles.swiperImage}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={this.goImgDetail.bind(this, homeImgs[1].details)}>
            <Image
              // source={require('../../assets/banner.png')}
              source={{
                uri: paramToQuery2(homeImgs[1].img),
              }}
              style={styles.swiperImage}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={this.goImgDetail.bind(this, homeImgs[2].details)}>
            <Image
              // source={require('../../assets/banner.png')}
              source={{
                uri: paramToQuery2(homeImgs[2].img),
              }}
              style={styles.swiperImage}
            />
          </TouchableWithoutFeedback>
        </Swiper>
      );
    } else if (homeImgs.length == 4) {
      homeimg = (
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
          dot={<View style={styles.noDot} />}
          activeDot={<View style={styles.dot} />}>
          <TouchableWithoutFeedback
            onPress={this.goImgDetail.bind(this, homeImgs[0].details)}>
            <Image
              // source={require('../../assets/banner.png')}
              source={{
                uri: paramToQuery2(homeImgs[0].img),
              }}
              style={styles.swiperImage}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={this.goImgDetail.bind(this, homeImgs[1].details)}>
            <Image
              // source={require('../../assets/banner.png')}
              source={{
                uri: paramToQuery2(homeImgs[1].img),
              }}
              style={styles.swiperImage}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={this.goImgDetail.bind(this, homeImgs[2].details)}>
            <Image
              // source={require('../../assets/banner.png')}
              source={{
                uri: paramToQuery2(homeImgs[2].img),
              }}
              style={styles.swiperImage}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={this.goImgDetail.bind(this, homeImgs[3].details)}>
            <Image
              // source={require('../../assets/banner.png')}
              source={{
                uri: paramToQuery2(homeImgs[3].img),
              }}
              style={styles.swiperImage}
            />
          </TouchableWithoutFeedback>
        </Swiper>
      );
    } else if (homeImgs.length == 5) {
      homeimg = (
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
          dot={<View style={styles.noDot} />}
          activeDot={<View style={styles.dot} />}>
          <TouchableWithoutFeedback
            onPress={this.goImgDetail.bind(this, homeImgs[0].details)}>
            <Image
              // source={require('../../assets/banner.png')}
              source={{
                uri: paramToQuery2(homeImgs[0].img),
              }}
              style={styles.swiperImage}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={this.goImgDetail.bind(this, homeImgs[1].details)}>
            <Image
              // source={require('../../assets/banner.png')}
              source={{
                uri: paramToQuery2(homeImgs[1].img),
              }}
              style={styles.swiperImage}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={this.goImgDetail.bind(this, homeImgs[2].details)}>
            <Image
              // source={require('../../assets/banner.png')}
              source={{
                uri: paramToQuery2(homeImgs[2].img),
              }}
              style={styles.swiperImage}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={this.goImgDetail.bind(this, homeImgs[3].details)}>
            <Image
              // source={require('../../assets/banner.png')}
              source={{
                uri: paramToQuery2(homeImgs[3].img),
              }}
              style={styles.swiperImage}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={this.goImgDetail.bind(this, homeImgs[4].details)}>
            <Image
              // source={require('../../assets/banner.png')}
              source={{
                uri: paramToQuery2(homeImgs[4].img),
              }}
              style={styles.swiperImage}
            />
          </TouchableWithoutFeedback>
        </Swiper>
      );
    } else if (homeImgs.length == 6) {
      homeimg = (
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
          dot={<View style={styles.noDot} />}
          activeDot={<View style={styles.dot} />}>
          <TouchableWithoutFeedback
            onPress={this.goImgDetail.bind(this, homeImgs[0].details)}>
            <Image
              // source={require('../../assets/banner.png')}
              source={{
                uri: paramToQuery2(homeImgs[0].img),
              }}
              style={styles.swiperImage}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={this.goImgDetail.bind(this, homeImgs[1].details)}>
            <Image
              // source={require('../../assets/banner.png')}
              source={{
                uri: paramToQuery2(homeImgs[1].img),
              }}
              style={styles.swiperImage}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={this.goImgDetail.bind(this, homeImgs[2].details)}>
            <Image
              // source={require('../../assets/banner.png')}
              source={{
                uri: paramToQuery2(homeImgs[2].img),
              }}
              style={styles.swiperImage}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={this.goImgDetail.bind(this, homeImgs[3].details)}>
            <Image
              // source={require('../../assets/banner.png')}
              source={{
                uri: paramToQuery2(homeImgs[3].img),
              }}
              style={styles.swiperImage}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={this.goImgDetail.bind(this, homeImgs[4].details)}>
            <Image
              // source={require('../../assets/banner.png')}
              source={{
                uri: paramToQuery2(homeImgs[4].img),
              }}
              style={styles.swiperImage}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={this.goImgDetail.bind(this, homeImgs[5].details)}>
            <Image
              // source={require('../../assets/banner.png')}
              source={{
                uri: paramToQuery2(homeImgs[5].img),
              }}
              style={styles.swiperImage}
            />
          </TouchableWithoutFeedback>
          {/* <TouchableWithoutFeedback onPress={this.goImgDetail.bind(this, homeImgs[6].details)}>
            <Image
              // source={require('../../assets/banner.png')}
              source={{
                uri: paramToQuery2(homeImgs[6].img),
              }}
              style={styles.swiperImage}
            />
          </TouchableWithoutFeedback> */}
        </Swiper>
      );
    }

    console.log('homeImgs', homeImgs);

    return (
      <View style={styles.homeView}>
        <ScrollView>
          {homeimg}

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
                onFocus={this.focusSearch}
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
                <TouchableOpacity
                  style={styles.navTitleCardIcon}
                  onPress={this.handelOnClickKeFu}>
                  <View style={styles.navTitleCardIcon}>
                    <Image
                      style={styles.navTitleCardImg}
                      source={require('../../assets/service.png')}
                    />
                    <Text>联系客服</Text>
                  </View>
                </TouchableOpacity>
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
                        onPress={this.handelOnJumpToDetail.bind(
                          this,
                          item.jobId,
                          item.userId,
                        )}>
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
                                source={{uri: item.headimgurl}}
                              />
                            ) : (
                              <Image
                                style={styles.homeListIconImg}
                                // @ts-ignore
                                source={require('../../assets/head.png')}
                              />
                            )}
                            {item.isRecommend ? (
                              <Image
                                style={styles.tuijianImg}
                                source={require('../../assets/tuijian.png')}
                              />
                            ) : null}
                            {item.isMember != 1 ? (
                              <Image
                                style={styles.huiyuanImg}
                                source={require('../../assets/huiyuan.png')}
                              />
                            ) : null}
                          </View>
                          <View style={styles.homeListBody}>
                            <View>
                              <Text
                                style={styles.homeListBodyText}
                                numberOfLines={1}>
                                {item.jobTitle}
                              </Text>
                            </View>
                            <View style={styles.homeListBodyView}>
                              <View style={styles.homeListBodybtn1}>
                                <View style={styles.homeListBodybtn}>
                                  <Text style={styles.homeListBodybtnTxt}>
                                    {item.jobSource}
                                  </Text>
                                </View>
                              </View>
                              <View style={styles.homeListBodybtn2}>
                                <View style={styles.homeListBodybtn}>
                                  <Text style={styles.homeListBodybtnTxt}>
                                    {item.typeName}
                                  </Text>
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={this.CloseModel}>
          <View style={styles.taskModal}>
            <View style={[styles.opinionModalView, {width: width * 0.8}]}>
              <View style={styles.opinionTopTitle}>
                <Text style={styles.opinionTopTitleTxt}>版本更新</Text>
              </View>
              <View style={styles.opinionTopTitle}>
                <Text style={styles.opinionInp}>
                  小密罐，有新的版本啦，快点击更新吧
                </Text>
              </View>
              <View style={styles.opinionBtnView}>
                <TouchableOpacity>
                  <View style={[styles.opinionBtn]}>
                    <Text style={styles.opinionTxt}></Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.addSubmit}>
                  <View
                    style={[styles.opinionBtn, {backgroundColor: '#FFDB44'}]}>
                    <Text style={styles.opinionTxt}>点击更新</Text>
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
    width: 40,
    alignItems: 'center',
  },
  homeListIconImg: {
    width: 40,
    height: 40,
    marginTop: 14,
  },
  tuijianImg: {
    position: 'absolute',
    top: 14,
    left: 0,
    width: 20,
    height: 20,
  },
  huiyuanImg: {
    position: 'absolute',
    bottom: 14,
    right: 0,
    width: 14,
    height: 14,
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
    fontSize: 15,
    color: '#444444',
    fontWeight: 'bold',
  },
  homeListBodybtn1: {
    height: 22,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  homeListBodybtn2: {
    height: 22,
    borderRadius: 4,
    overflow: 'hidden',
  },
  homeListBodybtn: {
    paddingLeft: 6,
    paddingRight: 6,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDB44',
  },
  homeListBodybtnTxt: {
    fontSize: 12,
    color: '#444444',
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
    textAlign: 'right',
  },
  dot: {
    //选中的圆点样式
    backgroundColor: '#000000',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 10,
    marginRight: 9,
    marginTop: 9,
    marginBottom: 9,
  },
  noDot: {
    //未选中的圆点样式
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 10,
    marginRight: 9,
    marginTop: 9,
    marginBottom: 9,
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
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  opinionInp2: {
    height: 40,
    backgroundColor: '#F3F3F3',
    textAlignVertical: 'top',
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
    signStatus: state.home.signStatus,
    login: state.login.login,
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
