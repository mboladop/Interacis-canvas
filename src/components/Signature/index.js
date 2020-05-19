import React from 'react';
import { StyleSheet, Button, TextInput, View, Alert } from 'react-native';
import Signature from 'react-native-signature-canvas';

export default class SignatureScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signature: null,
      descriptionText: 'Sign',
      loadSignature: false
    };
  }

  _handleSignature = signature => {
    // console.log("TCL: SignatureScreen -> signature", signature);
    // this.setState({descriptionText: 'Confirmed'}); 
    fetch(`http://interacis.com:3333/api/v1/resolution/${this.state.activity}`, {
        method: 'POST',
        body: JSON.stringify({
          id_user:1,
          resolucion: signature
        }),
        headers:{
          'Content-Type': 'application/json'
        }
    })
    .then((response) => {
    console.log("SignatureScreen -> response", response)
      
      if (response.status !== 200) throw new Error(response.status)
      return response.json()
    })
    .then((responseJson) => {
        //Success 
        Alert.alert(
          'Guardado correctamente'
        );
        this.setState({loadSignature: false});
    })
    .catch((error) => {
        //Error 
        console.error(error);
        Alert.alert(
          'Error al guardar'
        );
    });
  };

  _hangleBegin = () => {
    this.setState({descriptionText: 'Sign'});
  }

  _getActivity = () => {
    //GET request 
    fetch(`http://interacis.com:3333/api/v1/activities/single/${this.state.activity}`, {
        method: 'GET'
    })
    .then((response) => {
      if (response.status !== 200) throw new Error(response.status)
      return response.json()
    })
    .then((responseJson) => {
        //Success 
        // console.log(responseJson);
        this.setState({loadSignature: true});
    })
    .catch((error) => {
        //Error 
        Alert.alert(
          'No existe la actividad seleccionada'
        );
        // console.error(error);
    });
    // this.setState({descriptionText: 'Sign'});
  }
  _onChangeText = (text) => {
    this.setState({activity: text});
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
        {(this.state.loadSignature) ? <Signature
          onOK={this._handleSignature}
          onBegin={this._hangleBegin}
          descriptionText={this.state.descriptionText}
          backgroundUrl="http://interacis.com:3333/img.png"
          clearText="Clear"
          confirmText="Save"
          webStyle={style}
        /> : <View style={{flexDirection: 'row', marginTop: 50,}}>
        <TextInput
          keyboardType={'number-pad'}
          style={{ height: 40, width: 200, borderColor: 'blue', borderWidth: 1 }}
          onChangeText={this._onChangeText}
        />
        <View style={{flex:1 , marginRight:10}} >
            <Button title="Save" onPress={this._getActivity}></Button>
        </View>
      </View>}
      </View>
    );
  }
}

