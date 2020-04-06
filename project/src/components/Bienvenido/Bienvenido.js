import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Bienvenido extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> Bienvenido </Text>
      </View>
    );
  }
}
