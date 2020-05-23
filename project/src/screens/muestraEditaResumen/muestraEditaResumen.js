import React, { Component } from 'react';
import { Text, View, TextInput, Alert, componentDidMount, TouchableOpacity, Modal, Button } from 'react-native';

import styles from '../../styles/styles';
import { query } from '../../CommonFunctions/fetchQuery';
import { storeItem, getItem } from '../../CommonFunctions/ManageItems';

let auxText;
let auxName;
let exist = false;
let label_SeVaHaCompartirA = '';
let label_GuardarCanvios = '';
let label_EditaResumen = '';
let label_Compartir = '';
let label_UsernameAmigo = '';
let label_Cancelar = '';

class MuestraEditaResumen extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            id_tema: '',
            id_resumen: '',
            nombre_documento: '',
            tipo:'0',
            editable: false,
            showCompartir: false,
            userAmigo: 'Default',
            idioma: ''
        };
        this.toggleEditable = this.toggleEditable.bind(this);
    }

    async componentDidMount() {
        const idioma_temp = await getItem('idioma');
        this.setState({idioma: idioma_temp});
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
            const id_t = await getItem("id_tema");
            const id_res = await getItem("id_resumen");
            var params = {
                id: id_t
            }
            const res = await query('queryResumenes', params);
            if (res.status == true) {

                alert("Resumen recuperado");
                for (let i = 0; i < res.resumenes.length; i++) {
                    if(id_res == res.resumenes[i].id){
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
            const id_t = await getItem("id_tema");
            const id_res = await getItem("id_resumen");
            var params = {
                id: id_res,
                nombre: this.state.nombre_documento,
                texto: this.state.text,
                tema: id_t,
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
    showVentana =()=>{
        this.setState({showCompartir: true});
    }
    cancelar=()=>{
        this.setState({showCompartir: false});
    }

    CompartirUsuario = async () =>{
        try{
            const id_res = await getItem("id_resumen");
            console.log("Compartir: " + id_res + " - " + this.state.userAmigo);
            var params = {
                "id": id_res,
                "user": this.state.userAmigo
            }
            const res = await query('share', params);
            console.log("comprtir codigo : "+ res.code);
            console.log("comprtir status : "+ res.status);
             if (res.status == true) {
                alert("Comparte este codigo: " + res.code);
                this.cancelar();
             }else {
                alert("Error al compartir");
             }
        }catch(error){
         console.log("ERROR", error);
        }
    }

    render(){

        if(this.state.idioma == 'CAST'){
            label_SeVaHaCompartirA = 'Se va ha compartir a: ';
            label_GuardarCanvios = 'Guardar canvios';
            label_EditaResumen = 'Edita Resumen';
            label_Compartir = 'Compartir';
            label_UsernameAmigo = 'Username amigo';
            label_Compartir = 'Compartir';
            label_Cancelar = 'Cancelar'
        }else if(this.state.idioma == 'CAT'){
            label_SeVaHaCompartirA = 'Es compartirà a: ';
            label_GuardarCanvios = 'Guardar canvis';
            label_EditaResumen = 'Edita Resum';
            label_Compartir = 'Compartir';
            label_UsernameAmigo = 'Username amic';
            label_Compartir = 'Compartir';
            label_Cancelar = 'Cancel·lar';
        }else if(this.state.idioma == 'ENG'){
            label_SeVaHaCompartirA = 'It will be share: ';
            label_GuardarCanvios = 'Save changes';
            label_EditaResumen = 'Edit Resume';
            label_Compartir = 'Share';
            label_UsernameAmigo = 'Friends Username';
            label_Compartir = 'Share';
            label_Cancelar = 'Cancel';
        }

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

                <Modal visible={this.state.showCompartir}
                transparent = {true}>
                    <View style = {styles.vModal2}>
                        <Text>{label_SeVaHaCompartirA}</Text>
                        <View >
                            <TextInput
                            placeholder= {label_UsernameAmigo}
                            onChangeText={(userAmigo)=>this.setState({userAmigo})}
                            />
                        <Button
                            title={label_Compartir}
                            onPress = {()=>this.CompartirUsuario()}
                        />
                        <Button
                            title={label_Cancelar}
                            onPress = {()=>this.cancelar()}
                        />
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity disabled={this.state.editable}
                    style={!this.state.editable ? styles.ButtonEdit : styles.ButtonEditDisabled}
                    onPress={this.toggleEditable}
                >
                    <Text style={styles.textStyle}>{label_EditaResumen}</Text>
                </TouchableOpacity>

                <TouchableOpacity disabled={!this.state.editable}
                    style={!this.state.editable ? styles.ButtonChangeDisabled : styles.ButtonChange}
                    onPress={this.editaResumen}
                >
                    <Text style={styles.textStyle}>{label_GuardarCanvios}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ButtonShare} onPress = {()=>this.showVentana()}>
                    <Text style={styles.textStyle}>{label_Compartir}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default MuestraEditaResumen;