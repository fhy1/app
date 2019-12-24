import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {allFollow, delFollow} from '../../api/follow';
import {WToast} from 'react-native-smart-tip';
import {TabRouter} from 'react-navigation';

class FollowScreen extends React.Component {
  static navigationOptions = {
    title: '我的关注',
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
      pageNo: 1,
      pageSize: 15,
      followList: [],
      follow: {},
    };
  }

  componentDidMount = () => {
    const {login} = this.props;
    const {pageNo, pageSize} = this.state;
    allFollow(login.userId, pageNo, pageSize).then(follow => {
      console.log(follow);
      this.setState({
        follow: follow.data,
        followList: follow.data.list,
      });
    });
  };

  fetchListNext = () => {
    const {follow, pageNo} = this.state;
    if (follow.pageNum < follow.pages) {
      this.setState(
        {
          pageNo: pageNo + 1,
        },
        () => {
          const {pageNo, pageSize, followList} = this.state;
          fetchHalljob(login.userId, pageNo, pageSize).then(follow => {
            this.setState({
              follow: follow.data,
              followList: followList.concat(follow.data.list),
            });
          });
        },
      );
    }
  };

  deleteFloow = (userId, index) => {
    const {login} = this.props;
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    delFollow(login.userId, userId).then(() => {
      toastOpts.data = '取关成功';
      WToast.show(toastOpts);
      this.setState(state => {
        state.followList.splice(index, 1);
        return {
          followList: state.followList,
        };
      });
    });
  };

  gotoFllowDetail = userId => {
    const {navigation} = this.props;
    console.log(userId);
    navigation.navigate('FollowTask', {
      id: userId,
    });
  };

  render() {
    const {follow, followList} = this.state;
    return (
      <View style={styles.followView}>
        <FlatList
          style={styles.flatList}
          data={followList}
          ListEmptyComponent={() => (
            <View style={styles.flatListLineEmpty}>
              <Text style={styles.flatListEmptyTxt}>暂无数据</Text>
            </View>
          )}
          refreshing={false}
          ListFooterComponent={() =>
            followList.length > 0 ? (
              <View style={styles.flatListLineEmpty}>
                <Text style={styles.flatListEmptyTxt}>
                  {follow.pageNum == follow.pages
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
              onPress={this.gotoFllowDetail.bind(this, item.userId)}>
              <View style={styles.followList}>
                <TouchableOpacity>
                  <View style={styles.followListView}>
                    <Image
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        marginRight: 15,
                      }}
                      source={{uri: item.headimgurl}}
                    />
                    <Text style={{color: '#444444'}}>{item.nickName}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.deleteFloow.bind(this, item.userId, index)}
                  style={{
                    position: 'absolute',
                    right: 15,
                  }}>
                  <View
                    style={{
                      width: 80,
                      height: 25,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderColor: '#FFDB44',
                      borderWidth: 1,
                      borderRadius: 2,
                      marginLeft: 5,
                    }}>
                    <Text style={{color: '#666666'}}>取消关注</Text>
                  </View>
                </TouchableOpacity>
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
  followView: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    paddingTop: 15,
  },
  flatListLine: {
    height: 1,
    backgroundColor: '#DDDDDD',
  },
  flatListLineEmpty: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListEmptyTxt: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#444444',
  },

  flatList: {
    paddingLeft: 15,
    paddingRight: 15,
  },

  followList: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    height: 70,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  followListView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
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

export default connect(mapStateToProps, mapDispatchToProps)(FollowScreen);
