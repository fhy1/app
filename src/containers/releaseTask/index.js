import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

class ReleaseTaskScreen extends React.Component {
  static navigationOptions = {
    title: '发布任务',
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

  componentDidMount = () => {};

  render() {
    return (
      <View style={styles.releaseTaskView}>
        <ScrollView>
          <View style={styles.releaseList}>
            <Text style={styles.releaseListTxt}>任务名称</Text>
            <TextInput
              style={styles.releaseListInput}
              placeholder="需填写真实项目名称"
            />
          </View>
          <View style={styles.releaseList}>
            <Text style={styles.releaseListTxt}>任务描述</Text>
            <TextInput
              style={styles.releaseListInput}
              placeholder="描述任务的要求与限制"
            />
          </View>
          <View style={styles.releaseList}>
            <Text style={styles.releaseListTxt}>提交时间</Text>
            <Text style={styles.releaseListInpTxt}>
              限制 <Text style={styles.releaseListInpNum}>24</Text> 小时内提交
            </Text>
          </View>
          <View style={styles.releaseList}>
            <Text style={styles.releaseListTxt}>审核时间</Text>
            <Text style={styles.releaseListInpTxt}>
              将在 <Text style={styles.releaseListInpNum}>24</Text> 小时内审核
            </Text>
          </View>
          <View style={[styles.releaseList, {marginBottom: 10}]}>
            <Text style={styles.releaseListTxt}>重复任务</Text>
          </View>

          <View style={styles.releaseList}>
            <Text style={styles.releaseListTxt}>悬赏单价</Text>
            <TextInput
              style={styles.releaseListInput}
              keyboardType="numeric"
              placeholder="最少0.2元/人"
            />
          </View>
          <View style={styles.releaseList}>
            <Text style={styles.releaseListTxt}>悬赏名额</Text>
            <TextInput
              style={styles.releaseListInput}
              keyboardType="numeric"
              placeholder="最少10人"
            />
          </View>
          <View style={styles.releaseList}>
            <Text style={styles.releaseListTxt}>预付赏金</Text>
            <TextInput
              style={styles.releaseListInput}
              keyboardType="numeric"
              placeholder="共计0.00元"
            />
          </View>
          <View style={styles.releaseListBtn}>
            <TouchableOpacity>
              <View style={styles.releaseListBtnView}>
                <Text style={styles.releaseListBtnViewTxt}>
                  下一步 (设置步骤)
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  releaseTaskView: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  releaseList: {
    height: 46,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
  },
  releaseListTxt: {
    color: '#444444',
    fontSize: 14,
    fontWeight: 'bold',
  },
  releaseListInput: {
    flex: 1,
    color: '#666666',
    paddingLeft: 12,
    fontSize: 12,
    height: 46,
  },
  releaseListInpTxt: {
    flex: 1,
    color: '#666666',
    paddingLeft: 12,
    fontSize: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  releaseListInpNum: {
    color: '#FD3F3F',
  },
  releaseListBtn: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  releaseListBtnView: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDB44',
    borderRadius: 4,
    marginTop: 30,
  },
  releaseListBtnViewTxt: {
    // fontSize: 14,
    // color: '#444444',
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseTaskScreen);
