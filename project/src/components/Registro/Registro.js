import React, { Component } from 'react';
import { View, Text,StyleSheet, 
    TextInput,ScrollView,Button,
    TouchableOpacity} from 'react-native';
import { white } from 'color-name';
import Functions from '../../functions/Functions';




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
  registro=()=>{Functions.registro()}
  SetAsignatura=()=>{Functions.SetAsignatura()}

  render(props) {
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
                      <Text>Apellido :</Text>
                      <TextInput 
                      placeholder="" 
                      placeholderTextColor="rgba(255,255,255,0.7)"
                      maxLength={10} 
                      returnKeyType="next"
                      autoCapitalize="none" 
                      underlineColorAndroid ='transparent'
                      onChangeText={(apellido) => this.setState({apellido})}
                      style = {styles.UserPass}
                      />
                  </TouchableOpacity>
                
                
                <TouchableOpacity>
                      <Text>Direccion :</Text>
                      <TextInput 
                      placeholder="" 
                      placeholderTextColor="rgba(255,255,255,0.7)"
                      maxLength={10} 
                      returnKeyType="next"
                      autoCapitalize="none" 
                      underlineColorAndroid ='transparent'
                      onChangeText={(direccion) => this.setState({direccion})}
                      style = {styles.UserPass}
                      />
                  </TouchableOpacity>

                <TouchableOpacity>
                      <Text>Email :</Text>
                      <TextInput 
                      placeholder="" 
                      placeholderTextColor="rgba(255,255,255,0.7)"
                      maxLength={10} 
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
                        onPress={()=>this.registro(props)}/>
                </View> 
                <View style = {styles.botonRegistro}>
                    <Button 
                        title='Añadir Asignatura'
                        color="#084081" 
                        style = {styles.botonLogin} 
                        onPress={()=>this.SetAsignatura(props)}/>
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
