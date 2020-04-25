import React, { Component } from 'react';
import { View, Text, 
  StyleSheet,TouchableOpacity,TextInput,
   Button, Alert,componentDidMount,
   ScrollView,AsyncStorage} from 'react-native';
import {Tts} from 'react-native-tts';
import Functions from '../../functions/Functions';
import Speaking from '../../functions/index';
//import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Bienvenido from '../Bienvenido/Bienvenido'
//import App from '../../../App_bueno';


const STATUS = 'status';

 class Asignatura extends Component {
  

    //login =()=>{Functions.login()}
   // registro=()=>{Functions.registro()}
    //Speak=()=>{Speaking.OnSpeak()}
 
constructor(props){
  super(props);
  this.state = {
    nombreAsig: '',
      userID : '',
      status:false
  }
}




SetAsignatura = ()=> {
  navigate = this.props.navigation;
  var params = {
    nombre: this.state.nombreAsig,
        id: this.state.userID,
  }
  console.log("params", params);
  var formData = new FormData();
  for (var k in params) {
      formData.append(k, params[k]);
  }
 console.log("params-- Asignatura--->", formData);
  var request = {
      method: 'POST',
      headers: {
          'Accept': 'x-www-form-urlencoded',
          'Content-Type': 'x-www-form-urlencoded'
      },
      body: formData
  };
  //console.log("request", request)

  fetch('http://cognitapp.duckdns.org/storeSubject',request)
  .then((response) => response.json())
  .then((res) => {
      
      if (res.status==true){
           
          //this.siguiente();
        
      }
      else {
          alert('Error');
      }
  })
  .done();
}

 GetAsignatura = ()=> {
    navigate = this.props.navigation;
    
    let user= AsyncStorage.getItem(STATUS);

    console.log("GetAsignatura---->:",user)
    var params = {
          id: user,
    }
    console.log("params", params);
    var formData = new FormData();
    for (var k in params) {
        formData.append(k, params[k]);
    }
   
    var request = {
        method: 'POST',
        headers: {
            'Accept': 'x-www-form-urlencoded',
            'Content-Type': 'x-www-form-urlencoded'
        },
        body: formData
    };
   
    fetch('http://cognitapp.duckdns.org/querySubjects',request)
    .then((response) => response.json())
    .then((res) => {
        if (res.status==true){
          console.log("DENTRO DEL RESPONSE ------>" , res)
            //falta ver como recorrer el array y sacar los valores.....
            //this.siguiente();
           //console.log('id de la asignatura--->',res.Asignatura.id);
            //console.log('Nombre de la asignatura--->',res.Asignatura.nombre )
          
        }
        else {
            alert('Error');
        }
    })
    .done();  
  }

signOut=()=>{

   Alert.alert("salimos");
  
}



  render() {
    navigate = this.props.navigation;

    nombreAsig = this.state.nombreAsig;
    userID= this.state.userID;

    
    return (
      

        <View style = {styles.LoginGeneral}>
          
          <ScrollView> 
           <View style = {styles.LoginHeader}>
              <Text style={styles.TextHeader}> CogniApp!! </Text>
           </View> 

            <View style = {styles.BodyHeader}> 
              
                  <TouchableOpacity>
                      <Text>Nombre Asignatura :</Text>
                      <TextInput 
                          placeholder="" 
                          placeholderTextColor="rgba(255,255,255,0.7)"
                          maxLength={30} 
                          returnKeyType="next"
                          autoCapitalize="none"
                          underlineColorAndroid ='transparent'
                          onChangeText={(nombreAsig)=>this.setState({nombreAsig})} 
                          style = {styles.UserPass}
                      />     
                  
                  </TouchableOpacity>
                  
                  <TouchableOpacity>
                      <Text>Id---backend :</Text>
                      <TextInput 
                      placeholder="" 
                      placeholderTextColor="rgba(255,255,255,0.7)"
                      maxLength={10} 
                      returnKeyType="next"
                      autoCapitalize="none" 
                      underlineColorAndroid ='transparent'
                      //secureTextEntry={true}
                      onChangeText={(userID)=>this.setState({userID})}
                      style = {styles.UserPass}
                      />
                  </TouchableOpacity>
                  
                  <Button 
                      title = "Añadir" 
                      color="#084081" 
                      style = {styles.botonLogin} 
                     
                      onPress={()=>this.SetAsignatura()}
                   />

                    <Button 
                      title = "Recuperar" 
                      color="#084081" 
                      style = {styles.botonLogin} 
                     
                      onPress={()=>this.GetAsignatura()}
                   />   

                  <Text>Signed in!</Text>
                  <Button title="Sign out" onPress={()=>this.signOut()} />     
                  
              <Text>{this.props.user} </Text>
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
export default Asignatura