import * as React from 'react';
import {AsyncStorage,NativeModules,componentDidMount} from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import {Component,Platform} from 'react';
//import AsyncStorage from '@react-native-community/async-storage'
//navigator
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

//Screens
import Login from './src/components/Login/Login';
import Login2 from './src/components/Login/Login2';
import Bienvenido from './src/components/Bienvenido/Bienvenido';
import Registro from './src/components/Registro/Registro';
//import Inicio from './src/components/Inicio/Inicio';
import Asignatura from './src/components/Asignaturas/Asignaturas';
import SignOut from './src/components/Prueba/Prueba';
import Configuracion from './src/components/Configuracion/Configuracion';
import Añadir from './src/components/Añadir/Añadir';
import {findDato} from './src/components/Login/Login';
//import console = require('console');
//import console = require('console');
//--------------------------------------------


//const AuthContext = React.createContext();
const Drawer = createDrawerNavigator();
const Stack = createDrawerNavigator();

const AuthContext = React.createContext();

export default function App({ navigation }) {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
 
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);


  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        var params = {
          user: this.state.user,
          password: this.state.password,
      }
      var formData = new FormData();
      for (var k in params) {
          formData.append(k, params[k]);
      }
    
      var request = {
          method: 'POST',
          headers: {
              'Accept': 'x-www-form-urlencoded',
              'Content-Type': 'x-www-form-urlencoded'
          },
          body: formData
      };
      fetch('http://cognitapp.duckdns.org/login',request)
      .then((response) => response.json())
      .then((res) => {
        if (res.status==true){
            console.log("App_SingIn");
            
        }
        else {
          navigate = this.props.navigation;
          navigate.navigate('Login'); 
              
        }
      })
      .done();

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );
  
  return (

    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Drawer.Navigator>
                { state.userToken  == null ? (
                    <>
                    
                  <Drawer.Screen name="Login" component={Login2}  />
                  <Drawer.Screen name="Registro" component={Registro} />
                  <Drawer.Screen name="Bienvenido" component={Bienvenido} />
                  
                  </>
                ) : (
                    <>
                  <Drawer.Screen name="Bienvenido" component={Bienvenido} />
                  <Drawer.Screen name="Configuracion"  component={Configuracion}/>
                  <Drawer.Screen name="Asignatura" component={Asignatura} />
                  <Drawer.Screen name="Añadir" component={Añadir} />
                
                  </>
                )}
              </Drawer.Navigator>
          </NavigationContainer>
    </AuthContext.Provider>
    
      
    
  );
}



/**
 * 
 * 
 * <NavigationContainer>
        <Drawer.Navigator>
          { this.state.token != 'abc123' ? (
              <>
              
            <Drawer.Screen name="Login" component={Login}  />
            <Drawer.Screen name="Registro" component={Registro} />
            <Drawer.Screen name="Bienvenido" component={Bienvenido} />
            
            </>
          ) : (
              <>
            <Drawer.Screen name="Bienvenido" component={Bienvenido} />
            <Drawer.Screen name="Configuracion"  component={Configuracion}/>
            <Drawer.Screen name="Asignatura" component={Asignatura} />
            <Drawer.Screen name="Añadir" component={Añadir} />
           
            </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
 */