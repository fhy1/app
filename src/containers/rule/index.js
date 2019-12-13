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
import {fetchRule} from '../../api/rule';
class RuleScreen extends React.Component {
  static navigationOptions = {
    title: '规则',
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
      ruleList: [],
    };
  }

  componentDidMount = () => {
    let ruleId = this.props.navigation.state.params.id;
    fetchRule(ruleId).then(rule => {
      console.log(rule);
      this.setState({
        ruleList: rule.data,
      });
    });
  };

  render() {
    const {ruleList} = this.state;
    return (
      <View style={styles.ruleView}>
        <ScrollView>
          <View>
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
  ruleView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
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

export default connect(mapStateToProps, mapDispatchToProps)(RuleScreen);
