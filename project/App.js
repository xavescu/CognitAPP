import * as React from 'react';
import { AsyncStorage, Button, Text, TextInput, View,StyleSheet,ScrollView ,
  componentDidMount,TouchableOpacity, Animated,Component} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import JitsiMeet, { JitsiMeetEvents } from 'react-native-jitsi-meet';

import Bienvenido from './src/components/Bienvenido/Bienvenido';
import Asignaturas from './src/components/Asignaturas/Asignaturas';
import Registro from './src/components/Registro/Registro';
import Añadir from './src/components/Añadir/Añadir';
import Principal from './src/components/Principal/Principal';
import Modificar from './src/components/Modificar/Modificar';
//import Jitsi from './src/JitsiMeet/JitsiMeet';

const AuthContext = React.createContext();
const Stack = createStackNavigator();
const Draw= createDrawerNavigator();
 


//------SPLASH
function SplashScreen() {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
 state = {
  fadeAnim: new Animated.Value(0)
};

fadeIn = () => {
  // Will change fadeAnim value to 1 in 5 seconds
  Animated.timing(this.state.fadeAnim, {
    toValue: 1,
    duration: 50000,
  }).start();
};

fadeOut = () => {
  // Will change fadeAnim value to 0 in 5 seconds
  Animated.timing(this.state.fadeAnim, {
    toValue: 0,
    duration: 50000,
  }).start();
};
  return ( 
    <View style={styles.container}>
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              opacity: this.state.fadeAnim // Bind opacity to animated value
            }
          ]}
        >
          <Text style={styles.fadingText}>Fading View!</Text>
       
       
        </Animated.View>

          <View style={styles.buttonRow}>

          <Button title="Fade In" onPress={this.fadeIn} />
          
          <Button title="Fade Out" onPress={this.fadeOut} />
        </View>
      </View>
  );
}

////----------FIN SPLASH----------------


///-----------LOGIN---SCREEN----------
function SignInScreen({navigation}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  

  const { signOut } = React.useContext(AuthContext);
  const { signIn } = React.useContext(AuthContext);

      console.log(" USERNAME"+ username)
      
  return (
    <View >
      <ScrollView> 

      <View style = {styles.LoginHeader}>
      <Text style={styles.TextHeader}> CogniApp!! </Text>
      </View> 

      <View style = {styles.BodyHeader}> 

      <TouchableOpacity>
        <Text>Nombre:</Text>
        <TextInput 
        placeholder="" 
        placeholderTextColor="rgba(255,255,255,0.7)"
        maxLength={30} 
        returnKeyType="next"
        autoCapitalize="none"
        underlineColorAndroid ='transparent'
        onChangeText={setUsername} 
        style = {styles.UserPass}
        />     

      </TouchableOpacity>

      <TouchableOpacity>
        <Text>Password :</Text>
        <TextInput 
        placeholder="" 
        placeholderTextColor="rgba(255,255,255,0.7)"
        maxLength={10} 
        returnKeyType="next"
        autoCapitalize="none" 
        underlineColorAndroid ='transparent'
        secureTextEntry={true}
        onChangeText={setPassword}
        style = {styles.UserPass}
        />
      </TouchableOpacity>
        
        <Button 
        title = "Login" 
        color="#084081" 
        style = {styles.botonLogin} 
        onPress={() => signIn({ username, password })}
        />

            <Text>{username} {password}</Text>

        <Button 
        title = "Registrate" 
        color="#084081" 
        style = {styles.botonLogin} 
        onPress={() => navigation.navigate('Registro')}
        />
      </View>
    </ScrollView> 
  </View>
   
  );
}
////-------FIN SCREEN LOGIN------




function SignOut(navigation) {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style = {styles.LoginHeader}>
      <Text style={styles.TextHeader}>Signed in!</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}




/**
 * 
 * @param {Inicio} param0 
 */
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
        console.log("efecttttt->>>>>>>",usertoken)
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

  

  /**
   * funciones contra el server
   */
  const authContext = React.useMemo( () => ({

    signIn: async data => {

            var params = {
                user: data.username,
                password: data.password,
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
            //console.log("request", request)

            fetch('http://cognitapp.duckdns.org/login',request)
            .then((response) => response.json())
            .then((res) => {
              
                if (res.status===true){
                  dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
                  console.log("Logeado OK")
                 // let userToken =  AsyncStorage.getItem('userToken');
                      
                }
                else {
                    if(res.status!=true)
                      console.log("res----->",res.status)
                      alert('Usuario o Contraseña Incorrecta') 
                      {SignInScreen}
                }
            })
            .done();       
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
              <Stack.Screen name="Registro" component={Registro}/>
              <Draw.Screen name="Principal" component={Principal}/>
            </>
          ) : (
            // User is signed in
            <>   
            <Draw.Screen name='Modificar' component={Modificar}/>
            <Draw.Screen name="Principal" component={Principal}/>
            <Draw.Screen name="Bienvenido" component={Bienvenido}/>
            <Draw.Screen name="Asignaturas" component={Asignaturas}/>
            <Draw.Screen name="Añadir" component={Añadir}/>
          
            
            
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


const styles = StyleSheet.create({
  texto:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#4eb3d3',
  },LoginGeneral:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#4eb3d3',

  },container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "powderblue"
  },
  fadingText: {
    fontSize: 28,
    textAlign: "center",
    margin: 10
  },
  buttonRow: {
    flexDirection: "row",
    marginVertical: 16
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
});


  
  