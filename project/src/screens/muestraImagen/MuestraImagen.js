import React, { Component } from 'react';

import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

import styles from '../../styles/styles';
import { storeItem, getItem } from '../../CommonFunctions/ManageItems';


let label_Guardar = '';

class MuestraImagen extends Component {

    constructor(props){
        super(props);
        this.state = {
            text: '',
            tipo:'0',
            idioma:''
        };
        this.base64 = this.props.route.params.textoImagen;
    }

    async componentDidMount() {
        const idioma_temp = await getItem('idioma');
        this.setState({idioma : idioma_temp});
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

        if(idioma == 'CAST' || idioma == 'CAT'){
            label_Guardar = 'Guardar';
        }else if(idioma == 'ENG'){
            label_Guardar = 'Save';
        }

        return (
            <View style={styles.MainContainerMostrarResumen}>
                <Image style={{width: 150, height: 350, borderWidth: 1, borderColor: 'black', resizeMode: 'cover'}} source={{uri: `data:image/png;base64,${this.base64}`}}/>

                <TouchableOpacity
                    style={styles.ButtonChange}
                    onPress={this.GuardaResumen}
                >
                    <Text style={styles.textStyle}>{label_Guardar}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default MuestraImagen;