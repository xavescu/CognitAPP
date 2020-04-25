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
//import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

//importamos paginas
import Login from './src/components/Login/Login';
import Registro from './src/components/Registro/Registro';
import Inicio from './src/components/Inicio/Inicio';
import Bienvenido from './src/components/Bienvenido/Bienvenido';
import Asignatura from './src/components/Asignaturas/Asignaturas';
import Prueba from './src/components/Prueba/Prueba';

//const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


class Application extends Component{
  render(){
    return(
    
      <NavigationContainer>
          <Drawer.Navigator initialRouteName="Inicio">
            <Drawer.Screen name="Inicio" component={Inicio} />
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Registro" component={Registro} />
            <Drawer.Screen name="Bienvenido" component={Bienvenido} />
            <Drawer.Screen name="Asignatura" component = {Asignatura}/>
            <Drawer.Screen name="Prueba" component = {Prueba}/>
          </Drawer.Navigator>
      </NavigationContainer>
    );
  };
}
/*
<Stack.Navigator initialRouteName="Inicio">
          <Stack.Screen name="Inicio" component={Inicio} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registro" component={Registro} />
          <Stack.Screen name="Bienvenido" component={Bienvenido} />
          <Stack.Screen name="Asignatura" component = {Asignatura}/>
        </Stack.Navigator>
*/
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
