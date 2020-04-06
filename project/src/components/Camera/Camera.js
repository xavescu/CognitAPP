import React, { Component } from 'react';
import { View, Text } from 'react-native';


import ImagePicker from 'react-native-image-picker';

export default class Camera extends Component {
  
  render() {
    const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
    return (
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
          
              // You can also display the image using data:
            //const source = {uri:''+ response.data };
          
              this.setState({
                avatarSource: source,
              });
            }
          })
    );
  }
}
