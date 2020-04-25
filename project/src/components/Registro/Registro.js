import React, { Component } from 'react';
import { View, Text,StyleSheet, 
    TextInput,ScrollView,Button,
    TouchableOpacity} from 'react-native';
import { white } from 'color-name';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import console = require('console');




let nombre = this.nombre;
let apellido= this.apellido;
let direccion = this.direccion;
let email = this.email;
let password = this.password;

 class Registro extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email:'',
        nombre:'',
        user:'',    
        password:'',
      
    };
  }

  SetAsignatura=()=>{Functions.SetAsignatura()}

  registro = ()=>{
    var params = {
        email:this.state.email,
        nombre: this.state.nombre,
        user: this.state.user,
        password: this.state.password
    }
    //console.log("params", params);
    var formData = new FormData();
    for (var k in params) {
        formData.append(k, params[k]);
    }
    console.log("res de registro--->", formData)
    var request = {
        method: 'POST',
        headers: {
            'Accept': 'x-www-form-urlencoded',
            'Content-Type': 'x-www-form-urlencoded'
        },
        body: formData
    };

    fetch('http://cognitapp.duckdns.org/register',request)
    .then((response) => response.json())
    .then((res) => {

      console.log("res de registro--->", res)
        if (res.status==true){
            console.log(" Registro Response----->", res )
            //this.siguiente();
            alert('Registrado correctamente')
        }
        else {
            alert('Error en el registro');
        }
    })
    .done();
}

//pasamos a la sigiente ventana
siguiente=()=>{
  navigate.navigate('Login');
}



  render() {
    return (
        <View style = {styles.LoginGeneral}> 
        <ScrollView>
            <View >
                <Text style={styles.TextHeader}>CogniAppRegistro!!</Text>
            </View> 
            <View style = {styles.BodyHeader}>    
                <TouchableOpacity>
                      <Text>Nombre :</Text>
                      <TextInput 
                      placeholder="" 
                      placeholderTextColor="rgba(255,255,255,0.7)"
                      maxLength={10} 
                      returnKeyType="next"
                      autoCapitalize="none" 
                      underlineColorAndroid ='transparent'
                      onChangeText={(nombre) => this.setState({nombre})}
                      style = {styles.UserPass}
                      />
                </TouchableOpacity>

                <TouchableOpacity>
                      <Text>user :</Text>
                      <TextInput 
                      placeholder="" 
                      placeholderTextColor="rgba(255,255,255,0.7)"
                      maxLength={10} 
                      returnKeyType="next"
                      autoCapitalize="none" 
                      underlineColorAndroid ='transparent'
                      onChangeText={(user) => this.setState({user})}
                      style = {styles.UserPass}
                      />
                </TouchableOpacity>

                <TouchableOpacity>
                        <Text>Email :</Text>
                        <TextInput 
                        placeholder="" 
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        maxLength={30} 
                        returnKeyType="next"
                        autoCapitalize="none" 
                        underlineColorAndroid ='transparent'
                        onChangeText={(email) => this.setState({email})}
                        style = {styles.UserPass}
                        />
                </TouchableOpacity>
                    
                <TouchableOpacity >
                      <Text>Password :</Text>
                      <TextInput 
                      placeholder="" 
                      placeholderTextColor="rgba(255,255,255,0.7)"
                      maxLength={10} 
                      returnKeyType="next"
                      autoCapitalize="none" 
                      underlineColorAndroid ='transparent'
                      secureTextEntry={true}
                      onChangeText={(password) => this.setState({password})}
                      style = {styles.UserPass}
                      />
                </TouchableOpacity>

            </View> 
                <View style = {styles.botonRegistro}>
                    <Button 
                        title='Registrar'
                        color="#084081" 
                        style = {styles.botonLogin} 
                        onPress={()=>this.registro()}/>
                </View> 
               
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  
    LoginGeneral:{
      flex:1,
      flexDirection:'column',
      backgroundColor:'#4eb3d3',

    },
    LoginHeader:{
        flex:0.15,
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
      justifyContent:'space-around',
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
  
  })

export default Registro;
