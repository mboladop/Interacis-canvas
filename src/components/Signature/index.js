import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Signature from 'react-native-signature-canvas';

export default class SignatureScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { signature: null, descriptionText: 'Sign' };
  }

  _handleSignature = signature => {
    console.log("TCL: SignatureScreen -> signature", signature);
    this.setState({descriptionText: 'Confirmed'});
  };

  _hangleBegin = () => {
    this.setState({descriptionText: 'Sign'});
  }

  render() {
    const style = `
    .m-signature-pad--footer .button {
      background-color: red;
      color: #FFF;
    }`;
    return (
      <View style={{ flex: 1 }}>
        {/* <View style={styles.preview}>
          {this.state.signature ? (
            <Image
              resizeMode={"contain"}
              style={{ width: 335, height: 114 }}
              source={{ uri: this.state.signature }}
            />
          ) : null}
        </View> */}
        <Signature
          onOK={this._handleSignature}
          onBegin={this._hangleBegin}
          descriptionText={this.state.descriptionText}
          backgroundUrl="http://interacis.com:3333/img.png"
          clearText="Clear"
          confirmText="Save"
          webStyle={style}
        />
      </View>
    );
  }
}

