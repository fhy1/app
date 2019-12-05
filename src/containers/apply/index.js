import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchAudit} from '../../api/apply';

class ApplyScreen extends React.Component {
  static navigationOptions = {
    title: '审核任务',
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
      labels: [
        {title: '待审核', id: 2},
        {title: '审核通过', id: 3},
        {title: '审核拒绝', id: 4},
      ],
      labelStatus: 2,
      apply: {},
      applyList: [],
      pageNo: 1,
      pageSize: 15,
    };
  }
  componentDidMount = async () => {
    try {
      const {login} = this.props;
      const {pageNo, pageSize, labelStatus} = this.state;
      const data = await fetchAudit(pageNo, pageSize, login.userId);
      this.setState({
        applyList: data.data.list,
      });
    } catch (error) {}
  };

  onHandelPress = async index => {
    this.setState({
      labelStatus: index,
      pageNo: 1,
      pageSize: 15,
    });
    const {login} = this.props;
    const {pageNo, pageSize} = this.state;
    const data = await fetchRelease(pageNo, pageSize, index, login.userId).then(
      data => {
        this.setState({
          applyList: data.data.list,
        });
      },
    );
  };
  onFinish = () => {};
  render() {
    const {labels, labelStatus, apply, applyList} = this.state;
    return (
      <View style={styles.applyView}>
        <View style={styles.applyTitleView}>
          <View style={styles.applyTitle}>
            {labels.map(item => {
              return item.id == labelStatus ? (
                <View
                  style={[styles.applyTitleText, styles.applyTitleClick]}
                  key={item.id}>
                  <Text style={styles.applyTitleTextClick}>{item.title}</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.applyTitleTextTouch}
                  onPress={this.onHandelPress.bind(this, item.id)}
                  key={item.id}>
                  <View
                    style={styles.applyTitleText}
                    onResponderGrant={this.onHandelPress}>
                    <Text style={styles.applyTitleTextNormal}>
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <FlatList
          style={styles.applyFlatList}
          data={applyList}
          ItemSeparatorComponent={() => (
            <View style={styles.applyFlatListLine} />
          )}
          ListEmptyComponent={() => (
            <View style={styles.applyListEmpty}>
              <Text style={styles.applyListEmptyTxt}>暂无数据</Text>
            </View>
          )}
          refreshing={false}
          ListFooterComponent={() =>
            applyList.length > 0 ? (
              <View style={styles.applyListEmpty}>
                <Text style={styles.applyListEmptyTxt}>
                  {apply.pageNum == apply.pages
                    ? '没有更多了，亲'
                    : '正在加载中，请稍等~'}
                </Text>
              </View>
            ) : null
          }
          onEndReachedThreshold={1}
          onEndReached={this.fetchListNext}
          renderItem={({item, index, separators}) => (
            <View style={styles.applyList} key={item.id}>
              <View style={styles.applyListTitle}>
                <Text style={styles.applyListTitleTxt}>毛毛爱吃火腿</Text>
              </View>
              <View style={styles.applyListImg}></View>
              <View style={styles.applyListNav}>
                <Text style={styles.applyListNavTxt}>2019-11-10</Text>
              </View>
              <View style={styles.applyListLine}></View>
              <View style={styles.applyListButton}>
                <TouchableOpacity
                  style={styles.applyListButtonClick}
                  onPress={this.onFinish}>
                  <View>
                    <Text style={styles.applyListButtonTxt}>通过</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.applyListButtonLine}></View>

                <TouchableOpacity
                  style={styles.applyListButtonClick}
                  onPress={this.onGoToApply}>
                  <View>
                    <Text style={styles.applyListButtonTxt}>不通过</Text>
                  </View>
                </TouchableOpacity>
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
  applyView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  applyTitleView: {
    height: 40,
  },
  applyTitle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
  },
  applyTitleText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666666',
    fontSize: 14,
    fontWeight: 'normal',
  },
  applyTitleClick: {
    borderBottomColor: '#FD3F3F',
    borderBottomWidth: 1,
  },
  applyTitleTextTouch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyTitleTextClick: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'bold',
  },
  applyTitleTextNormal: {
    fontSize: 14,
    color: '#666666',
    fontWeight: 'normal',
  },
  applyFlatList: {
    backgroundColor: '#F3F3F3',
  },
  applyFlatListLine: {
    height: 10,
    backgroundColor: '#F3F3F3',
  },
  applyList: {
    backgroundColor: '#FFFFFF',
    paddingLeft: 15,
    paddingRight: 15,
  },
  applyListTitle: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12,
  },
  applyListNav: {
    flexDirection: 'row',
  },
  applyListTitleTxt: {
    color: '#444444',
    fontSize: 14,
    fontWeight: 'bold',
  },
  applyListImg: {
    flexDirection: 'row',
  },
  applyListNavTxt: {
    color: '#666666',
    fontSize: 12,
  },
  applyListLine: {
    height: 0.5,
    backgroundColor: '#DDDDDD',
  },
  applyListButton: {
    flexDirection: 'row',
  },
  applyListButtonLine: {
    width: 1,
    backgroundColor: '#DDDDDD',
  },
  applyListButtonClick: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12.5,
    paddingBottom: 12.5,
  },
  applyListButtonTxt: {
    color: '#444444',
    fontSize: 14,
    fontWeight: 'normal',
  },
  applyListEmpty: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyListEmptyTxt: {
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

export default connect(mapStateToProps, mapDispatchToProps)(ApplyScreen);
