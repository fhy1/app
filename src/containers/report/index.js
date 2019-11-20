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

class ReportScreen extends React.Component {
  static navigationOptions = {
    title: '举报维权',
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
      labels: ['我的投诉', '我被投诉'],
      labelStatus: 0,
    };
  }

  componentDidMount = () => {};

  onHandelPress = index => {
    this.setState({
      labelStatus: index,
    });
  };

  render() {
    const {labels, labelStatus} = this.state;
    return (
      <View style={styles.reportView}>
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
                  key={index}
                  onPress={this.onHandelPress.bind(this, index)}>
                  <View
                    style={styles.releaseTitleText}
                    onResponderGrant={this.onHandelPress}>
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
            </View>
          )}
          keyExtractor={item => item.id}
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
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportScreen);
