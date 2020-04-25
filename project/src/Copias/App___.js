/*import * as React from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import {Component,Platform} from 'react';
import AsyncStorage from '@react-native-community/async-storage';


//navigator
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Screens
import Login from './src/components/Login/Login';
import Bienvenido from './src/components/Bienvenido/Bienvenido';
import Registro from './src/components/Registro/Registro';
import Inicio from './src/components/Inicio/Inicio';
import Asignatura from './src/components/Asignaturas/Asignaturas';
import Prueba from './src/components/Prueba/Prueba';

const AuthContext = React.createContext();
const Drawer = createDrawerNavigator();


export default function App({ navigation }) {

  return ( true);

}
-----------------------
*/

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";


import { AuthContext } from "../../context";


//exportamos los componentes
import {
  SignIn,
  CreateAccount,
  Search,
  Home,
  Details,
  Search2,
  Profile,
  Splash,
  Karma
} from "../../Screens";


//crea objeto ok
const AuthStack = createStackNavigator();
//PANTALLAS DE INICIO
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{ title: "Sign In" }}
    />
    <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{ title: "Create Account" }}
    />
  </AuthStack.Navigator>
);

///-----------------------------------------



//SI ESTAS EN HOME PUEDES IR A ESTAS VENTANAS
const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen
      name="Details"
      component={Details}
      options={({ route }) => ({
        title: route.params.name
      })}
    />
  </HomeStack.Navigator>
);


//ESTO ES LA PARTE DE ABAJO SE PUEDE QUITAR ---------
const Tabs = createBottomTabNavigator();
const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Search" component={SearchStackScreen} />
  </Tabs.Navigator>
);


// PANTALLA SEARCH
const SearchStack = createStackNavigator();
const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen name="Search2" component={Search2} />
  </SearchStack.Navigator>
);



const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);


const KarmaScreen = createStackNavigator();
const KarmaStackScreen = () => (
  <KarmaScreen.Navigator>
    <KarmaScreen.Screen name="Search" component={Search} />
    <KarmaScreen.Screen name="Search2" component={Search2} />
  </KarmaScreen.Navigator>
);

const NosotrosScreen = createStackNavigator();
const NosotrosStackScreen = () => (
  <NosotrosScreen.Navigator>
    <NosotrosScreen.Screen name="Search" component={Search} />
    <NosotrosScreen.Screen name="Search2" component={Search2} />
  </NosotrosScreen.Navigator>
);



///MENU LATERAL
const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Profile">
    <Drawer.Screen name="Configuración" component={TabsScreen} />
    <Drawer.Screen name="Karma" component={KarmaStackScreen}/>
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
    <Drawer.Screen name="Nosotros" component={NosotrosStackScreen}/> 
  </Drawer.Navigator>
);



//
const RootStack = createStackNavigator();

const RootStackScreen = ({ userToken }) => (
  
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen name="App" component={DrawerScreen} options={{ animationEnabled: false
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"   component={AuthStackScreen}  options={{ animationEnabled: false}}
      />
    )}
  </RootStack.Navigator>
);



//principal
export default () => {

  //contexto
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  
  
  const authContext = React.useMemo(() => {


    return {
  signIn: (props) => {
    
      var params = {
          user:"anabanana3",
          password:"pass"
          //user: this.state.user,
          //password: this.state.password,
      }
      console.log("params", params);
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
          if (res.id!=""){
            console.log(res)
            setIsLoading(false);
            setUserToken("asdf");  
          }
          else {
              alert('Error');
          }
      })
      .done();    
  },

      //registro
      signUp: () => {

        ///aca funcion de registro

        setIsLoading(false);
        setUserToken("asdf");
      },
      //salir
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      }
    };
  }, []);





  
  //para efecto de cargar
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }
  console.log("antes del return")
  return (

    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>



  );
};
