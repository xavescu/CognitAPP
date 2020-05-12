import React, { Component } from 'react';
import { View, Text,StyleSheet, 
    TextInput,ScrollView,Button,
    TouchableOpacity} from 'react-native';

import styles from '../../styles/styles';
import { query } from '../../CommonFunctions/fetchQuery';

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

     registro = async () => {
         try {
             var params = {
                 email: this.state.email,
                 nombre: this.state.nombre,
                 user: this.state.user,
                 password: this.state.password
             }
             const res = await query('register', params);
             if (res.status == true) {
                 console.log(" Registro Response----->", res);
                 alert('Registrado correctamente');
             }
             else {
                 alert('Error en el registro');
             }
         } catch (err) {
             console.log("Error realizando registro ->", err);
         }
}
     render() {
         const { navigation } = this.props;

         const itemPressed = () => {
             this.registro();
             navigation.navigate('SignIn');
         }

         const volverInicio = () => {
            navigation.navigate('SignIn');
        }
         
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
                        style={styles.botonLogin}
                        onPress={() => itemPressed()} />
                    <Text style={styles.TextFooter}> Ya tengo cuenta </Text>
                    <Button 
                        title='Login'
                        color='#FF0033'
                        style = {styles.botonRegistro}
                        onPress={()=> volverInicio()}/>
                </View> 
               
        </ScrollView>
      </View>
    );
  }
}

export default Registro;
