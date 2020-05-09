import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import styles from '../../styles/styles';

export default class OCRButton extends Component{
    render() {
        return(
        //'IniciarCamer'   'MuestraEditaNuevoResumen'
        <TouchableOpacity style={{ backgroundColor: 'grey' }} onPress={() => this.props.navigation.navigate('MuestraEditaNuevoResumen')}>
            <View style={styles.listItemContainer}>
                <Text style={styles.ItemHeader}>Realizar Escaneo</Text>
                <Image style={styles.pencil} source={require('../../Images/camera.png')} />
            </View>
        </TouchableOpacity>
        )
    }
}
