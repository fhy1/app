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
import {allFollow, delFollow} from '../../api/invite';
import {fetchInviteAll} from '../../api/invite';
import {WToast} from 'react-native-smart-tip';

class FollowScreen extends React.Component {
  static navigationOptions = {
    title: '推广详情',
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
      inviteList: [],
      invite: {},
      flag: true,
    };
  }

  componentDidMount = () => {
    const {login} = this.props;
    const {pageNo, pageSize} = this.state;
    fetchInviteAll(login.userId, pageNo, pageSize).then(invite => {
      this.setState({
        invite: invite.data,
        inviteList: invite.data.list,
      });
    });
  };

  fetchListNext = () => {
    const {invite, pageNo, flag} = this.state;
    const {login} = this.props;
    if (invite.pageNum < invite.pages && flag) {
      this.setState(
        {
          pageNo: pageNo + 1,
          flag: false,
        },
        () => {
          const {pageNo, pageSize, inviteList} = this.state;
          fetchHalljob(login.userId, pageNo, pageSize).then(
            invite => {
              this.setState({
                invite: invite.data,
                inviteList: inviteList.concat(invite.data.list),
                flag: true,
              });
            },
            () => {
              this.setState({flag: false});
            },
          );
        },
      );
    }
  };

  render() {
    const {invite, inviteList} = this.state;
    return (
      <View style={styles.inviteView}>
        <FlatList
          style={styles.flatList}
          data={inviteList}
          ListEmptyComponent={() => (
            <View style={styles.flatListLineEmpty}>
              <Text style={styles.flatListEmptyTxt}>暂无数据</Text>
            </View>
          )}
          refreshing={false}
          ListFooterComponent={() =>
            inviteList.length > 0 ? (
              <View style={styles.flatListLineEmpty}>
                <Text style={styles.flatListEmptyTxt}>
                  {invite.pageNum == invite.pages
                    ? '没有更多了，亲'
                    : '正在加载中，请稍等~'}
                </Text>
              </View>
            ) : null
          }
          onEndReachedThreshold={1}
          onEndReached={this.fetchListNext}
          renderItem={({item, index, separators}) => (
            <View style={styles.inviteList}>
              <TouchableOpacity>
                <View style={styles.inviteListView}>
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
              <View
                style={{
                  position: 'absolute',
                  right: 15,
                  width: 180,
                  height: 25,
                  justifyContent: 'center',
                  marginLeft: 5,
                  textAlign: 'right',
                }}>
                <Text style={{color: '#666666', textAlign: 'right'}}>
                  {item.inviteTime}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => JSON.stringify(index)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inviteView: {
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

  inviteList: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    height: 70,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  inviteListView: {
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
