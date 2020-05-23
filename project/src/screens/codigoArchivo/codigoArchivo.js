import React, { Component } from 'react';
import { Text, View, TextInput, Alert, componentDidMount, TouchableOpacity, Modal, Button } from 'react-native';
import styles from '../../styles/styles';
import RNFetchBlob from 'react-native-fetch-blob'

export default class codigoArchivo extends Component {
    constructor(props) {
      super(props);
      this.state = {
        codigoAmigo: 'Default',
      };
    }

    descargarArchivo = async () =>{
      var fullPath = '/storage/emulated/0/Download/descargaCognitApp.pdf';
        try {
            let value =   await RNFetchBlob
            .config({
              fileCache : true,
              appendExt : 'pdf',
              path : fullPath
              })
             .fetch('GET','http://cognitapp.duckdns.org/document/'+this.state.codigoAmigo, {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8,ca;q=0.7',
            })
            .then((res) => {
              console.log("recibir", res);
              alert("PDF descargado correctamente en Descargas!");
            })
          }
           catch (error) {
            console.log('The file saved get an error ' + this.state.codigoAmigo);
          }
  }
    render() {
      return (
        <View style={styles.codigoAmigo}>
          <TextInput
          placeholder= 'Codigo amigo'
          onChangeText={(codigoAmigo)=>this.setState({codigoAmigo})}
          />
          <Button
              title="Descargar Archivo"
              color="#FF0033"
              style = {styles.botonLogin}
              onPress = {()=>this.descargarArchivo()}
          />
        </View>
      );
    }
  }
