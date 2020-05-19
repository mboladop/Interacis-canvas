import React from 'react';
import { StyleSheet, Button, TextInput, View, Alert, FlatList } from 'react-native';
import Signature from 'react-native-signature-canvas';
import Item from '../Item';

export default class SignatureScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signature: null,
      descriptionText: 'Sign',
      loadSignature: false,
      activitiesList: []
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
      this.reloadActivities();
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

  _getActivity = (selected = false) => {
    const activity = (selected) ? selected : this.state.activity;
    this.setState({activity});
    //GET request 
    fetch(`http://interacis.com:3333/api/v1/activities/single/${activity}`, {
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

  componentDidMount = () => {
    this.reloadActivities();
  }
  reloadActivities = () => {
    fetch(`http://interacis.com:3333/api/v1/activities/student/1/book/5782`, {
      method: 'GET'
    })
    .then((response) => {
      if (response.status !== 200) throw new Error(response.status)
      return response.json()
    })
    .then((responseJson) => {
    console.log("componentDidMount -> responseJson", responseJson)
        //Success 
        // console.log(responseJson);
        this.setState({activitiesList: responseJson});
    })
    .catch((error) => {
        //Error 
        Alert.alert(
          'No existen actividades para el usuario'
        );
        // console.error(error);
    });
  }
  renderSeparatorView = () => {
    return (
      <View style={{
          height: 1, 
          width: "100%",
          backgroundColor: "#CEDCCE",
        }}
      />
    );
  };
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
        /> : <View><View style={{flexDirection: 'row', marginTop: 50, marginBottom:100}}>
        <TextInput
          keyboardType={'number-pad'}
          style={{ height: 40, width: 200, borderColor: 'blue', borderWidth: 1 }}
          onChangeText={this._onChangeText}
        />
        <View style={{marginRight:10}} >
            <Button title="Save" onPress={this._getActivity}></Button>
        </View>
      </View>
      <FlatList
      styles={{flex:1}}
        data={this.state.activitiesList}
        ItemSeparatorComponent={this.renderSeparatorView}
        renderItem={({ item }) => <Item title={item.enunciado} id={item.id} resolution={item.id_resolucion} action={this._getActivity} />}
        keyExtractor={item => `list-item-${item.id}`}
      />
      </View>
      }
      </View>
    );
  }
}

