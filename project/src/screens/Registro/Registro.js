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
    //pasamos a la sigiente ventana
    
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
        <View style={styles.container}>
       
          <View style={[styles.box, styles.box1]}>
            <Text style={styles.HeaderLoginText}>Cognit
            <Text style={{color:'red',fontSize:60}}>!</Text>
             app</Text>
          </View>

          <View style={[styles.box, styles.box2]}>   
            <View style={styles.separador}/> 
                <TouchableOpacity style = {styles.Nombre} >
                <Text style = {styles.Texto2}>Nombre :</Text>
                <TextInput 
                    placeholder="" 
                    placeholderTextColor="#474646"
                    maxLength={20} 
                    returnKeyType="next"
                    autoCapitalize="none" 
                    onChangeText={(nombre) => this.setState({nombre})}
                    style = {styles.InputText2}
                    />
                
                </TouchableOpacity>

                <TouchableOpacity style = {styles.Nombre}>
                <Text style = {styles.Texto2}>user :</Text>
                <TextInput 
                placeholder="" 
                placeholderTextColor="#474646"
                maxLength={20} 
                returnKeyType="next"
                autoCapitalize="none" 
                underlineColorAndroid ='transparent'
                onChangeText={(user) => this.setState({user})}
                style = {styles.InputText2}
                />
                </TouchableOpacity>

            <TouchableOpacity style = {styles.Nombre}>
              <Text style = {styles.Texto2}>Email :</Text>
              <TextInput 
              placeholder="" 
              placeholderTextColor="#474646"
              maxLength={20} 
              returnKeyType="next"
              autoCapitalize="none" 
              underlineColorAndroid ='transparent'
              onChangeText={(email) => this.setState({email})}
              style = {styles.InputText2}
              />
            </TouchableOpacity>

            <TouchableOpacity  style = {styles.Nombre}>
                <Text style = {styles.Texto2}>Password :</Text>
                <TextInput 
                placeholder="" 
                placeholderTextColor="#474646"
                maxLength={20} 
                returnKeyType="next"
                autoCapitalize="none" 
                underlineColorAndroid ='transparent'
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}
                style = {styles.InputText2}
                />
            </TouchableOpacity>


            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 10 }}>
                  
        </Text> 

          </View> 
          
          <View style={[styles.box, styles.box3]}>
              <Button 
              title='Registrar'
              color='#FF0033'
              style = {styles.botonRegistro}
              onPress={() => { itemPressed() }}/>
              
              <Text style={styles.TextFooter}> Ya tengo cuenta </Text>
              
              <Button 
              title='Login'
              color='#FF0033'
              style = {styles.botonRegistro}
              onPress={() => { volverInicio() }}/>
          </View> 
      </View>
    );
  }
}

export default Registro;
