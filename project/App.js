import React from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import {Component,Platform} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

//importamos libreria Navigator para navegacion entre paginas


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//importamos paginas
import Login from './src/components/Login/Login';
import Registro from './src/components/Registro/Registro';
import Inicio from './src/components/Inicio/Inicio';

const Stack = createStackNavigator();


class Application extends Component{
  render(){
    return(
     
      <NavigationContainer> 
        <Stack.Navigator initialRouteName="Inicio">
          <Stack.Screen name="Inicio" component={Inicio} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="Registro" component={Registro} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
}

const styles = StyleSheet.create({
  body:{
    flex:1,
    backgroundColor: 'peru',
    flexDirection: 'column',
    justifyContent:'center',
    textAlign:'center',
  },
  footer: {
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default Application;
