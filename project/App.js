/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
    Button, Text, TextInput, View,
    TouchableOpacity, Animated
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { query } from './src/CommonFunctions/fetchQuery';
import { storeItem } from './src/CommonFunctions/ManageItems';


import styles from './src/styles/styles';

//importamos paginas
import ListaAsignaturas from './src/screens/muestraAsignaturas/ListaAsignaturas';
import ListaTemas from './src/screens/muestraTemas/ListaTemas';
import ListaExamenes from './src/screens/muestraResumenesTab/ListaExamenes';
import ListaResumenes from './src/screens/muestraResumenesTab/ListaResumenes';
import Registro from './src/screens/Registro/Registro';
import Modificar from './src/screens/modificarAsignatura/Modificar';
import ModificarTema from './src/screens/modificarTema/ModificarTema';
import ModificarResumen from './src/screens/modificarResumen/ModificarResumen';
import MuestraEditaNuevoResumen from './src/screens/muestraEditaNuevoResumen/MuestraEditaNuevoResumen';
import GuardaTextoScan from './src/screens/GuardaTextoScan/GuardaTextoScan';
import MuestraEditaResumen from './src/screens/muestraEditaResumen/muestraEditaResumen';
import MuestraImagen from './src/screens/muestraImagen/MuestraImagen';
import CreaFita from './src/screens/CreaFita/CreaFita';
import ListaFites from './src/screens/ListaFitas/ListaFitas';
import CodigoArchivo from './src/screens/codigoArchivo/codigoArchivo';
import EditaUsuari from './src/screens/EditaUser/EditaUser';

const Tab = createMaterialTopTabNavigator();
const AuthContext = React.createContext();
const Stack = createStackNavigator();
const Draw = createDrawerNavigator();

const TabResumenes = () => (
    <Tab.Navigator>
        <Tab.Screen name="Resumens" component={ListaResumenes} />
        <Tab.Screen name="Examens" component={ListaExamenes} />
    </Tab.Navigator>
);

const PantallaPrincipal = () => (
        <Stack.Navigator initialRouteName="ListaAsignatura">
            <Stack.Screen name="Asignaturas" component={ListaAsignaturas} />
            <Stack.Screen name="Temas" component={ListaTemas} />
            <Stack.Screen name="Resumenes" component={TabResumenes} />
            <Stack.Screen name="ModificarAsignatura" component={Modificar} />
            <Stack.Screen name="ModificarTema" component={ModificarTema} />
            <Stack.Screen name="ModificarResumen" component={ModificarResumen} />
            <Stack.Screen name ="MuestraEditaNuevoResumen" component={MuestraEditaNuevoResumen} />
            <Stack.Screen name ="GuardaTextoScan" component={GuardaTextoScan}/>
            <Stack.Screen name ="MuestraEditaResumen" component={MuestraEditaResumen} />
            <Stack.Screen name="MuestraImagen" component={MuestraImagen} />
        </Stack.Navigator>
)

function SplashScreen() {
    // fadeAnim will be used as the value for opacity. Initial Value: 0
    state = {
        fadeAnim: new Animated.Value(0),
        fadeAnim: new Animated.Value(1)
    };

    fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 1000,
        }).start();
    };

    fadeOut = () => {
        // Will change fadeAnim value to 0 in 5 seconds
        Animated.timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 200,
        }).start();
    };
    return (
        <View style={styles.containerSplash}>
            <Animated.View
                style={[
                    styles.fadingContainer,
                    {
                        opacity: this.state.fadeAnim // Bind opacity to animated value
                    }
                ]}
            >
                <Text style={styles.fadingText}>Cognit
                    <Text style={{color:'red',fontSize:80}}>!</Text>
                app</Text>
            </Animated.View>
        </View>
    );
}

function SignInScreen({ navigation }) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');


    const { signOut } = React.useContext(AuthContext);
    const { signIn } = React.useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View style={[styles.box, styles.box1]}>
            <Text style={styles.HeaderLoginText}>Cognit
                <Text style={{color:'red',fontSize:60}}>!</Text>
                app</Text>
            </View>
            

            <View style={[styles.box, styles.box2]}>
        
            <View style={styles.separador}/>
                    <View style={{ 
                        color:'#2E86C1',
                        padding:50,
                        backgroundColor:'white' 
                        } }> 

                    <TouchableOpacity >
                        <Text style = {styles.NombreLogin} >  
                        Username/Email :
                        </Text>

                        <TextInput 
                        placeholder="  " 
                        placeholderTextColor="#474646"
                        maxLength={30} 
                        returnKeyType="next"
                        autoCapitalize="none"
                        onChangeText={setUsername} 
                        style = {styles.InputText}
                        />     

                    </TouchableOpacity>

                    <TouchableOpacity style = {{}}>
                        <Text style = {styles.PasswordLogin}>   
                        Password : 
                        </Text>

                        <TextInput 
                    
                        placeholder="" 
                        placeholderTextColor="#474646"
                        maxLength={10} 
                        returnKeyType="next"
                        autoCapitalize="none" 
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        style = {styles.InputText}
                        />
                    </TouchableOpacity>
                </View> 

                <View>
                    <Button 
                    title = "Login" 
                    color='#FF0033'
                    style = {styles.botonLogin}
                    onPress={() => signIn({ username, password })}
                    />
                </View>


            <View style={[styles.box, styles.box3]}>
                <Text style={styles.TextFooter}> ¿Aún no tienes cuenta?</Text>
                <Button 
                        title = "Registrate" 
                        color='#FF0033'
                        onPress={() => navigation.navigate('Registro')}
                        />
            
            </View>      
        </View>
    
    </View>
    );
}

function SignOut(navigation) {
    const { signOut } = React.useContext(AuthContext);

    return (
        <View>
            <Text style={styles.Cabecera}>Sign out!</Text>
            <Button title="Sign out" onPress={signOut} 
              color="#FF0033"
              style = {styles.botonLogin} />
        </View>
    );
}

export default function App({ navigation }) {
    const [isLoad, setIsLoad] = React.useState(true);
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                        isLoad: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                        isLoad: false,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                        isLoad: false,
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
        setTimeout(() => {

            dispatch({ type: 'RESTORE_TOKEN', });
        }, 2000);
    }, []);


    /**
     * funciones contra el server
     */
    const authContext = React.useMemo(() => ({

        signIn: async data => {
            try {
                var params = {
                    user: data.username,
                    password: data.password,
                }
                const res = await query('login', params);
                if (res.status === true) {
                    await storeItem('idioma', 'CAST');
                    await storeItem('idUsuario', res.id);
                    await storeItem('tutorial', res.tutorial);
                    console.log(res.tutorial);
                    dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
                    console.log("Logeado OK" + res.id)

                } else {
                    if (res.status != true)
                        console.log("res----->", res.status)
                    alert('Usuario o Contraseña Incorrecta')
                    { SignInScreen }
                }
            } catch (err) {
                console.log("Error realizando login ->", err);
            }
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
                <Draw.Navigator>
                    {state.isLoading ? (
                        <Stack.Screen name="Splash" component={SplashScreen} />
                    ) : state.userToken == null ? (
                        // No token found, user isn't signed in
                        <>
                            <Stack.Screen
                                name="SignIn"
                                component={SignInScreen}
                                options={{
                                    title: 'Sign in',
                                    // When logging out, a pop animation feels intuitive
                                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                                }}
                            />
                            <Stack.Screen name="Registro" component={Registro} />
                        </>
                        ) : (
                                // User is signed in
                                <>
                                    <Draw.Screen name="Asignatures" component={PantallaPrincipal} />
                                    <Draw.Screen name ="CreaFita" component={CreaFita} 
                                    options={{
                                        title: 'Crear fita',
                                    }}/>
                                    <Draw.Screen name ="ListaFites" component={ListaFites} 
                                    options={{
                                        title: 'Lista de Fitas',
                                    }}/>
                                    <Draw.Screen name ="EditaUsuari" component={EditaUsuari} 
                                    options={{
                                        title: 'Editar Usuario',
                                    }}/>
                                    <Draw.Screen name ="CodigoArchivo" component={CodigoArchivo} 
                                    options={{
                                            title: 'Codigo amigo',
                                        }}/>
                                    <Draw.Screen
                                        name="SignOut"
                                        component={SignOut}
                                        options={{
                                            title: 'Sign Out',
                                            // When logging out, a pop animation feels intuitive
                                            animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                                        }}
                                    />
                                </>
                            )}
                </Draw.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
