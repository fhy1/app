import React from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {fetchBlacklistUser} from '../../api/blacklist';

class blacklistScreen extends React.Component {
  static navigationOptions = {
    title: '小黑屋',
    headerStyle: {
      backgroundColor: '#FFDB44',
      borderBottomWidth: 0,
      shadowOpacity: 0,
    },
    headerTintColor: '#444444',
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    /// 注意：如果右边没有视图，那么添加一个空白视图即可
    headerRight: <View />,
  };

  constructor(props) {
    super(props);
    this.state = {
      labels: ['违规用户', '恢复时间', '违规原因'],
      pageNo: 1,
      pageSize: 15,
      blacklist: [],
      black: {},
    };
  }

  componentDidMount = () => {
    const {pageNo, pageSize} = this.state;
    fetchBlacklistUser(pageNo, pageSize).then(black => {
      this.setState({
        black: black.data,
        blacklist: black.data.list,
      });
    });
  };

  fetchListNext = () => {
    const {black} = this.state;
    if (black.pageNum < black.pages) {
      const {pageNo} = this.state;
      this.setState(
        {
          pageNo: pageNo + 1,
        },
        () => {
          const {pageNo, pageSize, blacklist} = this.state;
          fetchBlacklistUser(pageNo, pageSize).then(black => {
            this.setState({
              black: black.data,
              blacklist: blacklist.concat(black.data.list),
            });
          });
        },
      );
    }
  };

  render() {
    const {labels, black, blacklist} = this.state;
    console.log(('blacklistblacklist', blacklist));
    return (
      <View style={styles.blacklistView}>
        <View style={styles.blacklistTitleView}>
          <View style={styles.blacklistTitle}>
            {labels.map((item, index) => {
              return (
                <View style={styles.blacklistTitleText} key={index}>
                  <Text style={styles.blacklistTitleTextClick}>{item}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <FlatList
          style={styles.blacklistList}
          data={blacklist}
          ItemSeparatorComponent={() => (
            <View style={styles.blacklistListLine}>
              <View style={styles.blacklistListLinebg} />
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.blackListEmpty}>
              <Text style={styles.blackListEmptyTxt}>暂无数据</Text>
            </View>
          )}
          refreshing={false}
          ListFooterComponent={() =>
            blacklist.length > 0 ? (
              <View style={styles.blackListEmpty}>
                <Text style={styles.blackListEmptyTxt}>
                  {black.pageNum == black.pages
                    ? '没有更多了，亲'
                    : '正在加载中，请稍等~'}
                </Text>
              </View>
            ) : null
          }
          onEndReachedThreshold={1}
          onEndReached={this.fetchListNext}
          renderItem={({item, index, separators}) => (
            <View style={styles.blackList}>
              <View style={styles.blackListView}>
                <Text style={styles.blackListTxt}>
                  {item.nickname
                    ? item.nickname
                    : `${item.phone.substring(0, 3)}****${item.phone.substring(
                        item.phone.length - 4,
                      )}`}
                </Text>
              </View>
              {/* <View style={styles.blackListView}>
                <Text style={styles.blackListTxt}>永久禁言永久</Text>
              </View> */}
              <View style={styles.blackListView}>
                <Text style={styles.blackListTxt}>永久有效</Text>
              </View>
              <View style={styles.blackListView}>
                <View style={styles.blackListViewBox}>
                  <Text style={styles.blackListViewBoxtxt}>
                    {item.reason || ''}
                  </Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => JSON.stringify(item.userId)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  blacklistView: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  blacklistTitleView: {
    height: 40,
    backgroundColor: '#FFFFFF',
  },
  blacklistTitle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  blacklistTitleText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blacklistTitleTextClick: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'bold',
  },
  blacklistList: {
    marginTop: 10,
  },
  blacklistListLine: {
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFFFFF',
  },
  blacklistListLinebg: {
    height: 1,
    backgroundColor: '#DDDDDD',
  },
  blackList: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  blackListView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blackListTxt: {
    fontSize: 12,
    color: '#444444',
  },
  blackListViewBox: {
    width: 80,
    padding: 6,
    textAlign: 'justify',
    backgroundColor: '#F3F3F3',
  },
  blackListViewBoxtxt: {
    fontSize: 10,
    lineHeight: 15,
    color: '#444444',
  },
  blackListEmpty: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackListEmptyTxt: {
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

export default connect(mapStateToProps, mapDispatchToProps)(blacklistScreen);
// export default blacklistScreen;
