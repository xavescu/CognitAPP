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
import Bienvenido from '../Bienvenido/Bienvenido';
import { AuthContext } from '../../../context';
//import App from '../../../App_bueno';
import { SignIn } from '../../../Screens';



 class Configuracion extends Component {
  
  //llamada de funciones
  Siguiente =()=>{Functions.login()}
  GoRegistro=()=>{Functions.GoRegistro()}
  Speak=()=>{Speaking.OnSpeak()}

 

  constructor(props){
    super(props);
    this.state = {
        id: '',
        nuevonombre:'',
        email:'',
        password:'',
        nickname:'',
    }
  }



SetRegistro = ()=> {

    //recuperar el id  y cargarlo desde bck


  //navigate = this.props.navigation;

  var params = {
      //id: this.state.id,
      id: "16",
      nuevonombre: this.state.nuevonombre,
      /*
      email: this.state.email,
      password: this.state.password,
      nickname: this.state.nickname,
      */
       
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

  fetch('http://cognitapp.duckdns.org/updateUser',request)
  .then((response) => response.json())
  .then((res) => {
      if (res.changed==true){
          console.log("respuesta conficuracion---->>>", res);
          this.siguiente();
          alert('Cambios realizados correctamente')   
      }
      else {
          console.log("error----->",res);
          alert('Error');
      }
  })
  .done();
}



//a donde queremos ir luego 
siguiente=()=>{
  navigate.navigate('Bienvenido');
}




//regresamos
GoBack=()=>{

  navigate.navigate('Registro');
}



//
  render() {

    //navigate = this.props.navigation;

    id = this.state.is;
    nuevonombre = this.state.nuevonombre;
    
    return (

        <View style = {styles.LoginGeneral}>
          
          <ScrollView> 
           <View style = {styles.LoginHeader}>
              <Text style={styles.TextHeader}> Configuracion </Text>
           </View> 

            <View style = {styles.BodyHeader}> 
              
                  <TouchableOpacity>
                      <Text>Cambiar Nombre:</Text>
                      <TextInput 
                          placeholder="" 
                          placeholderTextColor="rgba(255,255,255,0.7)"
                          maxLength={30} 
                          returnKeyType="next"
                          autoCapitalize="none"
                          underlineColorAndroid ='transparent'
                          onChangeText={(nuevonombre)=>this.setState({nuevonombre})} 
                          style = {styles.UserPass}
                      />     
                  
                  </TouchableOpacity>

                  <TouchableOpacity>
                      <Text>Cambiar Email:</Text>
                      <TextInput 
                          placeholder="" 
                          placeholderTextColor="rgba(255,255,255,0.7)"
                          maxLength={30} 
                          returnKeyType="next"
                          autoCapitalize="none"
                          underlineColorAndroid ='transparent'
                          onChangeText={(email)=>this.setState({email})} 
                          style = {styles.UserPass}
                      />     
                  
                  </TouchableOpacity>
                  <TouchableOpacity>
                      <Text>Cambiar Contraseña:</Text>
                      <TextInput 
                          placeholder="" 
                          placeholderTextColor="rgba(255,255,255,0.7)"
                          maxLength={30} 
                          returnKeyType="next"
                          autoCapitalize="none"
                          underlineColorAndroid ='transparent'
                          onChangeText={(password)=>this.setState({password})} 
                          style = {styles.UserPass}
                      />     
                  </TouchableOpacity>
                  <TouchableOpacity>
                      <Text>Cambiar Nickname :</Text>
                      <TextInput 
                          placeholder="" 
                          placeholderTextColor="rgba(255,255,255,0.7)"
                          maxLength={30} 
                          returnKeyType="next"
                          autoCapitalize="none"
                          underlineColorAndroid ='transparent'
                          onChangeText={(nickname)=>this.setState({nickname})} 
                          style = {styles.UserPass}
                      />     
                  </TouchableOpacity>

                    <Button 
                      title = "Cambiar" 
                      color="#084081" 
                      style = {styles.botonLogin} 
                     
                      onPress={()=>this.SetRegistro()}
                   />
                
            </View>
            </ScrollView> 
        </View>
    );
  }
}

/*
<Button 
      title = "Genera Audio" 
      color="#084081" 
      style = {styles.botonLogin} 
      onPress={()=>this.Speak()} 

      />


*/

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
export default Configuracion