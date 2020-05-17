import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Signature from 'react-native-signature-canvas';

export default class SignatureScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { signature: null };
  }

  handleSignature = signature => {
    this.setState({ signature });
		console.log("TCL: SignatureScreen -> signature", signature)
    
  };

  handleEmpty = () => {
    console.log('Empty');
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
          onOK={this.handleSignature}
          onEmpty={this.handleEmpty}
          descriptionText="Sign"
          clearText="Clear"
          confirmText="Save"
          webStyle={style}
        />
      </View>
    );
  }
}

