import React, { Component } from 'react';
import { Text, View, TextInput, Alert, componentDidMount, TouchableOpacity, Modal, Button } from 'react-native';
import styles from '../../styles/styles';
import { query } from '../../CommonFunctions/fetchQuery';
import { storeItem, getItem } from '../../CommonFunctions/ManageItems';

export default class codigoArchivo extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
  
    render() {
      return (
        <View>
          <Text> prueba </Text>
        </View>
      );
    }
  }
