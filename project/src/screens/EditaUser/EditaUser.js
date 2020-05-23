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
        idiomas: [{label:'Castellano', id:'CAST'},{label:'Català', id:'CAT'},{label:'English', id:'ENG'}],
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
}

selectIdioma = async (value) => {
  this.setState({language: value});
  await storeItem('language',value);
}
  render() {

    return (
        <View style = {styles.container}>
           <View style={[styles.box, styles.box1]}>
              <Text style={styles.HeaderLoginText}>Configuración</Text>
            </View>
          <View style={[styles.box, styles.box2]}>
            <View style={styles.separador}/> 
            <ScrollView> 
              <View style = {styles.BodyHeader}> 
                    <TouchableOpacity>
                        <Text style = {styles.Texto2}>Cambiar Nombre:</Text>
                        <TextInput 
                            placeholder="" 
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            maxLength={30} 
                            returnKeyType="next"
                            autoCapitalize="none"
                            underlineColorAndroid ='transparent'
                            onChangeText={(nuevonombre)=>this.setState({nuevonombre})} 
                            style = {styles.InputText2}
                        />     
                    
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
                        <Text style = {styles.Texto2}>Cambiar Email:</Text>
                        <TextInput 
                            placeholder="" 
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            maxLength={30} 
                            returnKeyType="next"
                            autoCapitalize="none"
                            underlineColorAndroid ='transparent'
                            onChangeText={(email)=>this.setState({email})} 
                            style = {styles.InputText2}
                        />     
                    
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style = {styles.Texto2}>Cambiar Contraseña:</Text>
                        <TextInput 
                            placeholder="" 
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            maxLength={30} 
                            returnKeyType="next"
                            autoCapitalize="none"
                            underlineColorAndroid ='transparent'
                            onChangeText={(password)=>this.setState({password})} 
                            style = {styles.InputText2}
                        />     
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style = {styles.Texto2}>Cambiar Username :</Text>
                        <TextInput 
                            placeholder="" 
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            maxLength={30} 
                            returnKeyType="next"
                            autoCapitalize="none"
                            underlineColorAndroid ='transparent'
                            onChangeText={(nickname)=>this.setState({nickname})} 
                            style = {styles.InputText2}
                        />     
                    </TouchableOpacity> 
                    <TouchableOpacity>
                      <Picker style={{ height: 50, width: 200 }}
                          selectedValue={this.state.language}
                          onValueChange={this.selectIdioma}>
                            {this.state.idiomas.map(item =>(
                              <Picker.Item label={item.label} value={item.id}/>
                            ))}
                      </Picker>
                    </TouchableOpacity>   
              </View>
            </ScrollView> 
            <View style={[styles.box, styles.box3]}>
                <Button 
                    title = "Cambiar" 
                    color='#FF0033'
                    style = {styles.botonRegistro}
                    onPress={()=>this.SetRegistro()}
                />
              </View>
          </View>
        </View>

    );
  }
}

export default EditaUser