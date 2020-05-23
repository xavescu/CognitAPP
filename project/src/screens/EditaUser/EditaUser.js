import React, { Component } from 'react';
import { View, Text,
  StyleSheet,TouchableOpacity,TextInput,
   Button,Picker,
   ScrollView} from 'react-native';

import styles from '../../styles/styles';
import { query } from '../../CommonFunctions/fetchQuery';
import { storeItem, getItem } from '../../CommonFunctions/ManageItems';

let label_Configuracion = '';
let label_Cambiar = '';
let label_CambiarNombre = '';
let label_CambiarEmail = '';
let label_CambiarContraseña = '';
let label_CambiarNickName = '';

 class EditaUser extends Component {

  constructor(props){
    super(props);
    this.state = {
        id: 0,
        nuevonombre:'',
        email:'',
        password:'',
        nickname:'',
        idioma:'',
        idiomas: [{label:'Castellano', id:'CAST'},{label:'Català', id:'CAT'},{label:'English', id:'ENG'}],
    }
  }

  componentDidMount = async () => {
    const id = await getItem('idUsuario');
    const idioma_temp = await getItem('idioma');
    this.setState({idioma : idioma_temp, id: id});
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
}

selectIdioma = async (value) => {
  await storeItem('idioma', value);
}

onPickerValueChange=(value, index)=>{
  this.setState(
    {
      "idioma": value
    },
    () => {
      // here is our callback that will be fired after state change.
      this.state.selectIdioma(value);
    }
  );
}
  render() {
    if(this.state.idioma == 'CAST'){
        label_Configuracion = 'Configuracion';
        label_Cambiar = 'Cambiar:';
        label_CambiarNombre = 'Cambiar Nombre:';
        label_CambiarEmail = 'Cambiar Email:';
        label_CambiarContraseña = 'Cambiar Contraseña:';
        label_CambiarNickName = 'Cambiar NickName:';
    }else if(this.state.idioma == 'CAT'){
        label_Configuracion = 'Configuracio';
        label_Cambiar = 'Canviar:';
        label_CambiarNombre = 'Canviar Nom:';
        label_CambiarEmail = 'Canviar Email';
        label_CambiarContraseña = 'Canviar Contrasenya:';
        label_CambiarNickName = 'Canviar NickName:';
    }else if(this.state.idioma == 'ENG'){
        label_Configuracion = 'Configuration';
        label_Cambiar = 'Change:';
        label_CambiarNombre = 'Change Name:';
        label_CambiarEmail = 'Change Email:';
        label_CambiarContraseña = 'Change Password:';
        label_CambiarNickName = 'Change NickName:';
    }


    return (
        <View style = {styles.LoginGeneral}>

          <ScrollView>
           <View style = {styles.LoginHeader}>
              <Text style={styles.TextHeader}>{label_Configuracion}</Text>
           </View>

            <View style = {styles.BodyHeader}>

                  <TouchableOpacity>
                      <Text>{label_CambiarNombre}</Text>
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
                      <Text>{label_CambiarEmail}</Text>
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
                      <Text>{label_CambiarContraseña}</Text>
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
                      <Text>{label_CambiarNickName}</Text>
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
                  <TouchableOpacity>
                      <Picker style={{ height: 50, width: 200 }}
                          selectedValue={this.state.idioma}
                          onValueChange={this.onPickerValueChange}>
                            <Picker.Item label="Castellano" value='CAST' />
                            <Picker.Item label="Catalan" value='CAT' />
                            <Picker.Item label="Ingles" value='ENG' />
                      </Picker>
                  </TouchableOpacity>

                    <Button
                      title = {label_Cambiar}
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