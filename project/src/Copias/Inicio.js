/*
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput,Alert} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Registro from '../Registro/Registro';
import Login from '../Login/Login';
import Asignatura from '../Asignaturas/Asignaturas'


export default class Inicio extends Component {

  render() {
    navigate = this.props.navigation;
  
    return (
      
    <View style = {styles.LoginGeneral}>  
    
      
        <View style = {styles.LoginHeader}>
            <Text style={styles.TextHeader}> CogniApp!!</Text>
        </View> 

        <View style = {styles.BodyHeader}> 
            <View style={{flex: 0.1, backgroundColor: 'orange'}}>

            </View>
            <Button
              title="Go to Inicio"
              style = {styles.botonLogin}
              onPress={() => navigate.navigate('Login')}
            />
            <Button
              title="Go to Registro"
              style = {styles.botonRegistro}
              onPress={() => navigate.navigate('Registro')}
            />

            <Button
              title="Go to Bienvenido"
              style = {styles.botonRegistro}
              onPress={() => navigate.navigate('Bienvenido')}
            />

<Button
              title="Go to Asignatura"
              style = {styles.botonRegistro}
              onPress={() => navigate.navigate('Asignatura')}
            />
            
            
            <View style={{flex: 0.2, backgroundColor: 'orange'}}>

            </View>
        </View>
    </View>
      
    );
  }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor :'peru',
        flexDirection: 'column',
    },
    LoginGeneral:{
        flex:2,
        justifyContent: 'center',
        textAlign:'center'
      },
      LoginHeader:{
          flex:0.15,
          backgroundColor:'#4eb3d3',
          color:'white'
      },
      TextHeader:{
          color:'white',
          fontSize:30,
          textAlign:'center',
          justifyContent:'center',
          padding:60,
      },
      BodyHeader:{
        flex: 1,
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
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700',
        borderBottomColor:'black'
      },
    
      UserPass:{
        width:130,
        height:30,
        borderWidth:1,
        borderColor:'white',
        padding:5, 
        marginVertical:10
      }
});
*/ 