import React, { Component } from 'react';
import { View, Text ,StyleSheet,Button,AsyncStorage} from 'react-native';
import { red, white } from 'ansi-colors';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const AuthContext = React.createContext();

getMultiple = async ({navigation}) => {
  const { signout } = React.useContext(AuthContext);

  console.log("getmultipleee")
  navigate = this.props.navigation;
  navigate.navigate('Login');
  let values
  try {
    values = await AsyncStorage.clear();
    console.log("getmultipleee", values)
  } catch(e) {
    // read error
  }
  console.log(values)

}



 class Bienvenido extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  
  
  

  render() {
    return (


      <View style={styles.LoginGeneral}>
        <View style={styles.LoginHeader}/>
        <View style={styles.BodyHeader}>
          <Text style={styles.Texto}> Bienvenido ventana  principal </Text>


          <Button 
            title = "Borra datos" 
            color="#084081" 
            style = {styles.botonLogin} 

            onPress={()=>getMultiple()}
            />   

        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  
  LoginGeneral:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#4eb3d3',
    color:'white',
  },
  Texto:{
    color:'white',
    fontSize:50,
    textAlign:'center'
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
    fontSize:100,
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

export default Bienvenido