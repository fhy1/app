import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import HTMLView from 'react-native-htmlview';
import styled from 'styled-components';
// import {AutoSizedImage} from '../../components/AutoSizedImage/AutoSizedImage.js';

class ImgDetailScreen extends React.Component {
  static navigationOptions = {
    title: '',
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
      wrapper: '',
    };
  }

  componentDidMount = () => {
    let wrapper = this.props.navigation.state.params.wrapper;
    this.setState({
      wrapper: wrapper,
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
    return <HTMLView value={wrapper} renderNode={this.renderNode} />;
  }
}

const styles = StyleSheet.create({});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ImgDetailScreen);
// export default MyInfoScreen;
