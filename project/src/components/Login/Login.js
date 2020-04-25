import React, { Component,AsyncStorage } from 'react';
import { View, Text, 
  StyleSheet,TouchableOpacity,TextInput,
   Button, Alert,componentDidMount,
   ScrollView} from 'react-native';
import {Tts} from 'react-native-tts';
import Functions from '../../functions/Functions';
import Speaking from '../../functions/index';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Bienvenido from '../Bienvenido/Bienvenido'


 class Login extends Component {
  

    //login =()=>{Functions.login()}
   // registro=()=>{Functions.registro()}
    Speak=()=>{Speaking.OnSpeak()}
 
constructor(props){
  super(props);
  this.state = {
      user: '',
      password : '',
      status:false
  }
}

login = ()=> {
  navigate = this.props.navigation;
  var params = {
      user: this.state.user,
      password: this.state.password,
  }
  console.log("params", params);
  var formData = new FormData();
  for (var k in params) {
      formData.append(k, params[k]);
  }

  console.log("formdata", formData)
  
  var request = {
      method: 'POST',
      headers: {
          'Accept': 'x-www-form-urlencoded',
          'Content-Type': 'x-www-form-urlencoded'
      },
      body: formData
  };
  //console.log("request", request)

  fetch('http://cognitapp.duckdns.org/login',request)
  .then((response) => response.json())
  .then((res) => {
      if (res.id!=""){
          console.log('Asignaturas añadidas ------->',res.asignaturas);
          //this.setState({status:true});
          this.siguiente();
         
          alert('Logeado correctamente')   
      }
      else {
          alert('Error');
      }
  })
  .done();

 //return () => this.state.status==true? console.log('trueeee'): console.log('falseeee')
  
}

siguiente=()=>{

  navigate.navigate('Bienvenido');
}

  render() {
    navigate = this.props.navigation;

    username = this.state.user;
    pass= this.state.password;

    
    return (

        <View style = {styles.LoginGeneral}>
          
          <ScrollView> 
           <View style = {styles.LoginHeader}>
              <Text style={styles.TextHeader}> CogniApp!! </Text>
           </View> 

            <View style = {styles.BodyHeader}> 
              
                  <TouchableOpacity>
                      <Text>Nombre:</Text>
                      <TextInput 
                          placeholder="" 
                          placeholderTextColor="rgba(255,255,255,0.7)"
                          maxLength={30} 
                          returnKeyType="next"
                          autoCapitalize="none"
                          underlineColorAndroid ='transparent'
                          onChangeText={(user)=>this.setState({user})} 
                          style = {styles.UserPass}
                      />     
                  
                  </TouchableOpacity>
                  
                  <TouchableOpacity>
                      <Text>Password :</Text>
                      <TextInput 
                      placeholder="" 
                      placeholderTextColor="rgba(255,255,255,0.7)"
                      maxLength={10} 
                      returnKeyType="next"
                      autoCapitalize="none" 
                      underlineColorAndroid ='transparent'
                      secureTextEntry={true}
                      onChangeText={(password)=>this.setState({password})}
                      style = {styles.UserPass}
                      />
                  </TouchableOpacity>
                  
                  <Button 
                      title = "Login" 
                      color="#084081" 
                      style = {styles.botonLogin} 
                     
                      onPress={()=>this.login()}
                   />
                  
                    <Button 
                      title = "Genera Audio" 
                      color="#084081" 
                      style = {styles.botonLogin} 
                      onPress={()=>this.Speak()} 
                      
                   />

                 
                
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
export default Login