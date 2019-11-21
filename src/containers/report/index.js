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
        <View style={styles.reportTitleView}>
          <View style={styles.reportTitle}>
            {labels.map((item, index) => {
              return index == labelStatus ? (
                <View
                  style={[styles.reportTitleText, styles.reportTitleClick]}
                  key={index}>
                  <Text style={styles.reportTitleTextClick}>{item}</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.reportTitleTextTouch}
                  key={index}
                  onPress={this.onHandelPress.bind(this, index)}>
                  <View
                    style={styles.reportTitleText}
                    onResponderGrant={this.onHandelPress}>
                    <Text style={styles.reportTitleTextNormal}>{item}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <FlatList
          style={styles.reportFlatList}
          data={[
            {title: '超级简单的任务', id: '1'},
            {title: '超级简单的任务', id: '2'},
          ]}
          ItemSeparatorComponent={() => (
            <View style={styles.reportFlatListLine} />
          )}
          renderItem={({item, index, separators}) => (
            <View style={styles.reportList} key={item.id}>
              <View style={styles.reportListTitle}>
                <Text style={styles.reportListTitleTxt}>点赞关注即可</Text>
                <Text style={styles.reportListTitleMoney}>赏2.25元</Text>
              </View>
              <View style={styles.reportListNav}>
                <Text style={styles.reportListNavTxt}>
                  发布时间： 2019-11-10
                </Text>
                <Text
                  style={[styles.reportListNavTxt, styles.reportListNavRight]}>
                  剩余100份
                </Text>
              </View>
              <View style={styles.reportListBtnView}>
                <View style={styles.reportListBtn}>
                  <Text style={styles.reportListBtnTxt}>公众号</Text>
                </View>
                <View style={styles.reportListBtn}>
                  <Text style={styles.reportListBtnTxt}>点赞关注</Text>
                </View>
              </View>
              <View style={styles.reportListLine}></View>
              <View>
                <Text>举报原因：</Text>
              </View>
              <View>
                <Text>举报结果：通过</Text>
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
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportScreen);
