import React,{Component} from 'react';
import {Alert} from 'react-native'





class functions{

    login(){
        Alert.alert('entramos')
        // Comunicacion con BBDD 
        /*
         login = ()=> {
        var {navigate} = this.props.navigation;

        fetch('', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })  
        })
        .then((response) => response.json())
        .then((res) => {
            if (res.jwt !== ""){
                AsyncStorage.setItem('jwt', res.jwt);
                navigate ("Map", {});
            }
            else {
                alert('Error');
            }
        })
        .done();
    }
        */
    }

    registro= ()=>{
        //enviar a la  pagina de registro
        //recoge datos del registro y los envia a la BBDD
        Alert.alert('Registrado')
    }


}

export default new functions