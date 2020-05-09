import * as React from 'react';
import { Button, Image, View, Text, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class IniciarCamera extends React.Component {
  state = {
      base64: null,
      image: null
  };

    render() {
        const { image } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Obre camera" onPress={this._pickImage} />
            <Text>{image}</Text>
        <Button
        title="Upload!"
        onPress={this.uploadFile.bind(this)}
        />
      </View>
    );
    }

  _pickImage = async () => {
    try {
        await ImagePicker.launchCamera({
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                this.setState({
                    base64: response.data,
                    image: response.uri
                });
            }
        });
    } catch (E) {
      console.log(E);
    }
  };

    async uploadFile() {
    const { base64 } = this.state;
        const cosa = await query('ocr64', base64);
        Alert.alert("Respuesta", JSON.stringify(cosa));
    }


}
const query = async (endpoint, form) => {
    var formdata = new FormData();
    formdata.append("img", form);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    return await fetch("http://cognitapp.duckdns.org/"+endpoint, requestOptions)
        .then(response => response.text())
        .then(result => result)
        .catch(error => error);
    }