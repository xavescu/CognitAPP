import React, {Component} from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Picker,
  FlatList,
  Image,
  Modal,
  TextInput,
  Button,TouchableHighlight
} from 'react-native';

//import JitsiMeet from 'react-native-jitsi-meet';


const plusImage = require('../../../iconPlus.png')
const editImage = require('../../../iconEditar.png')
const eliminarImage = require('../../../iconEliminar.png')


class Principal extends Component {

  constructor(props){
    super (props);

    this.state = {
      pickerAsignatura: 'Default',
      showAsignatura: false,
      newAsignatura: 'Default',
      Loading: false,
      asignaturas :[],
      id:'',
      label:'',
      
    }
  }


  


  componentDidMount(){

      this.GetAsignatura();
      console.log("did---->")
 
}


  
   GetAsignatura = ()=> { 
    var form = {
      id: 17
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
        'Accept': 'x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    })
    .then((response) => response.json())
    .then((res) => {
      if (res.asignaturas!=""){

        
        this.state.asignaturas=[{id:'',label:''}];
        for(let i=0;i<res.asignaturas.length;i++ )
          {
            this.state.asignaturas.push({ id: res.asignaturas[i].id, label: res.asignaturas[i].nombre});
          }
          this.setState({Loading:true});
        }
        else {
            alert('Error');
        }
    }) 
  }

  showVentana =()=>{
    this.setState({showAsignatura: true});
  }
  cancelar=()=>{
    this.setState({showAsignatura: false});
  }

  createSubject=()=>{
    var form = {
      nombre: this.state.newAsignatura,
      id: "4",
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
        'Accept': 'x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    })
    .then((response) => response.json())
    .then((res) => {
      if (res.status==true){   
        this.setState({showAsignatura: false});
        ()=>this.renderItem();
        
      }
      else{
        alert('Error');
      }
      })
   }

   renderItem =({item})=>(  

    <TouchableOpacity >
      <View>
          <Text style={styles.item}>{item.label}</Text>
      </View>
      <View>
        <View>
          <TouchableHighlight onPress = {()=>this.editar()}>
              <Image style={styles.button} source={editImage}/>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight  onPress = {(item)=>this.eliminar({item})}>
       
              <Image style={styles.button} source={eliminarImage}/>
          </TouchableHighlight>
        </View>
      </View>
    </TouchableOpacity>
  )

  eliminar=({item})=>{
    alert("->", item);
    var form = {
      nombre: item.label,
      id: item.id ,
    }
    var formBody = [];
    for (var property in form) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(form[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    alert("->>>",formBody);
    formBody = formBody.join("&");
    return fetch('http://cognitapp.duckdns.org/deleteSubject', {
      method: 'POST',
      headers: {
        'Accept': 'x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    })
    .then((response) => response.json())
    .then((res) => {
      if (res.deleted==true){   
        
       alert("eliminado correctamente")
        
      }
      else{
        alert('Error');
      }
      })

  }

  
  render() {

    if(this.state.loading){
        return (         
           <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Descargando Centros.....</Text>
        </View>
        );
    }
    return (
      <SafeAreaView>
      <View >
        <Text>Asignaturas</Text>
        <ScrollView>
          <View>
            <FlatList 
              numColumns={1}
              data={this.state.asignaturas}
              renderItem={this.renderItem}
            />
            <TouchableOpacity onPress = {()=>this.showVentana()}>
              <Image style={styles.button} source={plusImage}/>
              <Text>Nueva Asignatura</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, marginTop: 100}}>
            <Modal visible={this.state.showAsignatura}
            transparent = {true}>
                <View style={styles.vModal}>
                  <View style={styles.vModal2}>
                    <TextInput
                    placeholder= 'Nombre Asignatura'
                    onChangeText={(newAsignatura)=>this.setState({newAsignatura})} 
                    style={{borderWidth:0.5}}/>
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
          </View>
        </ScrollView>
     
      </View>

      </SafeAreaView>
    );
  }
}

export default Principal;

const styles = StyleSheet.create({
   
    container: {
        flex:1,
        alignItems:'center',
   },header:{
        backgroundColor:'blue',
        alignItems:'center',
        justifyContent:'center',
   }, button: {
     padding:20,
    width: 40,
    height: 40,
    textAlign:'center'
  },
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
  },item:{
    marginTop:24,
    padding:30,
    backgroundColor:'peru',
    fontSize:24,
    marginHorizontal:10,
    marginTop:24,


  }
  
  });
  
  /**
   * <View style={{ backgroundColor: 'black',flex: 1 }}>

        <JitsiMeet onConferenceTerminated={this.onConferenceTerminated} 
                    onConferenceJoined={this.onConferenceJoined} 
                    onConferenceWillJoin={this.onConferenceWillJoin} style={{ flex: 1, height: '50%', width: '50%' }} />
        </View>
  
   -------------------------
   <View >
        <View style={{ backgroundColor: 'black',flex: 1 }}>
          <JitsiMeet JitsiMeet={this.JitsiMeet()}/>  
        </View>
      </View>
   
   
        */