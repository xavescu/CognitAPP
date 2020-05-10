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
        this.toggleEditable = this.toggleEditable.bind(this);
    }

    
    componentDidMount() {
      this.consultaResumen();
    }

    handleChangeName=(e)=>{
        this.setState({
            nombre_documento: e
        });
    }

    handleChangeText=(e)=>{
        this.setState({
            text: e
        });
    }

    toggleEditable() {
        this.setState({
            editable: !this.state.editable
        });
    }

    consultaResumen  = async() => {
        const aux = await getItem('textFoto');
        this.setState({text:aux});
        await AsyncStorage.removeItem('textFoto');
        
    }

    editaResumen = () => {
        // Funcion responsable de enviar el nuevo String a la screen de Hansk&Sergio y navegar a esta misma screen

    }
    

    render(){

      
      
        return (
            <View style={styles.MainContainerMostrarResumen}>
                
                <TextInput
                    placeholder='Texto Recibido'
                    value = {this.state.text}
                    multiline={true}
                    editable={this.state.editable}
                    onChangeText={this.handleChangeText}
                 />

                <TouchableOpacity disabled={this.state.editable}
                    style={!this.state.editable ? styles.ButtonEdit : styles.ButtonEditDisabled}
                    onPress={this.toggleEditable}
                >
                    <Text style={styles.textStyle}> Editar resumen </Text>
                </TouchableOpacity>

                <TouchableOpacity disabled={!this.state.editable}
                    style={!this.state.editable ? styles.ButtonChangeDisabled : styles.ButtonChange}
                    onPress={this.editaResumen}
                >
                    <Text style={styles.textStyle}> Guardar cambios </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default MuestraEditaNuevoResumen;