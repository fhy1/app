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
      this.props.addOneOptions(login.userId, ques).then(
        () => {
          toastOpts.data = '反馈意见成功';
          WToast.show(toastOpts);
          this.props.clearOption();
          this.setState({
            pageNo: 1,
            pageSize: 15,
          });
          this.props.fetchOptionAll(1, 15).then(() => {
            this.setState({
              modal: false,
              ques: '',
            });
          });
        },
        () => {
          toastOpts.data = '反馈意见失败';
          WToast.show(toastOpts);
        },
      );
    } else {
      toastOpts.data = '请输入您的意见';
      WToast.show(toastOpts);
    }
  };

  fetchListNext = () => {
    const {option} = this.props;
    if (option.pageNum < option.pages) {
      const {pageNo} = this.state;
      this.setState(
        {
          pageNo: pageNo + 1,
        },
        () => {
          const {pageNo, pageSize} = this.state;
          this.props.fetchOptionAll(pageNo, pageSize);
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
          style={styles.optionList}
          data={optionList}
          ItemSeparatorComponent={() => (
            <View style={styles.optionListLine}>
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
            <View style={styles.optionList}>
              <Text>111</Text>
            </View>
          )}
          keyExtractor={item => JSON.stringify(item.userId)}
        />
        {modal ? (
          <View style={[styles.opinionModal, {width: width, height: height}]}>
            <View style={styles.opinionModalView}>
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
    paddingLeft: 15,
    paddingRight: 15,
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
    width: 400,
    marginTop: 96,
    padding: 13,
    borderRadius: 4,
  },
  opinionAddBtn: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  opinionAddBtnView: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDB44',
    borderRadius: 4,
    marginTop: 30,
  },
  opinionBtnViewTxt: {
    fontSize: 14,
    color: '#444444',
  },
  optionList: {
    marginTop: 10,
  },
  optionListLine: {
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFFFFF',
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
});

function mapStateToProps(state) {
  return {
    login: state.login.login,
    option: state.option.option,
    optionList: state.option.optionList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // fetchOptionAll: (pageNo, pageSize) =>
    //   dispatch(fetchOptionAll(pageNo, pageSize)),
    // addOneOptions: (userId, opinion) =>
    //   dispatch(addOneOptions(userId, opinion)),
    // clearOption: () => dispatch(clearOption()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OpinionScreen);
// export default opinionScreen;
