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
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
import {WToast} from 'react-native-smart-tip';
import {fetchChartRecord, addChart, fetchChart} from '../../api/chart';
import {saveChart} from '../../api/myinfo';
import ImagePicker from 'react-native-image-picker';
import {upLoadImg} from '../../api/upload';
import {paramToQuery2} from '../../utils/fetch';
import ImageViewer from 'react-native-image-zoom-viewer';
import {DownloadImage} from '../../utils/downloadImage';

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
      imgsize: [],
      imgVisible: false,
      images: [],
    };
  }

  Time = null;

  componentDidMount = () => {
    const {login} = this.props;
    const chartUserId = this.props.navigation.state.params.chartUserId;
    // const chartUserId = 25;
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
    this.setState({
      imgVisible: false,
    });
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
            this.setState(
              {
                chartList: newList,
                page: res.data.pageNum,
              },
              () => {
                console.log(111);
                const {chartList} = this.state;
                chartList.forEach((item, index) => {
                  if (item.type == 2) {
                    this.setSize(paramToQuery2(item.content), index);
                  }
                });
              },
            );
          }
        }
        fetchChart(data).then(news => {
          let newPage = 0;
          news.data.list.forEach(item => {
            newPage = newPage + item.newsNum;
          });
          this.props.saveChart(newPage);
        });
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
            this.setState(
              {
                page: res.data.pageNum,
                chartList: chartList,
                refreshing: false,
              },
              () => {
                const {chartList} = this.state;
                chartList.forEach((item, index) => {
                  console.log(111);
                  if (item.type == 2) {
                    this.setSize(paramToQuery2(item.content), index);
                  }
                });
              },
            );
          },
          () => {},
        );
      },
    );
  };

  setSize = (uri, index) => {
    let {imgsize} = this.state;
    Image.getSize(uri, (w, h) => {
      if (w > 320 || h > 320) {
        if (w > h) {
          imgsize[index] = {
            width: 300,
            height: (h * 300) / w,
          };
        } else {
          imgsize[index] = {
            width: (w * 300) / h,
            height: 300,
          };
        }
      } else {
        imgsize[index] = {
          width: w,
          height: h,
        };
      }
      this.setState({
        imgsize: imgsize,
      });
    });
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
        type: 1,
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

  selectPhotoTapped = () => {
    const {login} = this.props;
    const {chartUserId} = this.state;
    const options = {
      title: '选择图片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '选择照片',
      // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      cameraType: 'back',
      mediaType: 'photo',
      videoQuality: 'high',
      durationLimit: 10,
      maxWidth: 800,
      maxHeight: 800,
      quality: 0.8,
      angle: 0,
      allowsEditing: false,
      noData: false,
      storageOptions: {
        skipBackup: true,
      },
      permissionDenied: {
        title: '没有权限',
        text: '需要调用您的摄像头权限，可去设置-应用-权限中赋予',
        reTryTitle: '重试',
        okTitle: '确定',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {
          uri: response.uri,
          name: response.fileName,
          type: 'image/png',
        };
        upLoadImg(source).then(img => {
          console.log('source', img);

          let data = {
            userId: login.userId,
            targetId: chartUserId,
            newsContent: img.data,
            type: 2,
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
          // this.setState({
          //   imgUrl: img.data,
          // });
        });
        // let source = {uri: response.uri};

        // // You can also display the image using data:
        // // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        // this.setState({
        //   avatarSource: source,
        // });
      }
    });
  };

  onShowImg = uri => {
    let img = [{url: uri}];
    this.setState({
      images: img,
      imgVisible: true,
    });
  };

  savePhoto = () => {
    let {images} = this.state;
    this.handelSavePicture(images[0].url);
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
          this.setState({imgVisible: false});
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

  render() {
    const {chartTxt, chartList, imgsize, imgVisible, images} = this.state;
    const {login} = this.props;
    console.log(imgsize);
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
            <View
              style={{
                paddingBottom: 10,
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 0,
              }}>
              {item.sendId == login.userId ? (
                <View style={styles.listRight}>
                  <View style={styles.listRightChart}>
                    {item.type == 2 ? (
                      <TouchableOpacity
                        onPress={this.onShowImg.bind(
                          this,
                          paramToQuery2(item.content),
                        )}>
                        <Image
                          style={{
                            width: imgsize[index] ? imgsize[index].width : 0,
                            height: imgsize[index] ? imgsize[index].height : 0,
                            resizeMode: 'cover',
                          }}
                          source={{uri: paramToQuery2(item.content)}}
                        />
                      </TouchableOpacity>
                    ) : (
                      <Text style={styles.listRightChartView}>
                        {item.content}
                      </Text>
                    )}
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
                    {item.type == 2 ? (
                      <Image
                        style={{
                          width: imgsize[index] ? imgsize[index].width : 0,
                          height: imgsize[index] ? imgsize[index].height : 0,
                        }}
                        source={{uri: paramToQuery2(item.content)}}
                      />
                    ) : (
                      <Text style={styles.listLeftChartTxt}>
                        {item.content}
                      </Text>
                    )}
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
          <TouchableOpacity onPress={this.selectPhotoTapped}>
            <View style={styles.navSearchRole}>
              <Text style={{fontSize: 20}}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
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
  chartView: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    paddingTop: 15,
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
  navSearchRole: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFDB44',
    marginLeft: 10,
    borderRadius: 22,
  },

  flatList: {
    flex: 1,
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
  return {
    saveChart: data => dispatch(saveChart(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartScreen);
