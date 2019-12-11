import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import {WToast} from 'react-native-smart-tip';
import {fetchChartRecord, addChart} from '../../api/chart';

class ChartScreen extends React.Component {
  static navigationOptions = {
    title: '聊天窗口',
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
      chartTxt: '',
      chartList: [],
      refreshing: false,
      page: 1,
      size: 5,
    };
  }

  Time = null;

  componentDidMount = () => {
    const {login} = this.props;
    // const chartUserId = this.props.navigation.state.params.chartUserId;
    const chartUserId = 25;
    this.setState({
      chartUserId: chartUserId,
    });
    let data = {
      userId: login.userId,
      targetId: chartUserId,
      pageNo: 1,
      pageSize: 5,
    };
    this.fetchChart(data);
    this.Time = setInterval(() => {
      const {refreshing} = this.state;
      if (!refreshing) {
        this.fetchChart(data);
      }
      console.log(11);
    }, 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.Time);
  };

  fetchChart = data => {
    let {chartList} = this.state;
    fetchChartRecord(data).then(
      res => {
        if (res.data.list && res.data.list.length > 0) {
          if (
            chartList.length == 0 ||
            chartList[chartList.length - 1].chatTime !=
              res.data.list[0].chatTime
          ) {
            let newList = [];
            res.data.list.forEach(item => {
              newList.splice(0, 0, item);
            });
            this.setState({
              chartList: newList,
              page: res.data.pageNum,
            });
          }
        }
        // console.log(res);
        // this.setState({
        //   page: res.data.pageNum,
        //   chartList: res.data.list,
        // });
      },
      () => {},
    );
  };

  fetchHistoryChart = data => {
    let {chartList, page} = this.state;
    const {login} = this.props;
    page = ++page;
    console.log(page);
    this.setState(
      {
        page: page,
      },
      () => {
        const {page, size, chartUserId} = this.state;
        console.log(page);
        let data = {
          userId: login.userId,
          targetId: chartUserId,
          pageNo: page,
          pageSize: size,
        };
        fetchChartRecord(data).then(
          res => {
            res.data.list.forEach((item, index) => {
              chartList.splice(0, 0, item);
            });
            console.log(res);
            this.setState({
              page: res.data.pageNum,
              chartList: chartList,
              refreshing: false,
            });
          },
          () => {},
        );
      },
    );
  };

  handelOnSerchHall = () => {
    const {login} = this.props;
    const {chartUserId, chartTxt} = this.state;
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    console.log(chartTxt);
    if (chartTxt != '') {
      let data = {
        userId: login.userId,
        targetId: chartUserId,
        newsContent: chartTxt,
      };
      let data2 = {
        userId: login.userId,
        targetId: chartUserId,
        pageNo: 1,
        pageSize: 5,
      };
      addChart(data).then(() => {
        this.setState({
          chartTxt: '',
        });
        this.fetchChart(data2);
      });
    } else {
      toastOpts.data = '请输入聊天内容';
      WToast.show(toastOpts);
    }
  };

  onChangeSearchTxt = e => {
    this.setState({
      chartTxt: e,
    });
  };
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchHistoryChart();
  };
  render() {
    const {chartTxt, chartList} = this.state;
    const {login} = this.props;
    return (
      <View style={styles.chartView}>
        <FlatList
          style={styles.flatList}
          data={chartList}
          // refreshing={refreshing}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          renderItem={({item, index, separators}) => (
            <View style={{flex: 1, marginBottom: 10}}>
              {item.sendId == login.userId ? (
                <View style={styles.listRight}>
                  <View style={styles.listRightChart}>
                    <Text style={styles.listRightChartView}>
                      {item.content}
                    </Text>
                  </View>
                  <View style={styles.listRightImg}>
                    <Image
                      style={styles.listRightImage}
                      source={{uri: item.sendImg}}
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.listLeft}>
                  <View style={styles.listLeftImg}>
                    <Image
                      style={styles.listLeftImage}
                      source={{uri: item.sendImg}}
                    />
                  </View>
                  <View style={styles.listLeftChart}>
                    <Text style={styles.listLeftChartTxt}>{item.content}</Text>
                  </View>
                </View>
              )}
            </View>
          )}
          keyExtractor={(item, index) => JSON.stringify(index)}
        />
        <View style={styles.bottomView}>
          <View style={styles.navSearch}>
            <TextInput
              style={styles.navSearchTextInput}
              value={chartTxt}
              onChangeText={this.onChangeSearchTxt}
              multiline={true}
            />
          </View>
          <TouchableOpacity onPress={this.handelOnSerchHall}>
            <View style={styles.navSearchBtn}>
              <Text>发 送</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chartView: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  bottomView: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  navSearch: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    borderRadius: 5,
    overflow: 'hidden',
  },
  navSearchTextInput: {
    maxHeight: 150,
    backgroundColor: '#F3F3F3',
    textAlignVertical: 'top',
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

  flatList: {
    padding: 15,
  },

  flatListEmpty: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListEmptyTxt: {
    fontWeight: 'normal',
    fontSize: 12,
    color: '#666666',
  },

  listLeft: {
    flexDirection: 'row',
    paddingRight: 15,
  },
  listLeftImg: {paddingRight: 15},
  listLeftImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  listLeftChart: {
    minHeight: 36,
    backgroundColor: '#FFFFFF',
    paddingLeft: 10,
    paddingRight: 20,
    borderRadius: 4,
  },
  listLeftChartTxt: {
    flex: 1,
    paddingRight: 15,
    paddingTop: 6,
    paddingBottom: 8,
    lineHeight: 20,
    fontSize: 14,
    color: '#444444',
    paddingRight: 25,
  },

  listRight: {
    flexDirection: 'row',
    // paddingRight: 15,
  },
  listRightImg: {paddingLeft: 15},
  listRightImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  listRightChart: {
    flex: 1,
    // minHeight: 36,
    // backgroundColor: '#FFFFFF',
    // paddingLeft: 10,
    // paddingRight: 20,
    alignItems: 'flex-end',
  },
  listRightChartView: {
    backgroundColor: '#6EB5FE',
    minHeight: 36,
    alignItems: 'flex-end',
    justifyContent: 'center',
    color: '#FFFFFF',
    paddingTop: 6,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 8,
    borderRadius: 4,
    lineHeight: 20,
  },
  listRightChartTxt: {
    flex: 1,
    paddingRight: 15,
    lineHeight: 36,
    fontSize: 14,
    color: '#444444',
    paddingRight: 25,
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

export default connect(mapStateToProps, mapDispatchToProps)(ChartScreen);
