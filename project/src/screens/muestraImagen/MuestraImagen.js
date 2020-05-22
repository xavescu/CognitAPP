import React, { Component } from 'react';

import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

import styles from '../../styles/styles';
import { storeItem, getItem } from '../../CommonFunctions/ManageItems';




class MuestraImagen extends Component {

    constructor(props){
        super(props);
        this.state = {
            text: '',
            tipo:'0',
        };
        this.base64 = this.props.route.params.textoImagen;
    }


    GuardaResumen = async() => {
        await storeItem('textFoto',this.base64)
        const foto = await getItem('foto');
        const textFoto = await getItem('textFoto');
        //console.log("guarda--->",foto,"<--- guarda")
        //console.log("guarda--->",textFoto,"<--- guarda")
        this.props.navigation.navigate('GuardaTextoScan');
        //cambia la pantalla
    }


    render(){
        return (
            <View style={styles.MainContainerMostrarResumen}>
                <Image style={{width: 150, height: 350, borderWidth: 1, borderColor: 'black', resizeMode: 'cover'}} source={{uri: `data:image/png;base64,${this.base64}`}}/>

                <TouchableOpacity
                    style={styles.ButtonChange}
                    onPress={this.GuardaResumen}
                >
                    <Text style={styles.textStyle}> Guardar </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default MuestraImagen;