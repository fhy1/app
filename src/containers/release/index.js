import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Button,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {bold} from 'ansi-colors';

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
      labels: ['进行中', '已结束'],
      labelStatus: 0,
    };
  }

  componentDidMount = () => {
    this.props.navigation.setParams({goToclick: this.goToclick});
  };

  goToclick = () => {
    const {navigation} = this.props;
    navigation.navigate('ReleaseTask');
  };

  onHandelPress = index => {
    this.setState({
      labelStatus: index,
    });
  };

  onFinish = () => {};

  onGoToApply = () => {};

  _keyExtractor = (item, index) => item.id;

  render() {
    const {labels, labelStatus} = this.state;
    return (
      <View style={styles.releaseView}>
        <View style={styles.releaseTitleView}>
          <View style={styles.releaseTitle}>
            {labels.map((item, index) => {
              return index == labelStatus ? (
                <View
                  style={[styles.releaseTitleText, styles.releaseTitleClick]}
                  key={index}>
                  <Text style={styles.releaseTitleTextClick}>{item}</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.releaseTitleTextTouch}
                  onPress={this.onHandelPress.bind(this, index)}>
                  <View
                    style={styles.releaseTitleText}
                    onResponderGrant={this.onHandelPress}
                    key={index}>
                    <Text style={styles.releaseTitleTextNormal}>{item}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <FlatList
          style={styles.releaseFlatList}
          data={[
            {title: '超级简单的任务', id: '1'},
            {title: '超级简单的任务', id: '2'},
          ]}
          ItemSeparatorComponent={() => (
            <View style={styles.releaseFlatListLine} />
          )}
          renderItem={({item, index, separators}) => (
            <View style={styles.releaseList} key={item.id}>
              <View style={styles.releaseListTitle}>
                <Text style={styles.releaseListTitleTxt}>点赞关注即可</Text>
                <Text style={styles.releaseListTitleMoney}>赏2.25元</Text>
              </View>
              <View style={styles.releaseListNav}>
                <Text style={styles.releaseListNavTxt}>
                  发布时间： 2019-11-10
                </Text>
                <Text
                  style={[
                    styles.releaseListNavTxt,
                    styles.releaseListNavRight,
                  ]}>
                  剩余100份
                </Text>
              </View>
              <View style={styles.releaseListBtnView}>
                <View style={styles.releaseListBtn}>
                  <Text style={styles.releaseListBtnTxt}>公众号</Text>
                </View>
                <View style={styles.releaseListBtn}>
                  <Text style={styles.releaseListBtnTxt}>点赞关注</Text>
                </View>
              </View>
              <View style={styles.releaseListLine}></View>
              <View style={styles.releaseListButton}>
                <TouchableOpacity
                  style={styles.releaseListButtonClick}
                  onPress={this.onFinish}>
                  <View>
                    <Text style={styles.releaseListButtonTxt}>结束任务</Text>
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
            </View>
          )}
          keyExtractor={item => item.id}
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
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseScreen);
