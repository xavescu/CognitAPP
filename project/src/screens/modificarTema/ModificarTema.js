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
let label_Tema = '';
let label_Nombre = '';
let label_Asignatura = '';
let label_Guardar = '';
let label_Borrar = '';



class ModificarTema extends Component {
  state = {
    count: 0,
    userId: 0,
    subject: '',
    subjectId: 0,
    nombre: '',
    temaId: 0,
    newNombre: '',
    newSubjectId: 0,
    newSubject: '',
    asignaturas_ids: [],
    asignaturas: [],
    idioma: ''
  }

    async componentDidMount() {
        try {
            const idioma_temp = await getItem('idioma');
            this.setState({idioma: idioma_temp});
            const id = await getItem("idTemaModificar");
            const userid = await getItem("idUsuario");
            this.setState({ temaId: id, userId: userid });
            const res = await query('querySubjects', { "id": this.state.userId });
            aux = [];
            if (res.asignaturas != "") {
                for (let i = 0; i < res.asignaturas.length; i++) {
                    aux.push({ id: res.asignaturas[i].id, key: res.asignaturas[i].nombre });
                }
            }
            this.setState({asignaturas: aux});
        } catch (err) {
            console.log("Error getting tema to modify->", err);
        }
    }
    /*
    btnClick = async () => {
        query('querySubjects', { 'id': this.state.userId }).then(result => {

            this.setState({ asignaturas: [] })
            JSON.parse(result)['asignaturas'].forEach((asignatura) => {
                //ids = this.state.asignaturas_ids
                //ids.push({'key': asignatura['id']})
                var names = this.state.asignaturas
                names.push({ 'key': asignatura['nombre'], 'id': asignatura['id'] })
                //this.setState({asignaturas_ids: ids})
                this.setState({ asignaturas: names })
            })
        })
    }*/

    editTema = async () => {
        const { navigation } = this.props;
        const res = await query('changeTema', { 'id': this.state.temaId, 'nombre': this.state.newNombre, 'asignatura': this.state.newSubjectId });
        if (res.status == true) {
            Alert.alert("Canvi de tema", "El tema ha estat canviat amb exit.");
            navigation.navigate('Temas');
        }
        else {
            alert('Error');
        }

  }

    deleteTema = async () => {
        const { navigation } = this.props;
        const res = await query('deleteTema', { 'id': this.state.temaId });
        if (res.status == true) {
            Alert.alert("Tema esborrat", "El tema ha estat esborrat amb exit.");
            navigation.navigate('Temas');
        }
        else {
            alert('Error');
        }

  }

  /*querySubject = () => {
    query('queryTemas', {'id': this.state.subjectId}).then(result => {Alert.alert("Subject content", this.state.subjectId + '\n\n' + result)})
  }*/

    selectAsignatura = (value) => {
    this.setState({newSubjectId: value});
  }

    render() {
        const { navigation } = this.props;

        if(this.state.idioma == 'CAST'){
          label_Tema = 'TEMA';
          label_Nombre = 'Nombre';
          label_Asignatura = 'Asignatura';
          label_Guardar = 'Guardar';
          label_Borrar = 'Borrar';
        }else if(this.state.idioma == 'CAT'){
          label_Tema = 'TEMA';
          label_Nombre = 'Nom';
          label_Asignatura = 'Assignatura';
          label_Guardar = 'Guardar';
          label_Borrar = 'Esborrar';
        }else if(this.state.idioma == 'ENG'){
          label_Tema = 'THEME';
          label_Nombre = 'Name';
          label_Asignatura = 'Subject';
          label_Guardar = 'Save';
          label_Borrar = 'Delete';
        }

    return (
      <View style={styles.container}>
        <View style={styles.countContainer}>
          <Text>
            {label_Tema}
          </Text>
          <Text>
            {label_Nombre}
          </Text>
          <TextInput
            placeholder={label_Nombre}
            returnKeyLabel={"next"}
            onChangeText={(text) => this.setState({newNombre:text})}
            value={this.state.newNombre}
          ></TextInput>
          <Text>
            {label_Asignatura}
          </Text>
          <View>
            <Picker
              style={{ height: 50, width: 200 }}
              selectedValue={this.state.newSubjectId}
              onValueChange={this.selectAsignatura}
              >
                {this.state.asignaturas.map(item =>(
                  <Picker.Item label={item.key} value={item.id}/>
                ))}
            </Picker>
          </View>
          <View style={{flexDirection:"row"}}>
            <Button
              onPress={() => this.editTema()}
              title={label_Guardar}
              color="#20ff20"
            />
            <Button
              onPress={() => this.deleteTema(navigation)}
              title={label_Borrar}
              color="#ff0000"
            />
          </View>
        </View>
      </View>
    )
  }
}

export default ModificarTema;
