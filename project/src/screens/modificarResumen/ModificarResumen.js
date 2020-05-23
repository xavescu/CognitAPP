import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Picker
} from 'react-native';

import styles from '../../styles/styles';
import { query } from '../../CommonFunctions/fetchQuery';
import { storeItem, getItem } from '../../CommonFunctions/ManageItems';


let label_EditaResumenExamen = '';
let label_NombreResumenExamen = '';
let label_Tema = '';
let label_EditarResumen = '';
let label_BorrarResumen = '';

class ModificarResumen extends Component {
    state = {
      userId: 0,
      nombreResumen: '',
      newNombreResumen: '',
      resumenId: 0,
      newTemaId: 0,
      subjectId: '',
      type: [
        {id: 0, tipo:'Resumen'},
        {id: 1, tipo:'Examen'},
      ],
      newTypeId: 0,
      temas: [],
      idioma:''
    }

    async componentDidMount() {
        try {
            const id = await getItem("idResumenModificar");
            const userid = await getItem("idUsuario");
            const nombreresumen = await getItem("nombreResumen");
            const idioma = await getItem('idioma');
            this.setState({idioma : idioma});
            this.listaTemas();
            this.setState({ resumenId: id, userId: userid, nombreResumen: nombreresumen});
        } catch (err) {
            console.log("Error getting tema to modify->", err);
        }
    }

    async listaTemas() {
      const subjectid = await getItem("idAsignaturaActual");
      const res = await query('queryTemas', {'id': subjectid});
      aux = [];
      if (res.temas != "") {
          for (let i = 0; i < res.temas.length; i++) {
              aux.push({ id: res.temas[i].id, key: res.temas[i].nombre });
          }
      }
      this.setState({temas: aux});
    }
  
    async editResumen() {
      const { navigation } = this.props;
      const res = await query('changeResumen', {'id': this.state.resumenId, 'nombre': this.state.newNombreResumen, 'tipo': this.state.newTypeId, 'tema': this.state.newTemaId});
      //alert(this.state.resumenId + "-" + this.state.newNombreResumen + "-" + this.state.newTypeId + "-" + this.state.newTemaId);
      console.log(res);
      //alert(res.status);
      if (res.status == true) {
          alert("Modificacio del resum", "El resum ha estat modificat amb exit.");
          navigation.navigate('Resumenes');
      }
      else {
          alert('Error');
      }
    }
  
    async deleteResumen () {
      const { navigation } = this.props;
      const res = await query('deleteResumen', {'id': this.state.resumenId});
      if (res.status == true) {
          alert("Resum esborrat", "El resum ha estat esborrat amb exit.");
          navigation.navigate('Resumenes');
      }
      else {
          alert('Error');
      }
    }

    selectTema = (value)=> {
      this.setState({newTemaId: value});
    }
  
    selectTipo = (value)=> {
      this.setState({newTypeId: value});
    }
  
    render() {
        const { navigation } = this.props;

        if(this.state.idioma == 'CAST'){
            label_EditaResumenExamen = 'Edita Resumen/Examen';
            label_NombreResumenExamen = 'Nombre Resumen/Examen';
            label_Tema = 'Tema';
            label_EditarResumen = 'Editar Resumen';
            label_BorrarResumen = 'Borrar Resumen';

        }else if(this.state.idioma == 'CAT'){
            label_EditaResumenExamen = 'Edita Resum/Examen';
            label_NombreResumenExamen = 'Nom Resum/Examen';
            label_Tema = 'Tema';
            label_EditarResumen = 'Editar Resum';
            label_BorrarResumen = 'Esborrar Resum';

        }else if(this.state.idioma == 'ENG'){
            label_EditaResumenExamen = 'Edit Resume/Exam';
            label_NombreResumenExamen = 'Name Resume/Exam';
            label_Tema = 'Theme';
            label_EditarResumen = 'Edit Resume';
            label_BorrarResumen = 'Delete Resume';
        }

      
        return (
          <View style = {styles.container}>
            <View style={[styles.box, styles.box1]}>
                <Text style={styles.HeaderLoginText}></Text>
            </View>
          <View style={[styles.box, styles.box2]}>
                <View style={styles.separador}/> 
                <Text style = {styles.Texto2}>
                  {label_NombreResumenExamen}
                </Text>
                <TextInput
                  placeholder={this.state.nombreResumen}
                  returnKeyLabel={"next"}
                  onChangeText={(text) => this.setState({newNombreResumen:text})}
                  value={this.state.newNombreResumen}
                  style = {styles.InputText2}
                ></TextInput>
                <Text style = {styles.Texto2}>
                  {label_Tema}
                </Text>
                <View>
                  <Picker
                    style={{ height: 50, width: 200 }}
                    selectedValue={this.state.newTemaId}
                    onValueChange={this.selectTema}
                    >
                      {this.state.temas.map(item =>(
                        <Picker.Item label={item.key} value={item.id}/>
                      ))}
                  </Picker>
                </View>
                <View>
                  <Picker
                    style={{ height: 50, width: 200 }}
                    selectedValue={this.state.newTypeId}
                    onValueChange={this.selectTipo}
                    >
                      {this.state.type.map(item =>(
                        <Picker.Item label={item.tipo} value={item.id}/>
                      ))}
                  </Picker>
                </View>
            </View>
            <View style={[styles.box, styles.box3]}>
              <Button
                onPress={() => this.editResumen()}
                title={label_EditarResumen}
                color="#FF0033"
                style = {styles.botonRegistro}
              />
              <Button
                onPress={() => this.deleteResumen()}
                title={label_BorrarResumen}
                color="#FF0033"
                style = {styles.botonRegistro}
              />
            </View>
        </View>
      )
    }
  }

  export default ModificarResumen;
