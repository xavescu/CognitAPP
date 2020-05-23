import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import styles from '../../styles/styles';
import ImagePicker from 'react-native-image-picker';
import { storeItem, getItem } from '../../CommonFunctions/ManageItems'; 

let label_RealizarEscaneo = '';
let label_ALERTAHAMIGO = '';
let label_RealizarEscaneo2 = '';
let label_Texto = '';
let label_Imagen = '';

export default class OCRButton extends Component{
        state = {
            base64: null,
            image: null,
            idioma:'',
        };

    async componentDidMount() {
        const idioma_temp = await getItem('idioma');
        this.setState({idioma : idioma_temp});
    }

    onPressHandlerImage = async() => {
        this.foto = '1';
        await storeItem('foto',this.foto);
        this._pickImage();
    }

    onPressHandlerText = async() => {
        this.foto = '0';
        await storeItem('foto',this.foto);
        this._pickImage();
    }



    render() {

        if(this.state.idioma == 'CAST') {
            label_RealizarEscaneo = 'Realizar Escaneo';
            label_ALERTAHAMIGO = '¡ALERTA!';
            label_RealizarEscaneo2 = '¿Qué deseas escanear?';
            label_Texto = 'Texto';
            label_Imagen = 'Imagen';

        }else if(this.state.idioma == 'CAT') {
            label_RealizarEscaneo = 'Realitzar Escaneig';
            label_ALERTAHAMIGO = 'ALERTA!';
            label_RealizarEscaneo2 = 'Que desitges escanejar?';
            label_Texto = 'Text';
            label_Imagen = 'Imatge';

        }else if(this.state.idioma == 'ENG'){
            label_RealizarEscaneo = 'Execute Scan';
            label_ALERTAHAMIGO = 'ALERT!';
            label_RealizarEscaneo2 = 'What you gonna scan?';
            label_Texto = 'Text';
            label_Imagen = 'Image';
        }

        const { image } = this.state;
        return(
        //'IniciarCamera'   'MuestraEditaNuevoResumen'
        <TouchableOpacity style={{ backgroundColor: '#FF0033'}} onPress={this.imageOrText}>
            <View style={styles.listItemContainer}>
                <Text style={styles.ItemHeader}>{label_RealizarEscaneo}</Text>
                <Image style={styles.pencil} source={require('../../Images/camera.png')} />
            </View>
        </TouchableOpacity>
        )
    }
    imageOrText = async () => {
        Alert.alert(
          {label_ALERTAHAMIGO},
          {label_RealizarEscaneo},
          [
            { text: label_Texto, onPress: this.onPressHandlerText },
            { text: label_Imagen, onPress: this.onPressHandlerImage }
          ],
          { cancelable: true }
        );
    }

    _pickImage = async () => {
        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
        };

        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({
                    base64: response.data,
                    image: response.uri
                });
                console.log("Image generated to base64 correctly!");
                this.uploadFile()
            }
        });
    };

    async uploadFile() {
        const { base64 } = this.state;
       if(this.foto == '0'){
           console.log('Uploading file')
           const textoScan = await query('ocr64', base64);
           console.log('Result --> ' + textoScan);
           await storeItem('textFoto', textoScan);
           console.log("resumen",this.foto);
           this.props.navigation.navigate('MuestraEditaNuevoResumen');
       }else{
           console.log("foto",this.foto);
           this.props.navigation.navigate('MuestraImagen',{textoImagen: this.state.base64});
       }
    }
}

const query = async (endpoint, form) => {
    var formdata = new FormData();
    formdata.append("img", form);
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    return await fetch("http://cognitapp.duckdns.org/"+endpoint, requestOptions)
        .then(response => response.text())
        .then(result => result)
        .catch(error => error);
}