import React from "react";
import { View, Text, StyleSheet, Button,TextInput,TouchableOpacity, Alert } from "react-native";



import { AuthContext } from "./context";
//import console = require("console");
//import console = require("console");






// todo lo metemos aca ----- mirar si se puede cambiar 
// se pueden crear pantallas para cada componente 
const ScreenContainerLogin = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const ScreenContainer= ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const ScreenHome= ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const ScreenDetails= ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const ScreenSearch= ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const ScreenSearch2= ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const ScreenProfile= ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const ScreenKarma=({children})=>(
  <View style={styles.container}>{children} ></View>
)









export const Details = ({ route }) => (
  <ScreenDetails>
    <Text>Details Screen</Text>
    {route.params.name && <Text>{route.params.name}</Text>}
  </ScreenDetails>
);
 

export const Search = ({ navigation }) => (
  <ScreenSearch>
    <Text>Search Screen</Text>
    <Button title="Search 2" onPress={() => navigation.push("Search2")} />
    <Button
      title="React Native School"
      onPress={() => {
        navigation.navigate("Home", {
          screen: "Details",
          params: { name: "React Native School" }
        });
      }}
    />
  </ScreenSearch>
);



export const Search2 = () => (
  <ScreenSearch2>
    <Text>Search2 Screen</Text>
  </ScreenSearch2>
);

export const Home = ({ navigation }) => (
  
  <ScreenHome>
    <Text>Configuración del Usuario</Text>
    <Button
      title="Configuración"
      onPress={() => navigation.push("Details", { name: "React Native by Example " })}
    />
    <Button title="Sign Out" onPress={() => signOut()} />
  </ScreenHome>
  
);



export const Profile = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);
  return (
    <ScreenProfile>
      <Text>Profile Screen66</Text>

      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="Configurar" onPress={()=>navigation.push('Configurar') }/>
      <Button title="Sign Out" onPress={() => signOut()} />
    </ScreenProfile>
  );
};

// este es el original por si pasa algo
/* 
export const Profile = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);
  return (
    <ScreenProfile>
      <Text>Profile Screen66</Text>

      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="Sign Out" onPress={() => signOut()} />
    </ScreenProfile>
  );
};
*/


export const Karma = ({ navigation }) => {

  return(

    <ScreenKarma>
      
    </ScreenKarma>
  );
};




///registrar   
export const CreateAccount = () => {
  const { signUp } = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <Text>Create Account Screen</Text>
      <Button title="Sign Up" onPress={() => signUp()} />
    </ScreenContainer>
  );
  

};





//NO TOCAR-------------SOLO FALTA LO DE PASAR LAS VARIABLES 

export const SignIn = ({ navigation }) => {

  const { signIn } = React.useContext(AuthContext);
  
  let user='';
  let password='';

  return (
    <ScreenContainerLogin > 
      <View >             
      <Text>Login</Text>
      <TouchableOpacity>
      <Text>Nombre:</Text>
        <TextInput 
            placeholder="" 
            placeholderTextColor="rgba(255,255,255,0.7)"
            maxLength={30} 
            returnKeyType="next"
            autoCapitalize="none"
            underlineColorAndroid ='transparent'
            onChangeText={user} 
          /> 
        </TouchableOpacity>
        <TouchableOpacity>
      <Text>Password:</Text>
        <TextInput 
             placeholder="" 
             placeholderTextColor="rgba(255,255,255,0.7)"
             maxLength={10} 
             returnKeyType="next"
             autoCapitalize="none" 
             underlineColorAndroid ='transparent'
             secureTextEntry={true}
             onChangeText={this.password}
          />
        </TouchableOpacity>
      <Button title="Sign In" onPress={ ({user,password})=>signIn({user,password}) } />
      <Button
        title="Create Account"
        onPress={() => navigation.push("CreateAccount")}
      />
      </View>
    </ScreenContainerLogin>
  );
};





//CARGANDO 
export const Splash = () => (
  <ScreenContainer>
    <Text>Loading...</Text>
  </ScreenContainer>
);






//ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#4eb3d3',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5
  },
  LoginGeneral:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#4eb3d3',

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
