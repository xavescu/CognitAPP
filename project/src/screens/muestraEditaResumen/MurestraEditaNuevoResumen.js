import React, { Component } from 'react';
import { Text, View, TextInput, Alert, componentDidMount, TouchableOpacity } from 'react-native';

import styles from '../../styles/styles';
import { query } from '../../CommonFunctions/fetchQuery';

let auxText;
let auxName;
let exist = false;

class MuestraEditaNuevoResumen extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            id_tema: '1',
            id_resumen: '2',
            nombre_tema: '',
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

    consultaResumen = async () => {
        try {
            var params = {
                id: this.state.id_tema
            }
            const res = await query('queryResumenes', params);
            if (res.status == true) {
                console.log("response ----->", res.tema);
                console.log("response_2 ----->",res.resumenes);
                alert("Resumen recuperado");
                for (let i = 0; i < res.resumenes.length; i++) {
                    if(this.state.id_resumen == res.resumenes[i].id){
                        auxText = res.resumenes[i].texto;
                        auxName = res.resumenes[i].nombre;
                        this.setState({text: auxText, nombre_documento: auxName});
                        exist = true;
                    }
                }
                if(!exist){
                    alert("El resumen no existe con la id:",this.state.id_resumen);
                }
            }else {
                console.log("response -->>>>" , res)
                alert('Error');
            }
        }catch(error){
           console.log("ERROR", error);
        }
    }

    editaResumen = async () => {
        try{
            var params = {
                id: this.state.id_resumen,
                nombre: this.state.nombre_documento,
                texto: this.state.text,
                tema: this.state.id_tema,
                tipo: this.state.tipo
            }
            const res = await query('changeResumen', params);
             if (res.status == true) {
                console.log("response ----->", res);
                alert("Cambios guardados");
             }else {
                console.log("response -->>>>" , res)
                alert("Cambios guardados");
             }
        }catch(error){
         console.log("ERROR", error);
        }
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