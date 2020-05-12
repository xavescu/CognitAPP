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
                <Text style={styles.fadingText}>CognitApp!</Text>
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
                <Text style={styles.texto} >  CognitApp </Text>
            </View>

            <View style={[styles.box, styles.box2]}>
                <View style={{
                    color: '#2E86C1',
                    fontSize: 40,
                    textAlign: 'center',
                    justifyContent: 'center',
                    padding: 50,
                }} />

                <View style={{
                    color: '#2E86C1',
                    fontSize: 40,
                    textAlign: 'center',
                    justifyContent: 'center',
                    padding: 50,
                }}>

                    <TouchableOpacity >
                        <Text style={{
                            textAlign: 'center',
                            justifyContent: 'center',
                            fontSize: 30,
                            color: '#FF6700'
                        }}
                        >   Nombre: </Text>
                        <TextInput
                            placeholder=""
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            maxLength={30}
                            returnKeyType="next"
                            autoCapitalize="none"
                            underlineColorAndroid='transparent'
                            onChangeText={setUsername}
                            style={styles.UserPass}
                        />

                    </TouchableOpacity>

                    <TouchableOpacity style={{}}>
                        <Text style={{
                            textAlign: 'center',
                            justifyContent: 'center',
                            fontSize: 30,
                        }}
                        >   Password: </Text>
                        <TextInput
                            placeholder=""
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            maxLength={10}
                            returnKeyType="next"
                            autoCapitalize="none"
                            underlineColorAndroid='transparent'
                            secureTextEntry={true}
                            onChangeText={setPassword}
                            style={styles.UserPass}
                        />
                    </TouchableOpacity>

                    <Button
                        title="Login"
                        color="#084081"
                        style={styles.botonLogin}
                        onPress={() => signIn({ username, password })}
                    />
                    <Button
                        title="Registrate"
                        color="#084081"
                        style={styles.botonLogin}
                        onPress={() => navigation.navigate('Registro')}
                    />
                </View>
                <View style={[styles.box, styles.box3]}>
                    <Text>footer</Text>
                </View>
            </View>
        </View>
    );
}

function SignOut(navigation) {
    const { signOut } = React.useContext(AuthContext);

    return (
        <View>
            <Text style={styles.Cabecera}>Signed in!</Text>
            <Button title="Sign out" onPress={signOut} />
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
                    await storeItem('idUsuario', res.id);
                    dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
                    console.log("Logeado OK" + res.id)

                } else {
                    if (res.status != true)
                        console.log("res----->", res.status)
                    alert('Usuario o Contrase�a Incorrecta')
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
