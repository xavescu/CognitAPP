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
      temas: []
    }

    async componentDidMount() {
        try {
            const id = await getItem("idResumenModificar");
            const userid = await getItem("idUsuario");
            const nombreresumen = await getItem("nombreResumen");
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
      return (
        <View style={styles.container}>
          <View style={styles.countContainer}>
            <Text>
              Editar resumen/examen
            </Text>
            <Text>
              Nombre resumen/examen
            </Text>
            <TextInput
              placeholder={this.state.nombreResumen}
              returnKeyLabel={"next"}
              onChangeText={(text) => this.setState({newNombreResumen:text})}
              value={this.state.newNombreResumen}
            ></TextInput>
            <Text>
              Tema
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
            <View style={{flexDirection:"row"}}>
              <Button
                onPress={() => this.editResumen()}
                title="editar resumen"
                color="#20ff20"
              />
              <Button
                onPress={() => this.deleteResumen()}
                title="borrar resumen"
                color="#ff0000"
              />
            </View>
          </View>
        </View>
      )
    }
  }

  export default ModificarResumen;
