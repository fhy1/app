import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {WToast} from 'react-native-smart-tip';
import {connect} from 'react-redux';
import {addOneOptions, fetchOptionAll} from '../../api/option';

class OpinionScreen extends React.Component {
  static navigationOptions = {
    title: '意见反馈',
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
      modal: false,
      ques: '',
      pageNo: 1,
      pageSize: 15,
      option: {},
      optionList: [],
    };
  }

  componentDidMount = () => {
    const {pageNo, pageSize} = this.state;
    fetchOptionAll(pageNo, pageSize).then(option => {
      console.log(option);
      this.setState({
        option: option.data,
        optionList: option.data.list,
      });
    });
  };

  addOpinion = () => {
    this.setState({
      modal: true,
      ques: '',
    });
  };

  addBack = () => {
    this.setState({
      modal: false,
      ques: '',
    });
  };

  addSubmit = () => {
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    const {ques} = this.state;
    const {login} = this.props;
    if (ques != '') {
      addOneOptions(login.userId, ques).then(
        () => {
          toastOpts.data = '反馈意见成功';
          WToast.show(toastOpts);
          this.setState({
            pageNo: 1,
            pageSize: 15,
          });
          fetchOptionAll(1, 15).then(option => {
            console.log(option);
            this.setState({
              option: option.data,
              optionList: option.data.list,
              modal: false,
              ques: '',
            });
          });
        },
        () => {
          toastOpts.data = '反馈意见失败';
          WToast.show(toastOpts);
          this.setState({
            modal: false,
            ques: '',
          });
        },
      );
    } else {
      toastOpts.data = '请输入您的意见';
      WToast.show(toastOpts);
    }
  };

  fetchListNext = () => {
    const {option} = this.state;
    if (option.pageNum < option.pages) {
      const {pageNo} = this.state;
      this.setState(
        {
          pageNo: pageNo + 1,
        },
        () => {
          const {pageNo, pageSize, optionList} = this.state;
          fetchOptionAll(pageNo, pageSize).then(option => {
            console.log(option);
            this.setState({
              option: option.data,
              optionList: optionList.concat(option.data.list),
            });
          });
        },
      );
    }
  };

  onChangeQues = e => {
    this.setState({
      ques: e,
    });
  };

  render() {
    const {modal, ques, option, optionList} = this.state;
    console.log(option);
    const {width, height} = Dimensions.get('window');
    return (
      <View style={styles.opinionView}>
        <View style={styles.opinionAddBtn}>
          <TouchableOpacity onPress={this.addOpinion}>
            <View style={styles.opinionAddBtnView}>
              <Text style={styles.opinionBtnViewTxt}>反馈意见</Text>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.optionFlatList}
          data={optionList}
          ItemSeparatorComponent={() => (
            <View style={styles.optionListLinecenter}>
              <View style={styles.optionListLinebg} />
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.optionEmpty}>
              <Text style={styles.optionEmptyTxt}>暂无数据</Text>
            </View>
          )}
          refreshing={false}
          ListFooterComponent={() =>
            optionList.length > 0 ? (
              <View style={styles.optionEmpty}>
                <Text style={styles.optionEmptyTxt}>
                  {option.pageNum == option.pages
                    ? '没有更多了，亲'
                    : '正在加载中，请稍等~'}
                </Text>
              </View>
            ) : null
          }
          onEndReachedThreshold={0}
          onEndReached={this.fetchListNext}
          renderItem={({item, index, separators}) => (
            <View style={styles.optionList} key={item.id}>
              <View style={styles.optionListTitle}>
                <Text style={styles.optionListTitleTxt}>
                  {item.nickname
                    ? item.nickname
                    : item.phone
                    ? `${item.phone.substring(0, 3)}****${item.phone.substring(
                        item.phone.length - 4,
                      )}`
                    : '-'}
                </Text>
              </View>
              <View style={styles.optionListNav}>
                <Text style={styles.optionListNavTxt}>
                  提交时间： {item.commitTime}
                </Text>
              </View>
              <View>
                <Text style={styles.optionListThing}>
                  意见内容： {item.opinion}
                </Text>
              </View>
              <View style={{marginTop: 6}}>
                <Text style={styles.optionListThing}>
                  客服反馈： {item.reply || '暂未回复'}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={item => JSON.stringify(item.userId)}
        />
        {modal ? (
          <View style={[styles.opinionModal, {width: width, height: height}]}>
            <View style={[styles.opinionModalView, {width: width * 0.8}]}>
              <View style={styles.opinionTopTitle}>
                <Text style={styles.opinionTopTitleTxt}>意见反馈</Text>
              </View>
              <Text style={styles.opinionTitle}>
                &emsp;&emsp;欢迎您将您的意见或建议反馈给我们，以此督促我
                们在未来做的更好，能更好的为您服务。
              </Text>
              <TextInput
                style={styles.opinionInp}
                multiline={true}
                value={ques}
                placeholder="请详细描述您的问题"
                onChangeText={this.onChangeQues}
                maxLength={60}
              />
              <View style={styles.opinionBtnView}>
                <TouchableOpacity onPress={this.addBack}>
                  <View
                    style={[styles.opinionBtn, {backgroundColor: '#DDDDDD'}]}>
                    <Text style={styles.opinionTxt}>取消</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.addSubmit}>
                  <View
                    style={[styles.opinionBtn, {backgroundColor: '#FFDB44'}]}>
                    <Text style={styles.opinionTxt}>提交</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  opinionView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  opinionTopTitle: {
    alignItems: 'center',
  },
  opinionTopTitleTxt: {
    fontSize: 16,
    color: '#444444',
    fontWeight: 'bold',
  },
  opinionTitle: {
    marginTop: 16.5,
    marginBottom: 16.5,
    fontSize: 14,
    color: '#444444',
    lineHeight: 30,
    fontWeight: 'normal',
  },
  opinionInp: {
    height: 180,
    backgroundColor: '#F3F3F3',
    textAlignVertical: 'top',
  },
  opinionBtnView: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  opinionBtn: {
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    overflow: 'hidden',
  },
  opinionTxt: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'normal',
  },
  opinionModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignItems: 'center',
  },
  opinionModalView: {
    backgroundColor: '#FFFFFF',
    marginTop: 96,
    padding: 13,
    borderRadius: 4,
  },
  opinionAddBtn: {
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#F3F3F3',
    paddingBottom: 15,
  },
  opinionAddBtnView: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDB44',
    borderRadius: 4,
    marginTop: 15,
  },
  opinionBtnViewTxt: {
    fontSize: 14,
    color: '#444444',
  },
  optionFlatList: {
    backgroundColor: '#F3F3F3',
  },
  optionListLinecenter: {
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#F3F3F3',
  },
  optionListLinebg: {
    height: 1,
    backgroundColor: '#DDDDDD',
  },
  optionEmpty: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionEmptyTxt: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#444444',
  },
  optionList: {
    backgroundColor: '#FFFFFF',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
  optionListTitle: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 6,
  },
  optionListNav: {
    flexDirection: 'row',
    paddingBottom: 6,
  },
  optionListBtnView: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  optionListTitleTxt: {
    color: '#444444',
    fontSize: 14,
    fontWeight: 'bold',
  },
  optionListTitleMoney: {
    position: 'absolute',
    right: 0,
    top: 12,
    fontSize: 14,
    color: '#FD3F3F',
  },
  optionListNavTxt: {
    color: '#666666',
    fontSize: 12,
  },
  optionListBtn: {
    paddingLeft: 12,
    paddingRight: 12,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#FFDB44',
    marginRight: 10,
  },
  optionListBtnTxt: {
    fontSize: 12,
    color: '#444444',
    fontWeight: 'normal',
  },
  optionListThing: {
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

export default connect(mapStateToProps, mapDispatchToProps)(OpinionScreen);
// export default opinionScreen;
