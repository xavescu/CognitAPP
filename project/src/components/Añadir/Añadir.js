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
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


var tipos = [{label: 'Resumen', value: 0},{label: 'Examen', value: 1},];

export default class Añadir extends Component {
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
    }
  }
  
  temas = [{label: 'Temas: ',id: 'vacio',},{label: 'Crear Tema',id: 'Nuevo',}];
 
  asignaturas = [{id: 'vacio',label: 'Asignaturas: ',},{id: 'Nuevo',label: 'Crear Asignatura',},];


  ChooseSubject = (value)=> {
    
    this.setState({pickerAsignatura: value});
    //alert(this.asignaturas.label); //value seria la id de la asignatura

    if(value == 'Nuevo'){
      //this.createSubject();
      this.setState({showAsignatura: true});//muestra ventana de crear asignatura
    }else{
      //this.temas.push({label: 'tema3', id: '0'});
      //this.temas.push({label: 'tema4', id: '1'});
      this.GetTemas();
    }
  }

  ChooseTheme = (value, index)=> {
    this.setState({pickerTema: value});
    if(value == 'Nuevo'){
      this.setState({showTema: true});
    }
  }


  createSubject=()=>{
            
    navigate = this.props.navigation;
    var params = {
      nombre: this.state.newAsignatura,
      id: "4",
    }
    console.log("params", params);
    var formData = new FormData();
    for (var k in params) {
        formData.append(k, params[k]);
    }
    console.log("respobse ----->", formData)
    var request = {
      method: 'POST',
      headers: {
        'Accept': 'x-www-form-urlencoded',
        'Content-Type': 'x-www-form-urlencoded'
      },
      body: formData
    }; 
    fetch('http://cognitapp.duckdns.org/storeSubject',request)
    .then((response) => response.json())
    .then((res) => {
      console.log("respobse ----->", res)
      if (res.status==true){   
        this.GetAsignatura();
      }
      else{
        alert('Error');
      }
      }).done();
   }

   componentDidMount()
   {
    this.GetAsignatura();
   }


  
  GetAsignatura = ()=> { 
    navigate = this.props.navigation;
    var params = {
      id: "4",
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
    fetch('http://cognitapp.duckdns.org/querySubjects',request)
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
    }).done();  
  }
  


  GetTemas=()=>{
    var params = { 
      id: this.state.pickerAsignatura,
    }
    console.log("id asignatura ", params);
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
    fetch('http://cognitapp.duckdns.org/queryTemas',request)
    .then((response) => response.json())
    .then((res) => {
        console.log("respobse ----->", res.temas)
        if (res.temas!=null){
        this.temas = [];
        this.temas.push({
          label: 'Temas: ',
          id: 'vacio',
        },
        {
                label: 'Crear Tema',
                id: 'Nuevo',
              })
              for(let i=0;i<res.temas.length;i++ )
              {
                let aux = JSON.stringify(res.temas[i].nombre).split("\"");
                let aux2 = JSON.stringify(res.temas[i].id).split("\"");
             
                this.temas.push({label: aux[1], 
                  id: aux2[1]});
                  this.ChooseTheme();
              }
              
            }
            else {
              console.log("pesponse -->>>>" , res)
                alert('Error');
            }
        })
        .done();
    }



  createTheme=()=>{
    var params = {  
      nombre:this.state.newTema,
      id: this.state.pickerAsignatura,
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
  
  fetch('http://cognitapp.duckdns.org/storeTema',request)
  .then((response) => response.json())
  .then((res) => {
      console.log("respobse ----->", res.temas)
      if (res.status==true){
       alert("Tema añadido correctamente");

      }
      else {
        console.log("pesponse -->>>>" , res)
          alert('Error');
      }
  })
  .done();
  }



  cancelar=()=>{
    this.setState({showAsignatura: false});
    this.setState({showTema: false});
    this.setState({showNombre:false});
  }

  elegirTipo=(value)=>{
    this.setState({selectTipos: value})
  }


  guardar=()=>{
    //alert(this.state.pickerAsignatura + " - " + this.state.pickerTema + " - " + this.state.selectTipos)
    this.setState({showNombre:true})

  }

  PonNombre=()=>{
    
    var params = {  
      id: this.state.pickerTema,
      nombre: this.state.NombreArchivo,
      texto: "texto de prueba "
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
  

  fetch('http://cognitapp.duckdns.org/storeResumen',request)
  .then((response) => response.json())
  .then((res) => {
      console.log("respobse ----->", res.temas)
      if (res.status==true){
       alert("ARCHIVO CORRECTAMENTE");
      }
      else {
        console.log("pesponse -->>>>" , res)
          alert('Error');
      }
  })
  .done();

  }



  render(){

    return(
      <View style = {styles.LoginGeneral}>

                <Modal visible={this.state.showAsignatura} 
                transparent = {true}>
                    <View style = {styles.vModal2}>
                        <View >
                       
                            <TextInput
                            placeholder= 'Nombre Asignatura'
                            onChangeText={(newAsignatura)=>this.setState({newAsignatura})} 
                            />
                        <Button
                            title="Crear"
                            onPress = {()=>this.createSubject()}
                        />
                        <Button
                            title="Cancelar"
                            onPress = {()=>this.cancelar()}
                        />
                        </View>
                    </View>
                </Modal>

        <View style = {styles.cabeceraañadir}>

                
      <View style = {styles.LoginGeneral}>
            <Modal visible={this.state.showTema} transparent = {true}>
                  
                  <View style = {styles.vModal2}>
                    
                    <View >
                      
                      <TextInput
                      placeholder= 'Nombre Tema'
                      onChangeText={(newTema)=>this.setState({newTema})} 
                      style={{borderWidth:0.5}}/>
                     
                      <Button
                        title="Crear"
                        onPress = {()=>this.createTheme()}
                      />
                     
                      <Button
                        title="Cancelar"
                        onPress = {()=>this.cancelar()}
                      />
                   
                    </View>
                 
                  </View>
              
              </Modal>
        </View>

        <View style = {styles.LoginGeneral}>
            <Modal visible={this.state.showNombre} transparent = {true}>
                  
                  <View style = {styles.vModal2}>
                    
                    <View >
                      
                      <TextInput
                      placeholder= 'Nombre del Archivo'
                      onChangeText={(NombreArchivo)=>this.setState({NombreArchivo})} 
                      style={{borderWidth:0.5}}/>
                     
                      <Button
                        title="Crear"
                        onPress = {()=>this.PonNombre()}
                      />
                     
                      <Button
                        title="Cancelar"
                        onPress = {()=>this.cancelar()}
                      />
                   
                    </View>
                 
                  </View>
              
              </Modal>
        </View>

<Text >Añadir</Text>
</View> 



<View style = {styles.asignatura}>
<Picker

selectedValue={this.state.pickerAsignatura}
onValueChange={this.ChooseSubject}
>
{this.asignaturas.map(item =>(
<Picker.Item label={item.label} value={item.id}/>
))}
</Picker>
</View>

<View style = {styles.tema} >
<Picker
selectedValue={this.state.pickerTema}
onValueChange={this.ChooseTheme}
>
     {this.temas.map(item =>(
<Picker.Item label={item.label} value={item.id} />
))}
</Picker>
</View>


<View style = {styles.RadioButton}>
<RadioForm radio_props={tipos} initial={0} onPress={this.elegirTipo} 
style={{padding:30}}
buttonSize={10} />
<Button title="Guardar" onPress = {()=>this.guardar() } />
</View>
       
        
         


      </View>
    );
  }
}


const styles = StyleSheet.create({
  
    LoginGeneral:{
      flex:3,
      position:"absolute",
      backgroundColor:'#4eb3d3',
      position:"relative"
    },
    cabeceraañadir:{
        flex:0.5,
      
        fontSize:30,
        textAlign:'center',
        justifyContent:'center',
    },
    asignatura:{
        flex:0.6,
        //backgroundColor:'green',

    },
    tema:{
        flex:0.6,
        //backgroundColor:'red',

    },
   
    vModal:{
        backgroundColor: "white",
        padding:200
      },
      vModal2:{
        backgroundColor: "#ffffff",
        margin: 50,
        padding:40,
        borderRadius:10,
        //flex:1,
      },
      modal:{
       position:"absolute",
       left:50,
       end:10
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
  
  })