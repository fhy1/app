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
import {fetchAudit} from '../../api/apply';

class ApplyScreen extends React.Component {
  static navigationOptions = {
    title: '审核任务',
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
      labels: ['未审核', '已审核'],
      labelStatus: 0,
      applyList: [],
    };
  }
  componentDidMount = async () => {
    try {
      const data = await fetchAudit();
      console.log(data);
      this.setState({
        applyList: data.data,
      });
    } catch (error) {}
  };

  onHandelPress = index => {
    this.setState({
      labelStatus: index,
    });
  };
  onFinish = () => {};
  render() {
    const {labels, labelStatus, applyList} = this.state;
    const {login} = this.props;
    return (
      <View style={styles.applyView}>
        <View style={styles.applyTitleView}>
          <View style={styles.applyTitle}>
            {labels.map((item, index) => {
              return index == labelStatus ? (
                <View
                  style={[styles.applyTitleText, styles.applyTitleClick]}
                  key={index}>
                  <Text style={styles.applyTitleTextClick}>{item}</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.applyTitleTextTouch}
                  onPress={this.onHandelPress.bind(this, index)}
                  key={index}>
                  <View
                    style={styles.applyTitleText}
                    onResponderGrant={this.onHandelPress}>
                    <Text style={styles.applyTitleTextNormal}>{item}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <Text>{login.userId}</Text>
        <FlatList
          style={styles.releaseFlatList}
          data={applyList}
          ItemSeparatorComponent={() => (
            <View style={styles.releaseFlatListLine} />
          )}
          renderItem={({item, index, separators}) => (
            <View style={styles.releaseList} key={item.id}>
              <View style={styles.releaseListTitle}>
                <Text style={styles.releaseListTitleTxt}>毛毛爱吃火腿</Text>
              </View>
              <View style={styles.releaseListImg}></View>
              <View style={styles.releaseListNav}>
                <Text style={styles.releaseListNavTxt}>2019-11-10</Text>
              </View>
              <View style={styles.releaseListLine}></View>
              <View style={styles.releaseListButton}>
                <TouchableOpacity
                  style={styles.releaseListButtonClick}
                  onPress={this.onFinish}>
                  <View>
                    <Text style={styles.releaseListButtonTxt}>通过</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.releaseListButtonLine}></View>

                <TouchableOpacity
                  style={styles.releaseListButtonClick}
                  onPress={this.onGoToApply}>
                  <View>
                    <Text style={styles.releaseListButtonTxt}>不通过</Text>
                  </View>
                </TouchableOpacity>
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
  releaseListTitleTxt: {
    color: '#444444',
    fontSize: 14,
    fontWeight: 'bold',
  },
  releaseListImg: {
    flexDirection: 'row',
  },
  releaseListNavTxt: {
    color: '#666666',
    fontSize: 12,
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
  return {
    login: state.login.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplyScreen);
