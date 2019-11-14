import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';

class opinionScreen extends React.Component {
  static navigationOptions = {
    title: '意见反馈',
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
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.opinionView}>
        <Text style={styles.opinionTitle}>
          &emsp;&emsp;欢迎您将您的意见或建议反馈给我们，以此督促我
          们在未来做的更好，能更好的为您服务。
        </Text>
        <TextInput
          style={styles.opinionInp}
          multiline={true}
          placeholder="请详细描述您的问题"
        />
        <View style={styles.opinionBtnView}>
          <View style={[styles.opinionBtn, {backgroundColor: '#DDDDDD'}]}>
            <Text style={styles.opinionTxt}>取消</Text>
          </View>
          <View style={[styles.opinionBtn, {backgroundColor: '#FFDB44'}]}>
            <Text style={styles.opinionTxt}>提交</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  opinionView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingLeft: 15,
    paddingRight: 15,
  },
  opinionTitle: {
    marginTop: 16.5,
    marginBottom: 16.5,
    fontSize: 14,
    color: '#444444',
    lineHeight: 30,
  },
  opinionInp: {
    height: 180,
    backgroundColor: '#F3F3F3',
    textAlignVertical: 'top',
  },
  opinionBtnView: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  opinionBtn: {
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    overflow: 'hidden',
  },
  opinionTxt: {
    fontSize: 14,
    color: '#444444',
    fontWeight: 'normal',
  },
});

export default opinionScreen;
