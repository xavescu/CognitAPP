import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import styles from '../../styles/styles';
import ImagePicker from 'react-native-image-picker';
import { storeItem, getItem } from '../../CommonFunctions/ManageItems'; 

export default class OCRButton extends Component{
    state = {
        base64: null,
        image: null
    };

    render() {
        const { image } = this.state;
        return(
        //'IniciarCamera'   'MuestraEditaNuevoResumen'
        <TouchableOpacity style={{ backgroundColor: 'grey' }} onPress={this._pickImage}>
            <View style={styles.listItemContainer}>
                <Text style={styles.ItemHeader}>Realizar Escaneo</Text>
                <Image style={styles.pencil} source={require('../../Images/camera.png')} />
            </View>
        </TouchableOpacity>
        )
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
        console.log('Uploading file')
        const textoScan = await query('ocr64', base64);
        console.log('Result --> ' + textoScan);
        await storeItem('textFoto', textoScan);
        const tutorial = await getItem('tutorial');
        console.log("tutorial final 1");
        if(tutorial == 0){
            console.log("tutorial final 2");
            this.disableTutorial();
        } 
        this.props.navigation.navigate('MuestraEditaNuevoResumen');

    }

    async disableTutorial(){
        try{
            console.log("tutorial final 3");
            const id = await getItem('idUsuario');
            const res = await query('disableTutoriala', { "id": id });
            console.log("tutorial final 4 --> ", res.status);
            if(res.status == true){
                alert("Tutorial Completado");
            }
        }catch(err){
            console.log("Error getting Disable tutorial->", err);
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