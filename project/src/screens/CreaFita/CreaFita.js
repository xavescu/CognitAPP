import React, { Component } from 'react';
import { Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker'

import styles from '../../styles/styles';
import { query } from '../../CommonFunctions/fetchQuery';
import { storeItem, getItem } from '../../CommonFunctions/ManageItems';


let label_CrearFita = '';
let label_Nombre = '';
let label_Descripcion = '';
let label_Crear = '';

export default class MuestraEditaResumen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          NombreFita:'Default',
          Descripcion:'',
          date:'2020-05-15',
          tipo_recordatorio: 0,
          update: false,
          idioma: ''
        };
      }

      componentDidMount = async () => {
        const idioma_temp = await getItem('idioma');
        this.setState({idioma: idioma_temp});
        var d=new Date();
        this.setState({date:d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()});
      }

      CrearFita= async () =>{
        try {
          const idUsuario = await getItem('idUsuario');
          const res = await query('storeFita', {
            "id": idUsuario,
            "nombre": this.state.NombreFita,
            "descripcion": this.state.Descripcion,
            "fecha_limite": this.state.date,
            "tipo_recordatorio": this.state.tipo_recordatorio
        });
          if (res.status==true){
            alert("Fita creada correctamente");
          }
          else {
              alert('Error en la creación de la fita');
          }
        } catch (err) {
            console.log("Error en la creación de la fita->", err);
        }
      }

    render() {


    if(this.state.idioma == 'CAST'){
      label_CrearFita = 'Crear Hito';
      label_Nombre = 'Nombre: ';
      label_Descripcion = 'Descripcion:';
      label_Crear = 'Crear';
    }else if(this.state.idioma == 'CAT'){
      label_CrearFita = 'Crear Fita';
      label_Nombre = 'Nom:';
      label_Descripcion = 'Descripcio:';
      label_Crear = 'Crear';
    }else if(this.state.idioma == 'ENG'){
      label_CrearFita = 'Create Goal';
      label_Nombre = 'Name';
      label_Descripcion = 'Description';
      label_Crear = 'Create';
    }

    return (
      <View style = {styles.LoginGeneral}> 
        <Text  style = {styles.BodyHeader} >{label_CrearFita}</Text>
                    <TouchableOpacity>
                      <Text>{label_Nombre}</Text>
                      <TextInput 
                          placeholder= "Nombre de hito"
                          placeholderTextColor="rgba(255,255,255,0.7)"
                          maxLength={50} 
                          returnKeyType="next"
                          autoCapitalize="none"
                          underlineColorAndroid ='transparent'
                          onChangeText={(NombreFita)=>this.setState({NombreFita})} 
                          style = {styles.UserPass}
                      />     
                  
                  </TouchableOpacity>
                  <TouchableOpacity>
                      <Text>{label_Descripcion}</Text>
                      <TextInput 
                          placeholder= "Nombre de hito"
                          placeholderTextColor="rgba(255,255,255,0.7)"
                          maxLength={50} 
                          returnKeyType="next"
                          autoCapitalize="none"
                          underlineColorAndroid ='transparent'
                          onChangeText={(NombreFita)=>this.setState({NombreFita})} 
                          style = {styles.UserPass}
                      />     
                  
                  </TouchableOpacity>
                  <DatePicker
                    style={{width: 200}}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                />
                  <Button 
                      title = {label_Crear}
                      color="#084081" 
                      style = {styles.botonLogin}
                      onPress={()=>this.CrearFita()}
                   />
      </View>
    );
  }
}