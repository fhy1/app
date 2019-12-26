import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchExtendPoster} from '../../api/extend';
import {WToast} from 'react-native-smart-tip';
import {DownloadImage} from '../../utils/downloadImage';

class RechargeScreen extends React.Component {
  static navigationOptions = {
    title: '推广海报',
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
      myuri: 'http://212.64.70.14:9099',
      // myuri: 'http://212.64.70.14:9099/resource/poster/27/poster.png',
      imgArr: [{uri: 'http://212.64.70.14:9099/resource/poster/27/poster.png'}],
      imgUrl: '',
      imgWidth: 1,
      imgHeight: 1,
    };
  }

  componentDidMount = () => {
    const {login} = this.props;
    const {myuri} = this.state;
    fetchExtendPoster(login.userId, encodeURI(login.nickname)).then(data => {
      console.log(data);
      Image.getSize(myuri + data, (w, h) => {
        this.setState({
          imgWidth: w,
          imgHeight: h,
          imgUrl: myuri + data,
        });
        console.log(w, h);
      });
    });
  };

  handelSavePicture = () => {
    const {imgUrl} = this.state;
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    DownloadImage(imgUrl)
      .then(res => {
        if (res.statusCode == 200) {
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
    const {width} = Dimensions.get('window');
    const {imgUrl, imgWidth, imgHeight} = this.state;
    return (
      <View
        style={[
          styles.rechargeView,
          {
            paddingTop: width * 0.05,
          },
        ]}>
        <ScrollView>
          {imgUrl ? (
            <Image
              style={{
                width: width * 0.7,
                height: (imgHeight * width * 0.7) / imgWidth,
              }}
              source={{
                uri: imgUrl,
              }}
            />
          ) : null}

          <TouchableOpacity
            onPress={this.handelSavePicture}
            style={{alignItems: 'center'}}>
            <View style={styles.savePicture}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#444444',
                }}>
                保存图片
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rechargeView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  savePicture: {
    width: 100,
    height: 34,
    backgroundColor: '#FFDB44',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 10,
  },
});

function mapStateToProps(state) {
  return {
    login: state.login.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveMoney: data => dispatch(saveMoney(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RechargeScreen);
