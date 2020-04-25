import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,TextInput,Button,
    Alert,componentDidMount,ScrollView,AsyncStorage} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/stack';
//import App from '../../../App_bueno';




import Bienvenido from '../Bienvenido/Bienvenido';
import Registro from '../Registro/Registro';
import Asignatura from '../Asignaturas/Asignaturas';
import SignOut from '../Prueba/Prueba';
import Configuracion from '../Configuracion/Configuracion';
import Añadir from '../Añadir/Añadir';


const AuthContext = React.createContext();

const Drawer = createDrawerNavigator();

function SignInScreen({}) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
  
    const { signIn } = React.useContext(AuthContext);
  
    return (
      <View>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Sign in" onPress={() => signIn({ username, password })} />
      </View>
    );
  }
  