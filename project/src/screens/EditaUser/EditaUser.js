import React, { Component } from 'react';
import { View, Text, 
  StyleSheet,TouchableOpacity,TextInput,
   Button,Picker,
   ScrollView} from 'react-native';
   
import styles from '../../styles/styles';
import { query } from '../../CommonFunctions/fetchQuery';
import { storeItem, getItem } from '../../CommonFunctions/ManageItems';


 class EditaUser extends Component {

  constructor(props){
    super(props);
    this.state = {
        id: 0,
        nuevonombre:'',
        email:'',
        password:'',
        nickname:'',
        language:'Castellano',
        idiomas: ['Castellano','Català','English'],
    }
  }

  componentDidMount = async () => {
    const id = await getItem('idUsuario');
    //const language = await getItem('language');
    this.setState({ id: id });
    /*if (language != null) {
      this.setState({ language: language });
    }*/
  }

SetRegistro = async ()=> {

  var params = {
      id: this.state.id,
  }

  if (this.state.nuevonombre != '') {
    params['nuevonombre'] = this.state.nuevonombre;
  }
  if (this.state.email != '') {
    params['nuevoemail'] = this.state.email;
  }
  if (this.state.password != '') {
    params['nuevacontraseña'] = this.state.password;
  }
  if (this.state.nickname != '') {
    params['nuevousername'] = this.state.nickname;
  }

  const res = await query('updateUser', params);
  if (res.status == true) {
    alert("Usuario actualizado correctamente");
  } else {
    alert("Error en la actualización del usuario");
  }
}/*
selectIdioma = async (value) => {
  this.setState({language: value});
  await storeItem('language',value);
}*/
  render() {

    return (
        <View style = {styles.LoginGeneral}>
          
          <ScrollView> 
           <View style = {styles.LoginHeader}>
              <Text style={styles.TextHeader}> Configuracion </Text>
           </View> 

            <View style = {styles.BodyHeader}> 
              
                  <TouchableOpacity>
                      <Text>Cambiar Nombre:</Text>
                      <TextInput 
                          placeholder="" 
                          placeholderTextColor="rgba(255,255,255,0.7)"
                          maxLength={30} 
                          returnKeyType="next"
                          autoCapitalize="none"
                          underlineColorAndroid ='transparent'
                          onChangeText={(nuevonombre)=>this.setState({nuevonombre})} 
                          style = {styles.UserPass}
                      />     
                  
                  </TouchableOpacity>

                  <TouchableOpacity>
                      <Text>Cambiar Email:</Text>
                      <TextInput 
                          placeholder="" 
                          placeholderTextColor="rgba(255,255,255,0.7)"
                          maxLength={30} 
                          returnKeyType="next"
                          autoCapitalize="none"
                          underlineColorAndroid ='transparent'
                          onChangeText={(email)=>this.setState({email})} 
                          style = {styles.UserPass}
                      />     
                  
                  </TouchableOpacity>
                  <TouchableOpacity>
                      <Text>Cambiar Contraseña:</Text>
                      <TextInput 
                          placeholder="" 
                          placeholderTextColor="rgba(255,255,255,0.7)"
                          maxLength={30} 
                          returnKeyType="next"
                          autoCapitalize="none"
                          underlineColorAndroid ='transparent'
                          onChangeText={(password)=>this.setState({password})} 
                          style = {styles.UserPass}
                      />     
                  </TouchableOpacity>
                  <TouchableOpacity>
                      <Text>Cambiar Nickname :</Text>
                      <TextInput 
                          placeholder="" 
                          placeholderTextColor="rgba(255,255,255,0.7)"
                          maxLength={30} 
                          returnKeyType="next"
                          autoCapitalize="none"
                          underlineColorAndroid ='transparent'
                          onChangeText={(nickname)=>this.setState({nickname})} 
                          style = {styles.UserPass}
                      />     
                  </TouchableOpacity>

                    <Button 
                      title = "Cambiar" 
                      color="#084081" 
                      style = {styles.botonLogin} 
                     
                      onPress={()=>this.SetRegistro()}
                   />
                
            </View>
            </ScrollView> 
        </View>
    );
  }
}

export default EditaUser