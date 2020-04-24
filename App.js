import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Button,
  Alert
} from 'react-native'

class App extends Component {
  state = {
    count: 0,
    userId: 0,
    subjectId: 0,
    nombre: '',
    temaId: 0,
    newNombre: '',
    newSubjectId: 0
  }

  query = (endpoint, form) => {
    var formBody = [];
    for (var property in form) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(form[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
  
    return fetch('http://cognitapp.duckdns.org/' + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
    .then((response) => response.text())
    .then((jsoned) => {
      return jsoned
    })
  
  }

  queryAndAlert = (endpoint, form) => {
    this.query(endpoint, form).then(result => {
      Alert.alert("Query result", result)
    })
  }

  btnClick = () => {
    this.query('queryTemas', {'id': this.state.subjectId}).then(result => {
      //Alert.alert("Query result", this.state.subjectId + '\n\n' + result)
      JSON.parse(result)['temas'].forEach((tema) => {
        if(tema['nombre']==this.state.nombre) {
          this.setState({temaId: tema['id'], newNombre: this.state.nombre, newSubjectId: this.state.subjectId})
        }
      })
    })
  }

  editTema = () => {
    this.query('changeTema', {'id': this.state.subjectId, 'nombre': this.state.nombre, 'nuevonombre': this.state.newNombre, 'nuevaasignatura': this.state.newSubjectId}).then(res => {Alert.alert('result', res)})
  }

  querySubject = () => {
    this.query('queryTemas', {'id': this.state.subjectId}).then(result => {Alert.alert("Subject content", this.state.subjectId + '\n\n' + result)})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sql}>
          <Text>
            Pillar datos
          </Text>
          <TextInput
            placeholder="IDassig"
            returnKeyLabel={"next"}
            onChangeText={(text) => this.setState({subjectId:text})}
          ></TextInput>
          <TextInput
            placeholder="TemaName"
            returnKeyLabel={"next"}
            onChangeText={(text) => this.setState({nombre:text})}
          ></TextInput>
          <Button
            onPress={() => this.btnClick()}
            title="Query"
            color="#20ff20"
          />
        </View>
        <View style={styles.countContainer}>
          <Text>
            TEMA
          </Text>
          <Text>
            Tema ID
          </Text>
          <Text>{this.state.temaId}</Text>
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
          <TextInput
            placeholder="Asignatura"
            returnKeyLabel={"next"}
            onChangeText={(text) => this.setState({newSubjectId:text})}
            value={this.state.newSubjectId.toString()}
          ></TextInput>
          <Button
            onPress={() => this.editTema()}
            title="guardar"
            color="#20ff20"
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10
  },
  sql: {
    alignItems: 'center',
    marginBottom: 90
  }
})

export default App;
