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
import {fetchUserReport, fetchUserReportAudit} from '../../api/report';
import {paramToQuery2} from '../../utils/fetch';

class ReportScreen extends React.Component {
  static navigationOptions = {
    title: '举报维权',
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
      labels: [
        {title: '举报中', id: 1},
        {title: '已回复', id: 2},
        {title: '已提交', id: 3},
        {title: '已审核', id: 4},
      ],
      labelStatus: 1,
      report: {},
      reportList: [],
      page: 1,
      size: 15,
    };
  }

  componentDidMount = () => {
    const {labelStatus, page, size} = this.state;
    const {login} = this.props;
    fetchUserReport(login.userId, labelStatus, page, size).then(report => {
      this.setState({
        report: report.data,
        reportList: report.data.list,
      });
    });
  };

  onHandelPress = index => {
    const {login} = this.props;
    this.setState({
      labelStatus: index,
      pageNo: 1,
      pageSize: 15,
    });
    if (index != 4) {
      fetchUserReport(login.userId, index, 1, 15).then(report => {
        this.setState({
          report: report.data,
          reportList: report.data.list,
        });
      });
    } else {
      fetchUserReportAudit(login.userId, 1, 15).then(report => {
        this.setState({
          report: report.data,
          reportList: report.data.list,
        });
      });
    }
  };

  fetchListNext = () => {
    const {report} = this.state;
    const {login} = this.props;
    if (report.pageNum < report.pages) {
      const {page} = this.state;
      this.setState(
        {
          page: page + 1,
        },
        () => {
          const {page, size, reportList, labelStatus} = this.state;
          if (labelStatus != 4) {
            fetchUserReport(login.userId, labelStatus, page, size).then(
              report => {
                this.setState({
                  report: report.data,
                  reportList: reportList.concat(report.data.list),
                });
              },
            );
          } else {
            fetchUserReportAudit(login.userId, 1, 15).then(report => {
              this.setState({
                report: report.data,
                reportList: report.data.list,
              });
            });
          }
        },
      );
    }
  };

  render() {
    const {labels, labelStatus, reportList, report} = this.state;
    return (
      <View style={styles.reportView}>
        <View style={styles.reportTitleView}>
          <View style={styles.reportTitle}>
            {labels.map(item => {
              return item.id == labelStatus ? (
                <View
                  style={[styles.reportTitleText, styles.reportTitleClick]}
                  key={item.id}>
                  <Text style={styles.reportTitleTextClick}>{item.title}</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.reportTitleTextTouch}
                  key={item.id}
                  onPress={this.onHandelPress.bind(this, item.id)}>
                  <View
                    style={styles.reportTitleText}
                    onResponderGrant={this.onHandelPress}>
                    <Text style={styles.reportTitleTextNormal}>
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <FlatList
          style={styles.reportFlatList}
          data={reportList}
          ItemSeparatorComponent={() => (
            <View style={styles.reportFlatListLine} />
          )}
          ListEmptyComponent={() => (
            <View style={styles.taskFlatListEmpty}>
              <Text style={styles.taskFlatListEmptyTxt}>暂无数据</Text>
            </View>
          )}
          refreshing={false}
          ListFooterComponent={() =>
            reportList.length > 0 ? (
              <View style={styles.taskFlatListEmpty}>
                <Text style={styles.taskFlatListEmptyTxt}>
                  {report.pageNum == report.pages
                    ? '没有更多了，亲'
                    : '正在加载中，请稍等~'}
                </Text>
              </View>
            ) : null
          }
          onEndReachedThreshold={0}
          onEndReached={this.fetchListNext}
          renderItem={({item, index, separators}) => (
            <View style={styles.reportList}>
              <View style={styles.reportListTitle}>
                <Text style={styles.reportListTitleTxt}>{item.jobTitle}</Text>
                {/* <Text style={styles.reportListTitleMoney}>赏2.25元</Text> */}
              </View>
              <View style={styles.reportListNav}>
                <Text style={styles.reportListNavTxt}>
                  发布时间： {item.reportTime}
                </Text>
                {/* <Text
                  style={[styles.reportListNavTxt, styles.reportListNavRight]}>
                  剩余100份
                </Text> */}
              </View>
              <View style={styles.reportListBtnView}>
                <View style={styles.reportListBtn}>
                  <Text style={styles.reportListBtnTxt}>{item.jobSource}</Text>
                </View>
              </View>
              <View style={styles.reportListLine}></View>
              <View style={styles.applyListLine}></View>
              <View>
                <Text style={styles.applyNoPassTxt}>
                  举报原因: {item.reportReason}
                </Text>
                {item.reportImg ? (
                  <View style={styles.applyListButton}>
                    <Text style={styles.applyNoPassTxt}>举报图片:</Text>
                    <Image
                      style={{width: 100, height: 100}}
                      source={{uri: paramToQuery2(item.reportImg)}}
                    />
                  </View>
                ) : null}
              </View>
              {/* <View>
                <Text>举报结果：通过</Text>
              </View> */}
            </View>
          )}
          keyExtractor={(item, index) => JSON.stringify(index)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  reportView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  reportTitleView: {
    height: 40,
  },
  reportTitle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
  },
  reportTitleText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666666',
    fontSize: 14,
    fontWeight: 'normal',
  },
  reportTitleClick: {
    borderBottomColor: '#FD3F3F',
    borderBottomWidth: 1,
  },
  reportTitleTextTouch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportTitleTextClick: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'bold',
  },
  reportTitleTextNormal: {
    fontSize: 14,
    color: '#666666',
    fontWeight: 'normal',
  },
  reportFlatList: {
    backgroundColor: '#F3F3F3',
  },
  reportFlatListLine: {
    height: 10,
    backgroundColor: '#F3F3F3',
  },
  reportList: {
    backgroundColor: '#FFFFFF',
    paddingLeft: 15,
    paddingRight: 15,
  },
  reportListTitle: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12,
  },
  reportListNav: {
    flexDirection: 'row',
  },
  reportListBtnView: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  reportListTitleTxt: {
    color: '#444444',
    fontSize: 14,
    fontWeight: 'bold',
  },
  reportListTitleMoney: {
    position: 'absolute',
    right: 0,
    top: 12,
    fontSize: 14,
    color: '#FD3F3F',
  },
  reportListNavTxt: {
    color: '#666666',
    fontSize: 12,
  },
  reportListNavRight: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  reportListBtn: {
    paddingLeft: 12,
    paddingRight: 12,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#FFDB44',
    marginRight: 10,
  },
  reportListBtnTxt: {
    fontSize: 12,
    color: '#444444',
    fontWeight: 'normal',
  },
  reportListLine: {
    height: 0.5,
    backgroundColor: '#DDDDDD',
  },
  taskFlatListEmpty: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskFlatListEmptyTxt: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#444444',
  },

  applyListLine: {
    height: 0.5,
    backgroundColor: '#DDDDDD',
  },
  applyListButton: {
    // flexDirection: 'row',
  },
  applyNoPassTxt: {
    paddingTop: 10.5,
    paddingBottom: 10.5,
    color: '#444444',
    fontSize: 12,
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

export default connect(mapStateToProps, mapDispatchToProps)(ReportScreen);
