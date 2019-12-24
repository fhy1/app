import React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import HTMLView from 'react-native-htmlview';
import {WebView} from 'react-native-webview';
import {fetchRule} from '../../api/broker';
import styled from 'styled-components';
const {width, height} = Dimensions.get('window');
// import {AutoSizedImage} from '../../components/AutoSizedImage/AutoSizedImage.js';

const injectedJs =
  'setInterval(() => {window.parent.postMessage(document.getElementById("content").clientHeight)}, 500)';

class BrokerScreen extends React.Component {
  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: '#FFDB44',
      borderBottomWidth: 0,
      shadowOpacity: 0,
    },
    headerTintColor: '#FFFFFF',
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
      wrapper: '',
    };
  }

  componentDidMount = () => {
    let detail = this.props.navigation.state.params.detail;
    this.setState({
      wrapper: detail,
    });
  };

  renderNode = (node, index, siblings, parent, defaultRenderer) => {
    if (node.name == 'div') {
      const View1 = styled.View`
        ${node.attribs.style};
      `;

      return (
        <View1 key={index}>{defaultRenderer(node.children, parent)}</View1>
      );
    } else if (node.name == 'p' || node.name == 'span') {
      const Text1 = styled.Text`
        ${node.attribs.style};
      `;

      return (
        <Text1 key={index}>{defaultRenderer(node.children, parent)}</Text1>
      );
    } else if (node.name == 'strong') {
      const Text2 = styled.Text`
        ${node.attribs.style};
        font-weight: bold;
      `;

      return (
        <Text2 key={index}>{defaultRenderer(node.children, parent)}</Text2>
      );
    } else if (node.name == 'img') {
      return (
        <Image
          key={index}
          source={{uri: node.attribs.src}}
          style={{width: 340, height: 100, resizeMode: 'cover'}}
          // resizeMode="repeat"
        />
      );
    }
  };

  render() {
    const {wrapper} = this.state;
    console.log(wrapper);
    return (
      <View style={styles.brokerView}>
        <WebView
          style={{width: width, height: height}}
          injectedJavaScript={injectedJs}
          automaticallyAdjustContentInsets={true}
          source={{
            html: `<!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
                <title></title>
                <style>
                  img {
                    width: 100%;
                    height: auto
                  }
                </style>
              </head>
              <body>
              ${wrapper}
              </body>
            </html>`,
          }}
          scalesPageToFit={true}
          javaScriptEnabled={true} // 仅限Android平台。iOS平台JavaScript是默认开启的。
          domStorageEnabled={true} // 适用于安卓a
          scrollEnabled={false}
        />
      </View>
    );
    // <WebView
    //   style={{
    //     width: Dimensions.get('window').width,
    //     height: this.state.height,
    //   }}
    //   injectedJavaScript={injectedJs}
    //   automaticallyAdjustContentInsets={true}
    //   source={{
    //     html: wrapper,
    //   }}
    // scalesPageToFit={true}
    // javaScriptEnabled={true} // 仅限Android平台。iOS平台JavaScript是默认开启的。
    // domStorageEnabled={true} // 适用于安卓a
    // scrollEnabled={false}
    // onMessage={event => {
    //   console.log(event.nativeEvent.data);
    //   this.setState({height: +event.nativeEvent.data});
    // }}
    // />;
    // return <HTMLView value={wrapper} renderNode={this.renderNode} />;
  }
}
import {from} from 'rxjs';

const styles = StyleSheet.create({
  brokerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
});
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(BrokerScreen);
// export default MyInfoScreen;
