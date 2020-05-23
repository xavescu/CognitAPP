import React, { Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Picker,
  TouchableOpacity,
  CheckBox,
  Modal,
  TextInput,
} from 'react-native';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { storeItem, getItem } from '../../CommonFunctions/ManageItems';
import { query } from '../../CommonFunctions/fetchQuery';


let label_Añadir = '';
let label_TituloDelTexto = '';
let label_Guardar = '';
let label_NombreAsignatura = '';
let label_Crear = '';
let label_Cancelar = '';
let label_NombreTema = '';


//anabana id 4

var tipos = [
  {label: 'Resumen', value: 0},
  {label: 'Examen', value: 1},
];
export default class GuardaTextoScan extends Component {
  constructor(props){
    super (props);

    this.state = {
      pickerAsignatura: 'Default',
      pickerTema: 'Default',
      showAsignatura: false,
      showTema: false,
      newAsignatura: 'Default',
      newTema: 'Default',
      selectTipos : '0',
      NombreArchivo:'',
      showNombre:false,
      Nombreresumen:'',
      idioma:''
    }
  }

  temas = [{label: 'Temas: ',id: 'vacio'},{label: 'Crear Tema',id: 'Nuevo'}];

  asignaturas = [{id: 'vacio',label: 'Asignaturas: '},{id: 'Nuevo',label: 'Crear Asignatura'}];


  ChooseSubject = (value)=> {

    this.setState({pickerAsignatura: value});
    //alert(this.asignaturas.label); //value seria la id de la asignatura

    if(value == 'Nuevo'){
      //this.createSubject();
      this.setState({showAsignatura: true});//muestra ventana de crear asignatura
    }else if(value == 'vacio'){
      this.temas = [];
      this.temas.push({label: 'Temas: ',id: 'vacio'});
      this.temas.push({label: 'Crear Tema',id: 'Nuevo'});
    }else{
      //this.temas.push({label: 'tema3', id: '0'});
      //this.temas.push({label: 'tema4', id: '1'});
      this.GetTemas(value);
    }
  }

  ChooseTheme = (value, index)=> {
    this.setState({pickerTema: value});
    if(value == 'Nuevo'){
      this.setState({showTema: true});
    }
  }


  createSubject= async ()=>{
    const idRecibido = await getItem('idUsuario');
    var form = {
      nombre: this.state.newAsignatura,
      id: idRecibido,
    }
    var formBody = [];
    for (var property in form) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(form[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return fetch('http://cognitapp.duckdns.org/storeSubject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
    .then((response) => response.json())
    .then((res) => {
      if (res.status==true){
        this.setState({showAsignatura: false});
        console.log("Asignatura creada correctamente");
        this.GetAsignatura();
      }
      else{
        alert('Error');
      }
      })
   }

   async componentDidMount()
   {
   const idioma = await getItem('idioma');
    this.setState({idioma : idioma});
    this.GetAsignatura();
   }



  GetAsignatura = async  ()=> {
    const idRecibido = await getItem('idUsuario');
    console.log("id----> guarda texto ", idRecibido)
    var form = {
      id: idRecibido,
    }
    var formBody = [];
    for (var property in form) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(form[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return fetch('http://cognitapp.duckdns.org/querySubjects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
    .then((response) => response.json())
    .then((res) => {
      if (res.asignaturas!=""){

        for(let i=0;i<res.asignaturas.length;i++ )
          {
            let aux = JSON.stringify(res.asignaturas[i].nombre).split("\"");
            let aux2 = JSON.stringify(res.asignaturas[i].id).split("\"");
            this.asignaturas.push({ id: aux2[1],label: aux[1],});
            this.ChooseTheme();
          }
        }
        else {
            alert('Error');
        }
    })
  }



  GetTemas=(value)=>{
    var form = {
      id: value,
    }
    this.setState({pickerAsignatura: value});
    var formBody = [];
    for (var property in form) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(form[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return fetch('http://cognitapp.duckdns.org/queryTemas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
    .then((response) => response.json())
    .then((res) => {
        console.log("respobse ----->", res.temas)
        if (res.temas!=null){
        this.temas = [];
        this.temas.push({label: 'Temas: ',id: 'vacio'});
        this.temas.push({label: 'Crear Tema',id: 'Nuevo'});
              for(let i=0;i<res.temas.length;i++ ){
                let aux = JSON.stringify(res.temas[i].nombre).split("\"");
                let aux2 = JSON.stringify(res.temas[i].id).split("\"");

                this.temas.push({label: aux[1],
                  id: aux2[1]});
                  this.ChooseTheme();
              }

        }
        else {
            alert('Error');
        }
      })
    }



  createTheme=()=>{
    var form = {
      nombre:this.state.newTema,
      id: this.state.pickerAsignatura,
  }
  var formBody = [];
    for (var property in form) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(form[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return fetch('http://cognitapp.duckdns.org/storeTema', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
  .then((response) => response.json())
  .then((res) => {
      console.log("respobse ----->", res.temas)
      if (res.status==true){
        this.setState({showTema: false});
        alert("Tema añadido correctamente");

      }
      else {
        console.log("pesponse -->>>>" , res)
          alert('Error');
      }
  })
  }



  cancelar=()=>{
    this.setState({showAsignatura: false});
    this.setState({showTema: false});
    this.setState({showNombre:false});
  }

  elegirTipo=(value)=>{
    this.setState({selectTipos: value})
  }




  guardar= async ()=>{
    const aux = await getItem('textFoto');
    const foto = await getItem('foto');
    //foto = await storeItem('foto',foto)
    console.log("Aux Texto----->", aux );
    console.log("Aux Texto----->", foto );
    var form = {
      id: this.state.pickerTema,
      nombre: this.state.Nombreresumen,
      texto: aux,
      tipo: this.state.selectTipos,
      foto: foto,
    }
      var formBody = [];
      for (var property in form) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(form[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      return fetch('http://cognitapp.duckdns.org/storeResumen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      })
      .then((response) => response.json())
      .then((res) => {
          if (res.status==true){
            console.log("ARCHIVO CORRECTAMENTE");
            this.cambioPantalla();
          }
          else {
            console.log("pesponse -->>>>" , res)
              alert('Error');
          }
      })

  }

  cambioPantalla = async () => {
    const { navigation } = this.props;
    const id = await getItem('idPantalla');
    const tutorial = await getItem('tutorial');
    console.log("pagina id: ", id);
    console.log("tutorial2 -: ", tutorial);
    if(tutorial == 1){
      this.disableTutorial();
    }
    switch(id){
        case '1':
            navigation.navigate('Asignaturas');
            break;
        case '2':
            navigation.navigate('Temas');
            break;
        case '3':
        case '4':
            navigation.navigate('Resumenes');
            break;
    }
  }

  async disableTutorial(){
    try{
        console.log("aki dedntro disable");
        const id = await getItem('idUsuario');
        const res = await query('disableTutorial', { "id": id });
        if(res.status == true){
            console.log("Tutorial Completado");
        }
    }catch(err){
        console.log("Error getting Disable tutorial->", err);
    }
  }

  render(){
    if(this.state.idioma == 'CAST'){
         label_Añadir = 'Añadir';
         label_TituloDelTexto = 'Titulo del texto';
         label_Guardar = 'Guardar';
         label_NombreAsignatura = 'Nombre Asignatura :';
         label_Crear = 'Crear';
         label_Cancelar = 'Cancelar';
         label_NombreTema = 'Nombre Tema';
    }else if(this.state.idioma == 'CAT'){
         label_Añadir = 'Afegir';
         label_TituloDelTexto = 'titol del text';
         abel_Guardar = 'Guardar';
         label_NombreAsignatura = 'Nom Assignatura :';
         label_Crear = 'Crear';
         label_Cancelar = 'Cancel·lar';
         label_NombreTema = 'Nom Tema';
    }else if(this.state.idioma == 'ENG'){
         label_Añadir = 'Add';
         label_TituloDelTexto = 'Text title';
         label_Guardar = 'Save';
         label_NombreAsignatura = 'Subject Name :';
         label_Crear = 'Create';
         label_Cancelar = 'Cancel';
         label_NombreTema = 'Theme Name';
    }



    return(
      <View>
        <Text style={{fontSize:30}}>{label_Añadir}</Text>
        <Picker
        style={{ height: 50, width: 200 }}
        selectedValue={this.state.pickerAsignatura}
        onValueChange={this.ChooseSubject}
        >
            {this.asignaturas.map(item =>(
              <Picker.Item label={item.label} value={item.id}/>
            ))}
        </Picker>
        <Picker
        style={{ height: 50, width: 200 }}
        selectedValue={this.state.pickerTema}
        onValueChange={this.ChooseTheme}
        >
            {this.temas.map(item =>(
              <Picker.Item label={item.label} value={item.id} />
            ))}
        </Picker>
        <RadioForm
          radio_props={tipos}
          initial={0}
          ///onPress={(value) =>{}}
          onPress={this.elegirTipo}
          buttonSize={10}
        />
        <TextInput
            placeholder= {label_TituloDelTexto}
            onChangeText={(Nombreresumen)=>this.setState({Nombreresumen})} 
            style={{borderWidth:0.5}}/>
        
        <Button
          title={label_Guardar}
          onPress = {()=>this.guardar()}
        />
        <View style={{flex: 1, marginTop: 100}}>
          <Modal visible={this.state.showAsignatura}
          transparent = {true}>
              <View style={styles.vModal}>
                <View style={styles.vModal2}>
                  <TextInput
                  placeholder= {label_NombreAsignatura}
                  onChangeText={(newAsignatura)=>this.setState({newAsignatura})} 
                  style={{borderWidth:0.5}}/>
                  <Button
                    title={label_Crear}
                    onPress = {()=>this.createSubject()}
                  />
                  <Button
                    title={label_Cancelar}
                    onPress = {()=>this.cancelar()}
                  />
                </View>
              </View>
          </Modal>
        </View>
        <View style={{flex: 1, marginTop: 100}}>
          <Modal visible={this.state.showTema}
          transparent = {true}>
              <View style={styles.vModal}>
                <View style={styles.vModal2}>
                  <TextInput
                  placeholder= {label_NombreTema}
                  onChangeText={(newTema)=>this.setState({newTema})} 
                  style={{borderWidth:0.5}}/>
                  <Button
                    title={label_Crear}
                    onPress = {()=>this.createTheme()}
                  />
                  <Button
                    title={label_Cancelar}
                    onPress = {()=>this.cancelar()}
                  />
                </View>
              </View>
          </Modal>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  vModal:{
    backgroundColor: "#000000aa",
    flex: 1,
  },
  vModal2:{
    backgroundColor: "#ffffff",
    margin: 50,
    padding:40,
    borderRadius:10,
    //flex:1,
  }
});

