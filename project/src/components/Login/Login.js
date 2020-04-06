import React, { Component } from 'react';
import { View, Text, 
  StyleSheet,TouchableOpacity,TextInput,
   Button, Alert,componentDidMount,
   ScrollView} from 'react-native';
import {Tts} from 'react-native-tts';
import Functions from '../../functions/Functions';
import Speaking from '../../functions/index';





let User = this.user;
let Password = this.password;

 class Login extends Component {
   
  constructor(props){
        super(props);
        this.state = {
            user: '',
            password : '',
        }
    }

    login =()=>{Functions.login()}
    registro=()=>{Functions.registro()}
    Speak=()=>{Speaking.OnSpeak()}

    
  render(props) {
    return (
        
        <View style = {styles.LoginGeneral}>
          <ScrollView> 
           <View style = {styles.LoginHeader}>
              <Text style={styles.TextHeader}> CogniApp!!</Text>
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
                      onChangeText={(password) => this.setState({password})}
                      style = {styles.UserPass}
                      />
                  </TouchableOpacity>
                  
                  <Button 
                      title = "Login" 
                      color="#084081" 
                      style = {styles.botonLogin} 
                      onPress={()=>this.login(props)} 
                   />
                   
                    <Button 
                      title = "Genera Audio" 
                      color="#084081" 
                      style = {styles.botonLogin} 
                      onPress={()=>this.Speak()} 
                   />

              <Text>{this.props.username} </Text>
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