import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

import styles from '../../styles/styles';
import { storeItem, getItem } from '../../CommonFunctions/ManageItems'; 


let label_Guardar = '';

class MuestraEditaNuevoResumen extends Component {

    constructor(props){
        super(props);
        this.state = {
            text: '',
            tipo:'0',
            editable: false,
            idioma:''
        };
    }


    async componentDidMount() {
      const idioma_tmp = await getItem('idioma');
      this.setState({idioma : idioma_tmp});
      this.consultaResumen();
    }

    handleChangeText=(e)=>{
        this.setState({
            text: e
        });
    }

    consultaResumen  = async() => {
        const aux = await getItem('textFoto');
        this.setState({text:aux});
        //console.log(this.state.text,"textoo");
    }

    GuardaResumen = async() => {

        await storeItem('textFoto',this.state.text)
        console.log("guarda--->",this.state.text)
        this.props.navigation.navigate('GuardaTextoScan');
        //cambia la pantalla
    }


    render(){
        if(this.state.idioma == 'CAST' || this.state.idioma == 'CAT'){
             label_Guardar = 'Guardar';
        }else if(this.state.idioma == 'ENG'){
             label_Guardar = 'Save';
        }

        return (
            <View style={styles.MainContainerMostrarResumen}>

                <TextInput
                    placeholder='Texto Recibido'
                    value = {this.state.text}
                    multiline={true}
                    onChangeText={this.handleChangeText}
                 />

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

export default MuestraEditaNuevoResumen;