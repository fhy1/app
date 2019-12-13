import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchFoot} from '../../api/foot';
import {WToast} from 'react-native-smart-tip';
import {paramToQuery2} from '../../utils/fetch';

class footScreen extends React.Component {
  static navigationOptions = {
    title: '浏览历史',
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
    this.state = {
      foot: {},
      footList: [],
      page: 1,
      size: 15,
    };
  }

  componentDidMount = () => {
    const {login} = this.props;
    console.log(login);
    let data = {
      userId: login.userId,
      page: 1,
      size: 15,
    };
    fetchFoot(data).then(foot => {
      this.setState({
        foot: foot.data,
        footList: foot.data.list,
      });
    });
  };

  handelOnJumpToDetail = jobId => {
    const {navigation, login} = this.props;
    if (login) {
      navigation.navigate('HallDetail', {
        jobId: jobId,
      });
    } else {
      navigation.navigate('Login');
    }
  };

  fetchListNext = () => {
    const {login} = this.props;
    const {foot} = this.state;
    if (foot.pageNum < foot.pages) {
      const {page} = this.state;
      this.setState(
        {
          page: page + 1,
        },
        () => {
          const {page, size, footList} = this.state;
          let data = {
            userId: login.userId,
            page: page,
            size: size,
          };
          fetchFoot(data).then(foot => {
            this.setState({
              foot: foot.data,
              footList: footList.concat(foot.data.list),
            });
          });
        },
      );
    }
  };

  render() {
    const {navigation} = this.props;
    const {foot, footList} = this.state;
    return (
      <View style={styles.footView}>
        <FlatList
          style={styles.footFlatList}
          data={footList}
          ItemSeparatorComponent={() => (
            <View style={styles.footFlatListLine} />
          )}
          ListEmptyComponent={() => (
            <View style={styles.footListEmpty}>
              <Text style={styles.footListEmptyTxt}>暂无记录</Text>
            </View>
          )}
          refreshing={false}
          ListFooterComponent={() =>
            footList.length > 0 ? (
              <View style={styles.footListEmpty}>
                <Text style={styles.footListEmptyTxt}>
                  {foot.pageNum == foot.pages
                    ? '没有更多了，亲'
                    : '正在加载中，请稍等~'}
                </Text>
              </View>
            ) : null
          }
          onEndReachedThreshold={1}
          onEndReached={this.fetchListNext}
          renderItem={({item, index, separators}) => (
            <TouchableOpacity
              onPress={this.handelOnJumpToDetail.bind(this, item.jobId)}>
              <View style={styles.footList}>
                <View style={styles.footListIcon}>
                  {item.headimgurl ? (
                    <Image
                      style={styles.footListIconImg}
                      // @ts-ignore
                      source={{uri: item.headimgurl}}
                    />
                  ) : (
                    <Image
                      style={styles.footListIconImg}
                      // @ts-ignore
                      source={require('../../assets/head.png')}
                    />
                  )}
                </View>
                <View style={styles.footListBody}>
                  <View>
                    <Text style={styles.footListBodyText}>{item.jobTitle}</Text>
                  </View>
                  <View style={styles.footListBodyView}>
                    <View style={styles.footListBodybtn1}>
                      <View style={styles.footListBodybtn}>
                        <Text style={styles.footListBodybtnTxt}>
                          {item.jobSource}
                        </Text>
                      </View>
                    </View>
                    {/* <View style={styles.footListBodybtn2}>
                      <View style={styles.footListBodybtn}>
                        <Text style={styles.footListBodybtnTxt}>
                          {item.typeName}
                        </Text>
                      </View>
                    </View> */}
                  </View>
                </View>
                <View style={styles.footListRight}>
                  <View style={styles.footListRightBody}>
                    <View>
                      <Text style={styles.footListRightTop}>
                        赏{item.releasePrice}元
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.footListRightBottom}>
                        剩余{item.surplusNum}份
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => JSON.stringify(index)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footView: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    paddingTop: 15,
  },
  titlefoot: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
    flexDirection: 'row',
  },
  footLine: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  footLineCenter: {
    height: 1,
    backgroundColor: '#DDDDDD',
  },
  navfoot: {
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    paddingLeft: 10.5,
    paddingRight: 10.5,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  navfootImg: {
    width: 21,
    marginRight: 5,
  },
  navfootTextInput: {
    flex: 1,
  },
  navfootBtn: {
    width: 90,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFDB44',
    marginLeft: 10,
    borderRadius: 4,
  },
  footList: {
    height: 68,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 4,
  },
  footListIcon: {
    width: 36,
    height: '100%',
    alignItems: 'center',
  },
  footListIconImg: {
    width: 36,
    height: 36,
    marginTop: 16,
  },
  footListBody: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  footListBodyView: {
    flexDirection: 'row',
    marginTop: 6,
  },
  footListBodyText: {
    fontSize: 16,
    color: '#444444',
    fontWeight: 'bold',
  },
  footListBodybtn1: {
    minWidth: 60,
    height: 22,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  footListBodybtn2: {
    width: 72,
    height: 22,
    borderRadius: 4,
    overflow: 'hidden',
  },
  footListBodybtn: {
    paddingLeft: 8,
    paddingRight: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDB44',
  },
  footListBodybtnTxt: {
    color: '#444444',
    fontSize: 12,
  },
  footListRight: {
    width: 80,
    height: '100%',
  },
  footListRightBody: {
    flex: 1,
    justifyContent: 'center',
  },
  footListRightTop: {
    fontSize: 14,
    color: '#FD3F3F',
  },
  footListRightBottom: {
    marginTop: 8,
    fontSize: 12,
    color: '#666666',
  },
  footFlatList: {
    backgroundColor: '#F3F3F3',
    paddingLeft: 15,
    paddingRight: 15,
  },
  footFlatListLine: {
    height: 10,
    backgroundColor: '#F3F3F3',
  },
  footListEmpty: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footListEmptyTxt: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#444444',
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

export default connect(mapStateToProps, mapDispatchToProps)(footScreen);
