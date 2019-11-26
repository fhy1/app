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

class SearchScreen extends React.Component {
  static navigationOptions = {
    title: '搜索任务',
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
    /// 注意：如果右边没有视图，那么添加一个空白视图即可
    headerRight: <View />,
  };

  constructor(props) {
    super(props);
    this.state = {
      search: {},
      searchList: [],
      searchFlag: false,
    };
  }

  componentDidMount = () => {};

  handelOnSerchHall = () => {
    this.setState({
      searchFlag: true,
    });
  };

  render() {
    const {navigation} = this.props;
    const {search, searchList, searchFlag} = this.state;
    return (
      <View style={styles.searchView}>
        <View style={styles.titleSearch}>
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
          <TouchableOpacity onPress={this.handelOnSerchHall}>
            <View style={styles.navSearchBtn}>
              <Text>搜索</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.searchLine}>
          <View style={styles.searchLineCenter} />
        </View>
        <FlatList
          style={styles.searchFlatList}
          data={searchList}
          ItemSeparatorComponent={() => (
            <View style={styles.searchFlatListLine} />
          )}
          ListEmptyComponent={() => (
            <View style={styles.searchListEmpty}>
              <Text style={styles.searchListEmptyTxt}>
                {searchFlag ? '未查到您输入的任务' : ''}
              </Text>
            </View>
          )}
          refreshing={false}
          ListFooterComponent={() =>
            searchList.length > 0 ? (
              <View style={styles.searchListEmpty}>
                <Text style={styles.searchListEmptyTxt}>
                  {search.pageNum == search.pages
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
              <View style={styles.searchList}>
                <View style={styles.searchListIcon}>
                  {item.headimgurl ? (
                    <Image
                      style={styles.searchListIconImg}
                      // @ts-ignore
                      source={{uri: paramToQuery2(item.headimgurl)}}
                    />
                  ) : (
                    <Image
                      style={styles.searchListIconImg}
                      // @ts-ignore
                      source={require('../../assets/head.png')}
                    />
                  )}
                </View>
                <View style={styles.searchListBody}>
                  <View>
                    <Text style={styles.searchListBodyText}>
                      {item.jobTitle}
                    </Text>
                  </View>
                  <View style={styles.searchListBodyView}>
                    <View style={styles.searchListBodybtn1}>
                      <View style={styles.searchListBodybtn}>
                        <Text>{item.jobSource}</Text>
                      </View>
                    </View>
                    <View style={styles.searchListBodybtn2}>
                      <View style={styles.searchListBodybtn}>
                        <Text>{item.typeName}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.searchListRight}>
                  <View style={styles.searchListRightBody}>
                    <View>
                      <Text style={styles.searchListRightTop}>
                        赏{item.releasePrice}元
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.searchListRightBottom}>
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
  searchView: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  titleSearch: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
    flexDirection: 'row',
  },
  searchLine: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  searchLineCenter: {
    height: 1,
    backgroundColor: '#DDDDDD',
  },
  navSearch: {
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    paddingLeft: 10.5,
    paddingRight: 10.5,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  navSearchImg: {
    width: 21,
    marginRight: 5,
  },
  navSearchTextInput: {
    flex: 1,
  },
  navSearchBtn: {
    width: 90,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFDB44',
    marginLeft: 10,
    borderRadius: 4,
  },
  searchList: {
    height: 68,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  searchListIcon: {
    width: 36,
    height: '100%',
    alignItems: 'center',
  },
  searchListIconImg: {
    width: 36,
    height: 36,
    marginTop: 16,
  },
  searchListBody: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  searchListBodyView: {
    flexDirection: 'row',
    marginTop: 6,
  },
  searchListBodyText: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'bold',
  },
  searchListBodybtn1: {
    width: 60,
    height: 22,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  searchListBodybtn2: {
    width: 72,
    height: 22,
    borderRadius: 4,
    overflow: 'hidden',
  },
  searchListBodybtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDB44',
  },
  searchListRight: {
    width: 80,
    height: '100%',
  },
  searchListRightBody: {
    flex: 1,
    justifyContent: 'center',
  },
  searchListRightTop: {
    fontSize: 14,
    color: '#FD3F3F',
  },
  searchListRightBottom: {
    marginTop: 8,
    fontSize: 12,
    color: '#666666',
  },
  searchFlatList: {
    backgroundColor: '#F3F3F3',
  },
  searchFlatListLine: {
    height: 10,
    backgroundColor: '#F3F3F3',
  },
  searchListEmpty: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchListEmptyTxt: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#444444',
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);