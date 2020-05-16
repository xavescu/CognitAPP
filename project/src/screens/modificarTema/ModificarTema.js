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
      asignaturas: []
  }

    async componentDidMount() {
        try {
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

    return (
      <View style={styles.container}>
        <View style={styles.countContainer}>
          <Text>
            TEMA
          </Text>
          <Text>
            Nombre
          </Text>
          <TextInput
            placeholder="Nombre"
            returnKeyLabel={"next"}
            onChangeText={(text) => this.setState({newNombre:text})}
            value={this.state.newNombre}
          ></TextInput>
          <Text>
            Asignatura
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
              title="guardar"
              color="#20ff20"
            />
            <Button
              onPress={() => this.deleteTema(navigation)}
              title="borrar"
              color="#ff0000"
            />
          </View>
        </View>
      </View>
    )
  }
}

export default ModificarTema;
