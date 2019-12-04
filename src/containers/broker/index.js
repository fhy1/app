import React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import HTMLView from 'react-native-htmlview';
import {fetchRule} from '../../api/broker';

class BrokerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wrapper: '',
    };
  }

  componentDidMount = () => {
    fetchRule().then(res => {
      console.log(res.data);
      this.setState({
        wrapper: res.data,
      });
    });
  };

  // renderNode(node, index, siblings, parent, defaultRenderer) {
  //   if (node.name == 'div') {
  //     const View1 = styled.View`
  //       ${node.attribs.style};
  //     `;

  //     return (
  //       <View1 key={index}>{defaultRenderer(node.children, parent)}</View1>
  //     );
  //   } else if (node.name == 'p' || node.name == 'span') {
  //     const Text1 = styled.Text`
  //       ${node.attribs.style};
  //     `;

  //     return (
  //       <Text1 key={index}>{defaultRenderer(node.children, parent)}</Text1>
  //     );
  //   } else if (node.name == 'strong') {
  //     const Text2 = styled.Text`
  //       ${node.attribs.style};
  //       font-weight: bold;
  //     `;

  //     return (
  //       <Text2 key={index}>{defaultRenderer(node.children, parent)}</Text2>
  //     );
  //   }
  // }

  render() {
    const {wrapper} = this.state;
    console.log(wrapper);
    return <HTMLView value={wrapper} />;
  }
}
import {from} from 'rxjs';

const styles = StyleSheet.create({
  brokerView: {
    flex: 1,
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
