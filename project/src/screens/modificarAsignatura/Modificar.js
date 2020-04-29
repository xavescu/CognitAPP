import React, { Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Picker,
  TouchableOpacity,
  CheckBox,
  Modal,
  TextInput,
} from 'react-native';

import styles from '../../styles/styles';
import { query } from '../../CommonFunctions/fetchQuery';
import { storeItem, getItem } from '../../CommonFunctions/ManageItems';



export default class Modificar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NombreAsignatura:'Default',
      NuevoNombre:'Default',
      update: false,
    };
  }

  async componentDidMount() {
    try {
        const nombreAsignatura = await getItem('nombreAsignatura');
        this.setState({NombreAsignatura: nombreAsignatura});
        this.setState({NuevoNombre: nombreAsignatura});
    } catch (err) {
        console.log("Error getting Asignaturas data->", err);
    }
  }

  async VerificaNombre(){
    try {
      const id = await getItem('idUsuario');
      const res = await query('querySubjects', { "id": id });
      if (res.asignaturas!=""){
        for(let i=0;i<res.asignaturas.length;i++ )
          {
            if( res.asignaturas[i].nombre==this.state.NuevoNombre){
              alert("Error Nombre xistente");
              this.setState({update: false});
              break;
            }else {
              //this.ModificarAsignatura();
              this.setState({update: true});
            }
          }
          if(this.state.update == true){
            this.setState({update: false});
            this.ModificarAsignatura();
          }
      }
      else {
          alert('Error');
      }
    } catch (err) {
        console.log("Error getting Asignaturas data->", err);
    }
  }

  async ModificarAsignatura(){
    try {
      const nombreAsignatura = await getItem('nombreAsignatura');
      const id = await getItem('idUsuario');
      const res = await query('changeSubject', { "id": id, "nombre": nombreAsignatura, "nuevonombre": this.state.NuevoNombre });
      if (res.status == true){
        alert("Nombre Cambiado Correctamente");
      }
      else {
          alert('Error');
      }
    } catch (err) {
        console.log("Error creating Asignaturas data->", err);
    }
  }

  async DeleteAsignatura(){
    try {
      const nombreAsignatura = await getItem('nombreAsignatura');
      const id = await getItem('idUsuario');
      const res = await query('deleteSubject', { "id": id, "nombre": nombreAsignatura });
      if (res.status==true){
        alert("Eliminado Correctamente");
      }
      else {
          alert('Error al eliminar');
      }
    } catch (err) {
        console.log("Error creating Asignaturas data->", err);
    }
  }

  /*DeleteAsignatura = ()=> { 
    var form = {
      id: this.state.IdUsuario,
      nombre: this.state.NombreAsignatura
    }
    console.log("form",form);
    var formBody = [];
    for (var property in form) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(form[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return fetch('http://cognitapp.duckdns.org/deleteSubject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'        
      },
      body: formBody
    })
    .then((response) => response.json())
    .then((res) => {
      console.log("res--->",res)
      if (res.status==true){
          alert("Eliminado Correctamente");
         
      }
        else {
            alert('Error');
        }
    }) 
  }*/
 


  render() {
    return (
      <View style = {styles.LoginGeneral}> 
        <Text  style = {styles.BodyHeader} > EditarAsignatura </Text>
        <TouchableOpacity>
                      <Text>Nombre Asignatura :</Text>
                      <TextInput 
                          placeholder= {this.state.NombreAsignatura}
                          placeholderTextColor="rgba(255,255,255,0.7)"
                          maxLength={50} 
                          returnKeyType="next"
                          autoCapitalize="none"
                          underlineColorAndroid ='transparent'
                          onChangeText={(NuevoNombre)=>this.setState({NuevoNombre})} 
                          style = {styles.UserPass}
                      />     
                  
                  </TouchableOpacity>

                  <Button 
                      title = "Editar" 
                      color="#084081" 
                      style = {styles.botonLogin} 
                     
                      onPress={()=>this.VerificaNombre()}
                   />

                  <Button 
                      title = "Eliminar" 
                      color="#084081" 
                      style = {styles.botonLogin}
                      onPress={()=>this.DeleteAsignatura()}
                   />
      </View>
    );
  }
}

/*const styles = StyleSheet.create({
  
  LoginGeneral:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#4eb3d3',
    alignItems :'center',
    justifyContent:'center',

  },
  LoginHeader:{
      flex:0.5,
      backgroundColor:'#4eb3d3',
      color:'white',
      justifyContent:'center',
      textAlign:'center'
  },
  TextHeader:{
      color:'white',
      fontSize:30,
      textAlign:'center',
      justifyContent:'center',
      padding:60,
  },
  BodyHeader:{
    flex: 0.5,
    alignItems :'center',
    justifyContent:'center',
    backgroundColor:'#4eb3d3',
  },

  botonLogin:{
      textAlign: 'center',
      color: '#FFFFFF',
      fontWeight: '700',
      borderBottomColor:'black'
  },
  botonRegistro:{
    marginTop:10
  },

  UserPass:{
    width:130,
    height:30,
    borderWidth:1,
    borderColor:'white',
    padding:5, 
    marginVertical:10
  }

})*/