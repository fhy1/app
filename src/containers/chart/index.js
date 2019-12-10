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
} from 'react-native';
import {connect} from 'react-redux';

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
      chartList: [1],
      refreshing: false,
    };
  }

  componentDidMount = () => {};

  handelOnSerchHall = () => {
    this.setState({});
  };

  onChangeSearchTxt = e => {
    this.setState({
      chartTxt: e,
    });
  };
  _onRefresh = () => {
    this.setState({refreshing: true});
    // fetchData().then(() => {
    //   this.setState({refreshing: false});
    // });
  };
  render() {
    const {chartTxt, chartList} = this.state;
    const {login} = this.props;
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
            <View style={styles.listLeft}>
              <View style={styles.listLeftImg}>
                <Image
                  style={styles.listLeftImage}
                  source={{uri: login.headimgurl}}
                />
              </View>
              <View style={styles.listLeftChart}>
                <Text style={styles.listLeftChartTxt}>
                  1234gswegrwgrewegregergreggggggggggggggggggggkkkkgrkrrrrrrrrrrrrrrrrrrrrrrrrrrrrgggggggggggggggggggggggtttttttttttttttttt
                </Text>
              </View>
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
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chartView: {
    flex: 1,
    backgroundColor: '#F3F3F3',
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

  flatList: {
    padding: 15,
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
  },
  listLeftChartTxt: {
    paddingRight: 15,
    lineHeight: 36,
    fontSize: 14,
    color: '#444444',
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

export default connect(mapStateToProps, mapDispatchToProps)(ChartScreen);
