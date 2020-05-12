import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

import styles from '../../styles/styles';
import { storeItem, getItem } from '../../CommonFunctions/ManageItems'; 




class MuestraEditaNuevoResumen extends Component {

    constructor(props){
        super(props);
        this.state = {
            text: '',
            tipo:'0',
            editable: false,
           
        };
    }


    componentDidMount() {
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
    }

    GuardaResumen = async() => {

        await storeItem('textFoto',this.state.text)
        console.log("guarda--->",this.state.text)
        this.props.navigation.navigate('GuardaTextoScan');
        //cambia la pantalla
    }


    render(){


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
                    <Text style={styles.textStyle}> Guardar </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default MuestraEditaNuevoResumen;