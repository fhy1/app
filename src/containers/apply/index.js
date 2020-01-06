import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Dimensions,
  Image,
  Clipboard,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchAudit, editAudit} from '../../api/apply';
import {WToast} from 'react-native-smart-tip';
import {paramToQuery2} from '../../utils/fetch';
import ImageViewer from 'react-native-image-zoom-viewer';
import {DownloadImage} from '../../utils/downloadImage';

class ApplyScreen extends React.Component {
  static navigationOptions = {
    title: '审核任务',
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
        {title: '待审核', id: 3},
        {title: '审核通过', id: 4},
        {title: '审核拒绝', id: 5},
      ],
      labelStatus: 3,
      apply: {},
      applyList: [],
      pageNo: 1,
      pageSize: 15,
      modalVisible: false,
      ques: '',
      taskId: '',
      clickIndex: 0,
      imgVisible: false,
      images: [],
      flag: true,
    };
  }
  componentDidMount = async () => {
    try {
      const {login} = this.props;
      const {pageNo, pageSize, labelStatus} = this.state;
      const data = await fetchAudit(
        pageNo,
        pageSize,
        login.userId,
        labelStatus,
      );
      this.setState({
        applyList: data.data.list,
      });
    } catch (error) {}
  };

  componentWillUnmount = () => {
    this.setState({
      modalVisible: false,
      imgVisible: false,
    });
  };

  onHandelPress = index => {
    const {login} = this.props;
    this.setState({
      labelStatus: index,
      pageNo: 1,
      pageSize: 15,
    });
    fetchAudit(1, 15, login.userId, index).then(data => {
      console.log(data.data.list);
      this.setState({
        applyList: data.data.list,
      });
    });
  };

  onNoPass = (taskId, index) => {
    this.setState({
      modalVisible: true,
      taskId: taskId,
      clickIndex: index,
    });
    // editAudit();
  };

  onFinish = (taskId, index) => {
    editAudit(taskId, 4, '').then(
      () => {
        this.setState(state => {
          state.applyList.splice(index, 1);
          return {
            applyList: state.applyList,
            modalVisible: false,
          };
        });
        toastOpts.data = '审核成功';
        WToast.show(toastOpts);
      },
      () => {
        toastOpts.data = '审核失败';
        WToast.show(toastOpts);
      },
    );
  };

  addBack = () => {
    this.setState({
      modalVisible: false,
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
    const {taskId, ques, clickIndex} = this.state;
    editAudit(taskId, 5, ques).then(
      () => {
        this.setState(state => {
          state.applyList.splice(clickIndex, 1);
          return {
            applyList: state.applyList,
            modalVisible: false,
          };
        });
        toastOpts.data = '审核成功';
        WToast.show(toastOpts);
      },
      () => {
        toastOpts.data = '审核失败';
        WToast.show(toastOpts);
      },
    );
  };

  onChangeQues = e => {
    this.setState({
      ques: e,
    });
  };

  onShowImg = uri => {
    let img = [{url: uri}];
    this.setState({
      images: img,
      imgVisible: true,
    });
  };

  handelSavePicture = uri => {
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    DownloadImage(uri)
      .then(res => {
        if (res.statusCode == 200) {
          this.setState({
            imgVisible: false,
          });
          // toastOpts.data = '图片保存成功';
          // WToast.show(toastOpts);
        } else {
          // toastOpts.data = '图片保存失败';
          // WToast.show(toastOpts);
        }
      })
      .catch(error => {
        toastOpts.data = '图片保存失败';
        WToast.show(toastOpts);
        console.log(error);
      });
  };

  clickTxt = txt => {
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    Clipboard.setString(txt);
    toastOpts.data = '已成功复制到剪切板';
    WToast.show(toastOpts);
  };

  savePhoto = () => {
    let {images} = this.state;
    this.handelSavePicture(images[0].url);
  };

  fetchListNext = () => {
    const {apply, flag} = this.state;
    const {login} = this.props;
    if (apply.pageNum < apply.pages && flag) {
      const {pageNo} = this.state;
      this.setState(
        {
          pageNo: pageNo + 1,
          flag: false,
        },
        () => {
          const {pageNo, pageSize, labelStatus, applyList} = this.state;
          fetchAudit(pageNo, pageSize, login.userId, labelStatus).then(
            apply => {
              this.setState({
                apply: apply.data,
                applyList: applyList.concat(apply.data.list),
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
    const {
      labels,
      labelStatus,
      apply,
      applyList,
      modalVisible,
      ques,
      imgVisible,
      images,
    } = this.state;
    const {width} = Dimensions.get('window');
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
            <View style={styles.applyList}>
              <View style={styles.applyListTitle}>
                <Text style={styles.applyListTitleTxt}>{item.jobTitle}</Text>
                {labelStatus == 4 ? (
                  <View style={styles.applySign}>
                    <Text style={styles.applySignTxt}>通过</Text>
                  </View>
                ) : null}
                {labelStatus == 5 ? (
                  <View style={styles.applySign2}>
                    <Text style={styles.applySignTxt2}>未通过</Text>
                  </View>
                ) : null}
              </View>
              <View style={styles.applyListImg}>
                {item.imgList.map((item2, index2) => {
                  return (
                    <TouchableOpacity
                      key={index2}
                      onPress={this.onShowImg.bind(this, paramToQuery2(item2))}>
                      <Image
                        source={{uri: paramToQuery2(item2)}}
                        style={{width: 100, height: 100, resizeMode: 'cover'}}
                      />
                      <TouchableOpacity
                        onPress={this.handelSavePicture.bind(
                          this,
                          paramToQuery2(item2),
                        )}>
                        <View style={styles.savePicture}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#444444',
                            }}>
                            保存图片
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View style={styles.applyListNav}>
                <Text
                  style={[
                    styles.applyListNavTxt,
                    {paddingTop: 15, paddingBottom: 15},
                  ]}
                  selectable={true}
                  onLongPress={this.clickTxt.bind(this, item.commitInfo)}>
                  提交信息: {item.commitInfo}
                </Text>
              </View>
              <View style={styles.applyListNav}>
                <Text style={styles.applyListNavTxt}>{item.commitTime}</Text>
              </View>
              {labelStatus == 3 ? (
                <>
                  <View style={styles.applyListLine}></View>
                  <View style={styles.applyListButton}>
                    <TouchableOpacity
                      style={styles.applyListButtonClick}
                      onPress={this.onFinish.bind(this, item.taskId, index)}>
                      <View>
                        <Text style={styles.applyListButtonTxt}>通过</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.applyListButtonLine}></View>

                    <TouchableOpacity
                      style={styles.applyListButtonClick}
                      onPress={this.onNoPass.bind(this, item.taskId, index)}>
                      <View>
                        <Text style={styles.applyListButtonTxt}>不通过</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              ) : null}
              {/* {labelStatus == 5 ? (
                <>
                  <View style={styles.applyListLine}></View>
                  <View style={styles.applyListButton}>
                    <Text style={styles.applyNoPassTxt}>
                      未通过原因: {item.refuseReason}
                    </Text>
                  </View>
                </>
              ) : null} */}
            </View>
          )}
          keyExtractor={item => JSON.stringify(item.taskId)}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={this.addBack}>
          <View style={styles.taskModal}>
            <View style={[styles.opinionModalView, {width: width * 0.8}]}>
              <View style={styles.opinionTopTitle}>
                <Text style={styles.opinionTopTitleTxt}>拒绝原因</Text>
              </View>
              <TextInput
                style={styles.opinionInp}
                multiline={true}
                value={ques}
                placeholder="请输入您的拒绝原因"
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
        </Modal>
        <Modal
          visible={this.state.imgVisible}
          transparent={true}
          onRequestClose={() => this.setState({imgVisible: false})}>
          <ImageViewer
            onClick={() => this.setState({imgVisible: false})}
            menuContext={{saveToLocal: '保存图片', cancel: '取消'}}
            onSave={url => {
              this.savePhoto(url);
            }}
            imageUrls={images}
            index={0}
          />
        </Modal>
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
  applySign: {
    position: 'absolute',
    top: 20,
    right: -15,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#FFDB44',
    width: 80,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applySignTxt: {
    color: '#444444',
    fontSize: 12,
    fontWeight: 'bold',
  },
  applySign2: {
    position: 'absolute',
    top: 20,
    right: -15,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#FD2A2A',
    width: 80,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applySignTxt2: {
    color: '#FFFFFF',
    fontSize: 12,
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

  applyNoPassTxt: {
    paddingTop: 10.5,
    paddingBottom: 10.5,
    color: '#444444',
    fontSize: 12,
  },

  //弹框
  taskModal: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    flex: 1,
    alignItems: 'center',
  },
  opinionModalView: {
    backgroundColor: '#FFFFFF',
    marginTop: 96,
    padding: 13,
    borderRadius: 4,
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
    height: 80,
    backgroundColor: '#F3F3F3',
    textAlignVertical: 'top',
  },
  opinionInp2: {
    height: 40,
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

  savePicture: {
    width: 80,
    height: 28,
    backgroundColor: '#FFDB44',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 10,
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
