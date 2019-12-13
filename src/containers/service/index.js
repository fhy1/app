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
import {fetchCustomer} from '../../api/service';
import {WToast} from 'react-native-smart-tip';

class NewsScreen extends React.Component {
  static navigationOptions = {
    title: '选择客服',
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
      pageNo: 1,
      pageSize: 15,
      newsList: [],
      news: {},
    };
  }

  componentDidMount = () => {
    fetchCustomer().then(news => {
      this.setState({
        newsList: news.data,
      });
    });
  };

  goToChart = userId => {
    let toastOpts = {
      data: '',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };
    const {navigation, login} = this.props;

    if (login.userId == userId) {
      toastOpts.data = '无法和自己聊天';
      WToast.show(toastOpts);
    } else {
      navigation.navigate('Chart', {chartUserId: userId});
    }
  };

  render() {
    const {navigation, login} = this.props;
    const {news, newsList} = this.state;
    return (
      <View style={styles.tutorialView}>
        <FlatList
          style={styles.flatList}
          data={newsList}
          ItemSeparatorComponent={() => (
            <View style={styles.hallFlatListLine}></View>
          )}
          refreshing={false}
          renderItem={({item, index, separators}) => (
            <TouchableOpacity onPress={this.goToChart.bind(this, item.userId)}>
              <View style={styles.followList}>
                <View style={styles.followListView}>
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 5,
                      marginRight: 15,
                    }}
                    source={{uri: item.headimgurl}}
                  />
                  {item.newsNum > 0 ? (
                    <View
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 9,
                        backgroundColor: 'red',
                        position: 'absolute',
                        top: 5,
                        left: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: 12,
                          fontWeight: 'bold',
                        }}>
                        {item.newsNum}
                      </Text>
                    </View>
                  ) : null}
                  <View>
                    <Text style={{color: '#444444'}}>{item.nickname}</Text>
                  </View>
                  <View style={{position: 'absolute', right: 0}}>
                    <Text style={{color: '#666666'}}>{item.newsTime}</Text>
                    <Text style={{color: '#666666', marginTop: 3}}></Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => JSON.stringify(index)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tutorialView: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  flatListLine: {
    height: 1,
    backgroundColor: '#DDDDDD',
  },
  flatListLineEmpty: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListEmptyTxt: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#444444',
  },

  flatList: {
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#FFFFFF',
  },

  followList: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    height: 70,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  followListView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
  },
  hallFlatListLine: {
    height: 1,
    backgroundColor: '#DDDDDD',
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

export default connect(mapStateToProps, mapDispatchToProps)(NewsScreen);
