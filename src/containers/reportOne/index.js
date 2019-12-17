import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import FitImage from 'react-native-fit-image';
import {fetchRule} from '../../api/rule';

class ReportOneScreen extends React.Component {
  static navigationOptions = {
    title: '举报维权',
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
    this.state = {ruleList: []};
  }

  componentDidMount = () => {
    fetchRule(9).then(rule => {
      this.setState({
        ruleList: rule.data,
      });
    });
  };

  render() {
    const {ruleList} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.tutorialView}>
        <ScrollView>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Report');
            }}>
            <View style={styles.tutorialList}>
              <Text style={styles.tutorialListTxt}>我的举报</Text>
              <View style={styles.myinfoMoreGo}>
                <FitImage
                  style={{width: 15, height: 30}}
                  // @ts-ignore
                  source={require('../../assets/go.png')}
                  resizeMode="contain"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Reported');
            }}>
            <View style={styles.tutorialList}>
              <Text style={styles.tutorialListTxt}>我被举报</Text>
              <View style={styles.myinfoMoreGo}>
                <FitImage
                  style={{width: 15, height: 30}}
                  // @ts-ignore
                  source={require('../../assets/go.png')}
                  resizeMode="contain"
                />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.ruleView}>
            {ruleList.map(item => {
              return item.sort > 1 ? (
                <Text key={item.sort} style={styles.inviteEwmTxt}>
                  {item.sort - 1}: {item.introduce}
                </Text>
              ) : (
                <Text key={item.sort} style={styles.inviteEwm}>
                  {item.introduce}
                </Text>
              );
              // return {item.sort > 1
              //       ?
              //       <Text key={item.sort} style={styles.inviteEwmTxt}>`${item.sort - 1} ${item.introduce}`
              //   </Text>
              //       : item.introduce}
              // );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tutorialView: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  tutorialList: {
    height: 45,
    backgroundColor: '#FFFFFF',
    borderTopColor: '#DDDDDD',
    borderTopWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
  },
  tutorialListTxt: {
    color: '#444444',
    fontSize: 14,
    flex: 1,
  },
  myinfoMoreGo: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ruleView: {
    marginTop: 15,
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  inviteEwmTxt: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'normal',
    marginTop: 4,
    lineHeight: 22,
    paddingTop: 10,
  },
  inviteEwm: {
    fontSize: 16,
    color: '#444444',
    fontWeight: 'bold',
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportOneScreen);
