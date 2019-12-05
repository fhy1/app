import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {
  fetchJobRelease,
  fetchReleaseEnd,
  editReleaseEnd,
} from '../../api/release';
import {WToast} from 'react-native-smart-tip';

class ReleaseScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: '管理任务',
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
        {title: '进行中', id: 3},
        {title: '待审核', id: 2},
        {title: '已结束', id: 5},
        {title: '审核拒绝', id: 4},
      ],
      labelStatus: 3,
      pageNo: 1,
      pageSize: 15,
      release: {},
      releaseList: [],
    };
  }

  componentDidMount = () => {
    const {login} = this.props;
    const {labelStatus, pageNo, pageSize} = this.state;

    this.props.navigation.setParams({goToclick: this.goToclick});
    fetchJobRelease(login.userId, labelStatus, pageNo, pageSize).then(
      release => {
        this.setState({
          release: release.data,
          releaseList: release.data.list,
        });
      },
      () => {},
    );
  };

  goToclick = () => {
    const {navigation} = this.props;
    navigation.navigate('ReleaseTask');
  };

  onHandelPress = id => {
    const {login} = this.props;
    this.setState({
      labelStatus: id,
      pageNo: 1,
      pageSize: 15,
    });
    if (id == 5) {
      fetchReleaseEnd(login.userId, 1, 15).then(release => {
        console.log(release);
        this.setState({
          release: release.data,
          releaseList: release.data.list,
        });
      });
    } else {
      fetchJobRelease(login.userId, id, 1, 15).then(release => {
        console.log(release);
        this.setState({
          release: release.data,
          releaseList: release.data.list,
        });
      });
    }
  };

  onSuspend = (jobStatus, jobId, index) => {
    const status = jobStatus == 1 ? 3 : 1;
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    editReleaseEnd(jobId, status).then(
      () => {
        this.setState(state => {
          state.releaseList[index].jobStatus = status;
          toastOpts.data = jobStatus == 1 ? '暂停成功' : '开启成功';
          WToast.show(toastOpts);
          return {
            releaseList: state.releaseList,
          };
        });
      },
      () => {
        toastOpts.data = jobStatus == 1 ? '暂停失败' : '开启失败';
        WToast.show(toastOpts);
      },
    );
  };

  onFinish = (jobId, index) => {
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    editReleaseEnd(jobId, 2).then(
      () => {
        this.setState(state => {
          state.releaseList.splice(index, 1);
          toastOpts.data = '结束成功';
          WToast.show(toastOpts);
          return {
            releaseList: state.releaseList,
          };
        });
      },
      () => {
        toastOpts.data = '结束失败';
        WToast.show(toastOpts);
      },
    );
  };

  onGoToApply = () => {
    const {navigation} = this.props;
    navigation.navigate('Apply');
  };

  fetchListNext = () => {
    const {release} = this.state;
    const {login} = this.props;
    if (release.pageNum < release.pages) {
      console.log(111);
      const {pageNo} = this.state;
      this.setState(
        {
          pageNo: pageNo + 1,
        },
        () => {
          const {pageNo, pageSize, labelStatus, releaseList} = this.state;
          if (labelStatus == 5) {
            fetchReleaseEnd(login.userId, 1, 15).then(release => {
              console.log(release);
              this.setState({
                release: release.data,
                releaseList: release.data.list,
              });
            });
          } else {
            fetchJobRelease(login.userId, labelStatus, pageNo, pageSize).then(
              release => {
                this.setState({
                  release: release.data,
                  releaseList: releaseList.concat(release.data.list),
                });
              },
            );
          }
        },
      );
    }
  };

  render() {
    const {labels, labelStatus, release, releaseList} = this.state;
    console.log(releaseList);
    return (
      <View style={styles.releaseView}>
        <View style={styles.releaseTitleView}>
          <View style={styles.releaseTitle}>
            {labels.map(item => {
              return item.id == labelStatus ? (
                <View
                  style={[styles.releaseTitleText, styles.releaseTitleClick]}
                  key={item.id}>
                  <Text style={styles.releaseTitleTextClick}>{item.title}</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.releaseTitleTextTouch}
                  onPress={this.onHandelPress.bind(this, item.id)}
                  key={item.id}>
                  <View
                    style={styles.releaseTitleText}
                    onResponderGrant={this.onHandelPress}>
                    <Text style={styles.releaseTitleTextNormal}>
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <FlatList
          style={styles.releaseFlatList}
          data={releaseList}
          ItemSeparatorComponent={() => (
            <View style={styles.releaseFlatListLine} />
          )}
          ListEmptyComponent={() => (
            <View style={styles.releaseFlatListEmpty}>
              <Text style={styles.releaseFlatListEmptyTxt}>暂无数据</Text>
            </View>
          )}
          refreshing={false}
          ListFooterComponent={() =>
            releaseList.length > 0 ? (
              <View style={styles.releaseFlatListEmpty}>
                <Text style={styles.releaseFlatListEmptyTxt}>
                  {release.pageNum == release.pages
                    ? '没有更多了，亲'
                    : '正在加载中，请稍等~'}
                </Text>
              </View>
            ) : null
          }
          onEndReachedThreshold={0}
          onEndReached={this.fetchListNext}
          renderItem={({item, index, separators}) => (
            <View style={styles.releaseList} key={item.id}>
              <View style={styles.releaseListTitle}>
                <Text style={styles.releaseListTitleTxt}>{item.jobTitle}</Text>
                <Text style={styles.releaseListTitleMoney}>
                  赏{item.releasePrice}元
                </Text>
              </View>
              <View style={styles.releaseListNav}>
                <Text style={styles.releaseListNavTxt}>
                  发布时间： {item.submissionTime || ''}
                </Text>
                <Text
                  style={[
                    styles.releaseListNavTxt,
                    styles.releaseListNavRight,
                  ]}>
                  剩余{item.surplusNum}份
                </Text>
              </View>
              <View style={styles.releaseListBtnView}>
                <View style={styles.releaseListBtn}>
                  <Text style={styles.releaseListBtnTxt}>{item.jobSource}</Text>
                </View>
                <View style={styles.releaseListBtn}>
                  <Text style={styles.releaseListBtnTxt}>{item.typeName}</Text>
                </View>
              </View>
              {labelStatus == 3 ? (
                <>
                  <View style={styles.releaseListLine}></View>
                  <View style={styles.releaseListButton}>
                    <TouchableOpacity
                      style={styles.releaseListButtonClick}
                      onPress={this.onSuspend.bind(
                        this,
                        item.jobStatus,
                        item.jobId,
                        index,
                      )}>
                      <View>
                        <Text style={styles.releaseListButtonTxt}>
                          {item.jobStatus == 1 ? '暂停任务' : '开始任务'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.releaseListButtonLine}></View>
                    <TouchableOpacity
                      style={styles.releaseListButtonClick}
                      onPress={this.onFinish.bind(this, item.jobId, index)}>
                      <View>
                        <Text style={styles.releaseListButtonTxt}>
                          结束任务
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.releaseListButtonLine}></View>

                    <TouchableOpacity
                      style={styles.releaseListButtonClick}
                      onPress={this.onGoToApply}>
                      <View>
                        <Text style={styles.releaseListButtonTxt}>去审核</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              ) : null}
            </View>
          )}
          keyExtractor={item => JSON.stringify(item.jobId)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  releaseView: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  releaseTitleView: {
    height: 40,
  },
  releaseTitle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
  },
  releaseTitleText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666666',
    fontSize: 14,
    fontWeight: 'normal',
  },
  releaseTitleClick: {
    borderBottomColor: '#FD3F3F',
    borderBottomWidth: 1,
  },
  releaseTitleTextTouch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  releaseTitleTextClick: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'bold',
  },
  releaseTitleTextNormal: {
    fontSize: 14,
    color: '#666666',
    fontWeight: 'normal',
  },
  releaseFlatList: {
    backgroundColor: '#F3F3F3',
  },
  releaseFlatListLine: {
    height: 10,
    backgroundColor: '#F3F3F3',
  },
  releaseList: {
    backgroundColor: '#FFFFFF',
    paddingLeft: 15,
    paddingRight: 15,
  },
  releaseListTitle: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12,
  },
  releaseListNav: {
    flexDirection: 'row',
  },
  releaseListBtnView: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  releaseListTitleTxt: {
    color: '#444444',
    fontSize: 14,
    fontWeight: 'bold',
  },
  releaseListTitleMoney: {
    position: 'absolute',
    right: 0,
    top: 12,
    fontSize: 14,
    color: '#FD3F3F',
  },
  releaseListNavTxt: {
    color: '#666666',
    fontSize: 12,
  },
  releaseListNavRight: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  releaseListBtn: {
    paddingLeft: 12,
    paddingRight: 12,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#FFDB44',
    marginRight: 10,
  },
  releaseListBtnTxt: {
    fontSize: 12,
    color: '#444444',
    fontWeight: 'normal',
  },
  releaseListLine: {
    height: 0.5,
    backgroundColor: '#DDDDDD',
  },
  releaseListButton: {
    flexDirection: 'row',
  },
  releaseListButtonLine: {
    width: 1,
    backgroundColor: '#DDDDDD',
  },
  releaseListButtonClick: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12.5,
    paddingBottom: 12.5,
  },
  releaseListButtonTxt: {
    color: '#444444',
    fontSize: 14,
    fontWeight: 'normal',
  },

  releaseFlatListEmpty: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  releaseFlatListEmptyTxt: {
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

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseScreen);
