import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

import styles from '../../styles/styles';

class MuestraEditaNuevoResumen extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: this.props.resultText,
            nombre_documento: '',
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

    consultaResumen = () => {
        this.setState({text: 'Text_Sample', nombre_documento:'<Select a Name>'})
    }

    editaResumen = () => {
        // Funcion responsable de enviar el nuevo String a la screen de Hansk&Sergio y navegar a esta misma screen

    }

    render(){
        return (
            <View style={styles.MainContainerMostrarResumen}>
                <TextInput
                    placeholder=""
                    value = {this.state.nombre_documento}
                    style={{fontWeight: 'bold'}}
                    editable={this.state.editable}
                    onChangeText={this.handleChangeName}
                />

                <TextInput
                    placeholder=""
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