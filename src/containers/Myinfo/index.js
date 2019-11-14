import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import FitImage from 'react-native-fit-image';

class MyInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swiperHeight: 0,
      width: 0,
    };
  }

  componentDidMount() {}

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.homeView}>
        <ScrollView>
          <View style={styles.myinfoMore}>
            <View style={styles.myinfoMoreView}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Task');
                }}>
                <View style={styles.myinfoMoreItem}>
                  <View style={styles.myinfoMoreIcon}>
                    <FitImage
                      style={{width: 21, height: 22}}
                      // @ts-ignore
                      source={require('../../assets/task.png')}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.myinfoMoreTxt}>
                    <Text style={styles.myinfoMoreTxtTitle}>我的任务</Text>
                  </View>
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
                  navigation.navigate('Extend');
                }}>
                <View style={styles.myinfoMoreItem}>
                  <View style={styles.myinfoMoreIcon}>
                    <FitImage
                      style={{width: 21.5, height: 21}}
                      // @ts-ignore
                      source={require('../../assets/release.png')}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.myinfoMoreTxt}>
                    <Text style={styles.myinfoMoreTxtTitle}>发布/悬赏管理</Text>
                  </View>
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
                  navigation.navigate('Extend');
                }}>
                <View style={styles.myinfoMoreItem}>
                  <View style={styles.myinfoMoreIcon}>
                    <FitImage
                      style={{width: 21, height: 19}}
                      // @ts-ignore
                      source={require('../../assets/report.png')}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.myinfoMoreTxt}>
                    <Text style={styles.myinfoMoreTxtTitle}>举报维权</Text>
                  </View>
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
                  navigation.navigate('Extend');
                }}>
                <View style={styles.myinfoMoreItem}>
                  <View style={styles.myinfoMoreIcon}>
                    <FitImage
                      style={{width: 22, height: 15}}
                      // @ts-ignore
                      source={require('../../assets/tutorial.png')}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.myinfoMoreTxt}>
                    <Text style={styles.myinfoMoreTxtTitle}>教程协助</Text>
                  </View>
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
                  navigation.navigate('Opinion');
                }}>
                <View style={styles.myinfoMoreItem}>
                  <View style={styles.myinfoMoreIcon}>
                    <FitImage
                      style={{width: 22, height: 21}}
                      // @ts-ignore
                      source={require('../../assets/opinion.png')}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.myinfoMoreTxt}>
                    <Text style={styles.myinfoMoreTxtTitle}>意见反馈</Text>
                  </View>
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
                  navigation.navigate('Extend');
                }}>
                <View style={styles.myinfoMoreItem}>
                  <View style={styles.myinfoMoreIcon}>
                    <FitImage
                      style={{width: 21, height: 22}}
                      // @ts-ignore
                      source={require('../../assets/blacklist.png')}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.myinfoMoreTxt}>
                    <Text style={styles.myinfoMoreTxtTitle}>小黑屋</Text>
                  </View>
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
                  navigation.navigate('Extend');
                }}>
                <View style={[styles.myinfoMoreItem, {borderBottomWidth: 0}]}>
                  <View style={styles.myinfoMoreIcon}>
                    <FitImage
                      style={{width: 22, height: 22}}
                      // @ts-ignore
                      source={require('../../assets/setting.png')}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.myinfoMoreTxt}>
                    <Text style={styles.myinfoMoreTxtTitle}>设置</Text>
                  </View>
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
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  myinfoMore: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  myinfoMoreView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    overflow: 'hidden',
  },
  myinfoMoreItem: {
    height: 48,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DDDDDD',
    flexDirection: 'row',
  },
  myinfoMoreIcon: {
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myinfoMoreGo: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myinfoMoreTxt: {
    flex: 1,
    justifyContent: 'center',
  },
  myinfoMoreTxtTitle: {
    fontSize: 16,
    color: '#444444',
  },
});

export default MyInfoScreen;
