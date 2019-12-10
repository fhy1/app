import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {getMoneyDetail} from '../../api/payDetail';

class PayDetailScreen extends React.Component {
  static navigationOptions = {
    title: '收支明细',
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
      payDetailList: [],
      payDetail: {},
    };
  }

  componentDidMount = () => {
    const {login} = this.props;
    const {pageNo, pageSize} = this.state;
    getMoneyDetail(login.userId, pageNo, pageSize).then(payDetail => {
      this.setState({
        payDetail: payDetail.data,
        payDetailList: payDetail.data.list,
      });
    });
  };

  fetchListNext = () => {
    const {payDetail, pageNo} = this.state;
    if (payDetail.pageNum < payDetail.pages) {
      this.setState(
        {
          pageNo: pageNo + 1,
        },
        () => {
          const {pageNo, pageSize, payDetailList} = this.state;
          fetchHalljob(login.userId, pageNo, pageSize).then(payDetail => {
            this.setState({
              payDetail: payDetail.data,
              payDetailList: payDetailList.concat(payDetail.data.list),
            });
          });
        },
      );
    }
  };

  render() {
    const {payDetail, payDetailList} = this.state;
    return (
      <View style={styles.payDetailView}>
        <FlatList
          style={styles.flatList}
          data={payDetailList}
          ListEmptyComponent={() => (
            <View style={styles.flatListLineEmpty}>
              <Text style={styles.flatListEmptyTxt}>暂无数据</Text>
            </View>
          )}
          refreshing={false}
          ListFooterComponent={() =>
            payDetailList.length > 0 ? (
              <View style={styles.flatListLineEmpty}>
                <Text style={styles.flatListEmptyTxt}>
                  {payDetail.pageNum == payDetail.pages
                    ? '没有更多了，亲'
                    : '正在加载中，请稍等~'}
                </Text>
              </View>
            ) : null
          }
          onEndReachedThreshold={0}
          onEndReached={this.fetchListNext}
          renderItem={({item, index, separators}) => (
            <View style={styles.payDetailList}>
              <View>
                <Text style={styles.payDetailTxt}>{item.introduce}</Text>
                {item.money > 0 ? (
                  <Text style={[styles.payDetailMoney, {color: '#FD2A2A'}]}>
                    +{item.money}
                  </Text>
                ) : (
                  <Text style={[styles.payDetailMoney, {color: '#1356D1'}]}>
                    {item.money}
                  </Text>
                )}
              </View>
              <View style={styles.payDetailNav}>
                <Text style={styles.payDetailTxt2}>{item.tradeTime}</Text>
                <Text style={styles.payDetailTxt3}>
                  {item.type == 2
                    ? '任务明细'
                    : item.type == 3
                    ? '充值明细'
                    : item.type == 4
                    ? '奖金明细'
                    : ''}
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
  payDetailView: {
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

  payDetailList: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    height: 70,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  payDetailTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444444',
    marginBottom: 8,
  },
  payDetailTxt2: {
    fontSize: 14,
    color: '#444444',
  },
  payDetailMoney: {
    position: 'absolute',
    right: 15,
  },
  payDetailTxt3: {
    position: 'absolute',
    right: 15,
    fontSize: 14,
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

export default connect(mapStateToProps, mapDispatchToProps)(PayDetailScreen);
