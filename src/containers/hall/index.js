import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import {connect} from 'react-redux';
// import {
//   fetchHalljob,
//   fetchHallType,
//   fetchHalljobNext,
// } from '../../actions/hall';
import {fetchHalljob, fetchHallType, fetchHalljobNext} from '../../api/hall';

class HallScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: '全部任务',
      headerStyle: {
        backgroundColor: '#FFDB44',
        borderBottomWidth: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
      },
      headerTitle: () => (
        <TouchableOpacity
          onPress={navigation.getParam('changeChoose')}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: '#FFFFFF',
                marginRight: 6,
              }}>
              {navigation.getParam('typeName') || '全部任务'}
            </Text>
            {navigation.getParam('isChoose') ? (
              <Image
                style={{
                  width: 18,
                  height: 18,
                }}
                // @ts-ignore
                source={require('../../assets/up.png')}></Image>
            ) : (
              <Image
                style={{
                  width: 18,
                  height: 18,
                }}
                // @ts-ignore
                source={require('../../assets/down.png')}></Image>
            )}
          </View>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={navigation.getParam('goToclick')}>
          <View
            style={{
              width: 70,
              height: 30,
              backgroundColor: '#FFFFFF',
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 15,
            }}>
            <Text style={{color: '#FFDB44', fontSize: 14}}>发布</Text>
          </View>
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      labels: [
        {title: '默认', id: 0},
        {title: '最新', id: 4},
        {title: '新人', id: 1},
        {title: '简单', id: 2},
        {title: '高价', id: 3},
      ],
      labelStatus: 0,
      isChoose: false,
      typeId: '',
      typeName: '全部任务',
      pageNo: 1,
      pageSize: 15,
      hallType: [],
      jobList: [],
      job: {},
    };
  }

  componentDidMount = async () => {
    const {isChoose, typeName, pageNo, pageSize, typeId} = this.state;
    let labelStatus = 0;
    if (this.props.navigation.state.params) {
      labelStatus = this.props.navigation.state.params.labelStatus
        ? this.props.navigation.state.params.labelStatus
        : 0;
    }
    this.props.navigation.setParams({goToclick: this.goToclick});
    this.props.navigation.setParams({changeChoose: this.changeChoose});
    this.props.navigation.setParams({isChoose: isChoose});
    this.props.navigation.setParams({typeName: typeName});
    const [type, job] = await Promise.all([
      fetchHallType(),
      fetchHalljob(pageNo, pageSize, labelStatus, typeId),
    ]);
    this.setState({
      labelStatus: labelStatus,
      hallType: type.data,
      job: job.data,
      jobList: job.data.list,
    });
  };

  componentWillUnmount = () => {
    // this.props.clearList();
  };

  changeChoose = () => {
    const {isChoose} = this.state;
    this.props.navigation.setParams({isChoose: !isChoose});
    this.setState({
      isChoose: !isChoose,
    });
  };

  handelOnChooseType = (typeId, typeName) => {
    const {labelStatus} = this.state;
    this.props.navigation.setParams({typeName: typeName});
    this.props.navigation.setParams({isChoose: false});
    this.setState({
      typeId: typeId,
      isChoose: false,
      typeName: typeName,
      pageNo: 1,
      pageSize: 15,
    });
    fetchHalljob(1, 15, labelStatus, typeId).then(job => {
      this.setState({
        job: job.data,
        jobList: job.data.list,
      });
    });
  };

  goToclick = () => {
    const {navigation} = this.props;
    navigation.navigate('ReleaseTask');
  };

  onHandelPress = index => {
    const {typeId} = this.state;
    this.setState({
      labelStatus: index,
      pageNo: 1,
      pageSize: 15,
    });
    fetchHalljob(1, 15, index, typeId).then(job => {
      this.setState({
        job: job.data,
        jobList: job.data.list,
      });
    });
  };

  fetchListNext = () => {
    const {job} = this.state;
    console.log(111);
    console.log(job);
    if (job.pageNum < job.pages) {
      console.log(111);
      const {pageNo} = this.state;
      this.setState(
        {
          pageNo: pageNo + 1,
        },
        () => {
          const {pageNo, pageSize, labelStatus, typeId, jobList} = this.state;
          fetchHalljob(pageNo, pageSize, labelStatus, typeId).then(job => {
            this.setState({
              job: job.data,
              jobList: jobList.concat(job.data.list),
            });
          });
        },
      );
    }
  };

  handelOnJumpToDetail = jobId => {
    const {navigation} = this.props;
    navigation.navigate('HallDetail', {
      jobId: jobId,
    });
  };

  render() {
    const {width, height} = Dimensions.get('window');
    const {
      labels,
      labelStatus,
      isChoose,
      typeId,
      hallType,
      jobList,
      job,
    } = this.state;
    return (
      <View style={styles.hallView}>
        <View style={styles.hallTitleView}>
          <View style={styles.hallTitle}>
            {labels.map((item, index) => {
              return item.id == labelStatus ? (
                <View
                  style={[styles.hallTitleText, styles.hallTitleClick]}
                  key={item.id}>
                  <Text style={styles.hallTitleTextClick}>{item.title}</Text>
                </View>
              ) : (
                <View
                  style={styles.hallTitleText}
                  onResponderGrant={this.onHandelPress}
                  key={item.id}>
                  <TouchableOpacity
                    style={styles.hallTitleTextTouch}
                    onPress={this.onHandelPress.bind(this, item.id)}>
                    <Text style={styles.hallTitleTextNormal}>{item.title}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
        <FlatList
          style={styles.hallFlatList}
          data={jobList}
          ItemSeparatorComponent={() => (
            <View style={styles.hallFlatListLine}></View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.hallFlatListEmpty}>
              <Text style={styles.hallFlatListEmptyTxt}>暂无数据</Text>
            </View>
          )}
          refreshing={false}
          getItemLayout={(data, index) => ({
            length: 68,
            offset: 68 * index + 1,
            index,
          })}
          ListFooterComponent={() =>
            jobList.length > 0 ? (
              <View style={styles.hallFlatListEmpty}>
                <Text style={styles.hallFlatListEmptyTxt}>
                  {job.pageNum == job.pages
                    ? '没有更多了，亲'
                    : '正在加载中，请稍等~'}
                </Text>
              </View>
            ) : null
          }
          onEndReachedThreshold={0}
          onEndReached={this.fetchListNext}
          renderItem={({item, index, separators}) => (
            <TouchableOpacity
              onPress={this.handelOnJumpToDetail.bind(this, item.jobId)}>
              <View style={styles.hallList}>
                <View style={styles.hallListIcon}>
                  {item.headimgurl ? (
                    <Image
                      style={styles.hallListIconImg}
                      // @ts-ignore
                      source={{uri: paramToQuery2(item.headimgurl)}}
                    />
                  ) : (
                    <Image
                      style={styles.hallListIconImg}
                      // @ts-ignore
                      source={require('../../assets/head.png')}
                    />
                  )}
                </View>
                <View style={styles.hallListBody}>
                  <View>
                    <Text style={styles.hallListBodyText}>{item.jobTitle}</Text>
                  </View>
                  <View style={styles.hallListBodyView}>
                    <View style={styles.hallListBodybtn1}>
                      <View style={styles.hallListBodybtn}>
                        <Text>{item.jobSource}</Text>
                      </View>
                    </View>
                    <View style={styles.hallListBodybtn2}>
                      <View style={styles.hallListBodybtn}>
                        <Text>{item.typeName}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.hallListRight}>
                  <View style={styles.hallListRightBody}>
                    <View>
                      <Text style={styles.hallListRightTop}>
                        赏{item.releasePrice}元
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.hallListRightBottom}>
                        剩余{item.surplusNum}份
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => JSON.stringify(item.jobId)}
        />
        {isChoose ? (
          <View style={[styles.chooseView, {width: width, height: height}]}>
            <TouchableHighlight
              onPress={this.handelOnChooseType.bind(this, '', '全部任务')}>
              <View style={styles.hallTypeList}>
                {typeId == '' ? (
                  <>
                    <Text
                      style={[
                        styles.hallTypeListTxt,
                        styles.hallTypeListChooseTxt,
                      ]}>
                      全部任务
                    </Text>
                    <Image
                      style={styles.hallTypeListChooseImg}
                      // @ts-ignore
                      source={require('../../assets/yes.png')}
                    />
                  </>
                ) : (
                  <Text style={styles.hallTypeListTxt}>全部任务</Text>
                )}
              </View>
            </TouchableHighlight>
            {hallType.map(item => {
              return (
                <TouchableHighlight
                  key={item.typeId}
                  onPress={this.handelOnChooseType.bind(
                    this,
                    item.typeId,
                    item.typeName,
                  )}>
                  <View style={styles.hallTypeList}>
                    {typeId == item.typeId ? (
                      <>
                        <Text
                          style={[
                            styles.hallTypeListTxt,
                            styles.hallTypeListChooseTxt,
                          ]}>
                          {item.typeName}
                        </Text>
                        <Image
                          style={styles.hallTypeListChooseImg}
                          // @ts-ignore
                          source={require('../../assets/yes.png')}
                        />
                      </>
                    ) : (
                      <Text style={styles.hallTypeListTxt}>
                        {item.typeName}
                      </Text>
                    )}
                  </View>
                </TouchableHighlight>
              );
            })}
            <Text>ccc</Text>
          </View>
        ) : null}
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
    fontWeight: 'normal',
  },
  hallTitleClick: {
    borderBottomColor: '#FD3F3F',
    borderBottomWidth: 1,
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
    fontWeight: 'bold',
  },
  hallTitleTextNormal: {
    fontSize: 14,
    color: '#666666',
    fontWeight: 'normal',
  },
  hallList: {
    height: 68,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  hallListIcon: {
    width: 36,
    height: '100%',
    alignItems: 'center',
  },
  hallListIconImg: {
    width: 36,
    height: 36,
    marginTop: 16,
  },
  hallListBody: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  hallListBodyView: {
    flexDirection: 'row',
    marginTop: 6,
  },
  hallListBodyText: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'bold',
  },
  hallListBodybtn1: {
    width: 60,
    height: 22,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  hallListBodybtn2: {
    width: 72,
    height: 22,
    borderRadius: 4,
    overflow: 'hidden',
  },
  hallListBodybtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDB44',
  },
  hallListRight: {
    width: 80,
    height: '100%',
  },
  hallListRightBody: {
    flex: 1,
    justifyContent: 'center',
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
    backgroundColor: '#FFFFFF',
  },
  hallFlatListLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#DDDDDD',
  },
  chooseView: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  hallTypeList: {
    height: 40,
    justifyContent: 'center',
    paddingLeft: 15,
    backgroundColor: '#FFFFFF',
  },
  hallTypeListTxt: {
    fontSize: 12,
    color: '#666666',
  },
  hallTypeListChooseTxt: {
    fontWeight: 'bold',
    color: '#444444',
  },
  hallTypeListChooseImg: {
    position: 'absolute',
    right: 15,
    width: 17,
    height: 17,
  },
  hallFlatListEmpty: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hallFlatListEmptyTxt: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#444444',
  },
});

function mapStateToProps(state) {
  return {
    hallType: state.hall.type,
    jobList: state.hall.jobList,
    job: state.hall.job,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // fetchHalljob: (pageNo, pageSize, labelStatus, typeId) =>
    //   dispatch(fetchHalljob(pageNo, pageSize, labelStatus, typeId)),
    // fetchHallType: () => dispatch(fetchHallType()),
    // fetchHalljobNext: (pageNo, pageSize, labelStatus, typeId) =>
    //   dispatch(fetchHalljobNext(pageNo, pageSize, labelStatus, typeId)),
    // clearList: () => dispatch(clearList()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HallScreen);
// export default HallScreen;
