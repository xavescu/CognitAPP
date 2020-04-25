import React,{Component} from 'react';
import {StyleSheet, View, Image, Text, KeyboardAvoidingView, 
    StatusBar, TextInput, TouchableOpacity, AsyncStorage} from 'react-native'
import Bienvenidos from '../components/Bienvenido/Bienvenido';



     navigationOptions = {
        title: 'Login',
        title: 'Bienvenidos',
    };
    

class functions extends Component{

   

    GetAsignatura(){
        var params = {
            nombre:'Estadistica',
            email:'hanks@campana.com',
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
        console.log("request", request)

        fetch('http://cognitapp.duckdns.org/storeSubject', request)
        .then((response) => response.json())
        .then((res) => {
            console.log("respuesta", res);
            if (res.statusCode == 200){
                //AsyncStorage.setItem('jwt', res.jwt);
                //navigate ("Bienvenido", {});
                alert('Registrado correctamente')
                
            }
            else {
                alert('Error');
            }
        })
        .done();
    }


}     
export default new functions


