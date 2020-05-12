import React, { PureComponent } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    ActivityIndicator
} from 'react-native';

import styles from '../../styles/styles';
import { query } from '../../CommonFunctions/fetchQuery';
import { storeItem, getItem } from '../../CommonFunctions/ManageItems';
import OCRButton from '../ocr/OCRButton';
import MuestraEditaResumen from '../muestraEditaResumen/muestraEditaResumen';

export default class ListaResumenes extends PureComponent {

    state = {
        resumenes: [],
        loading: true
    }

    async componentDidMount() {
        try {
            const id = await getItem('idTemaActual');
            const res = await query('queryResumenes', { "id": id });
            var aux = [];
            if (res.resumenes != "") {
                for (let i = 0; i < res.resumenes.length; i++) {
                    aux.push({ id: res.resumenes[i].id, nombre: res.resumenes[i].nombre });
                }
            }
            this.setState({ resumenes: aux, loading: false });
        } catch (err) {
            console.log("Error getting Resumenes data->", err);
        }
    }

    GetResumenes = (form) => {
        var formBody = [];
        for (var property in form) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(form[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch('http://cognitapp.duckdns.org/queryResumenes', {
            method: 'POST',
            headers: {
                'Accept': 'x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
            .then((response) => response.json())
            .then((res) => {
                var aux = [];
                if (res.resumenes != "") {
                    for (let i = 0; i < res.resumenes.length; i++) {
                        aux.push({ id: res.resumenes[i].id_documento, nombre: res.resumenes[i].nombre });
                    }
                }
                return aux;
            })
    }

    render() {
        const { resumenes, loading } = this.state;
        const { navigation } = this.props;

         const itemPressed = async (id_res, nombre) => {
            let id_tema = await getItem('idTemaActual');
            await storeItem('id_resumen', id_res);
            await storeItem('nombre_documento', nombre);
            await storeItem('id_tema', id_tema);
            navigation.navigate('MuestraEditaResumen');
         }

        const itemModificar = async (id, nombre) => {
            await storeItem('idResumenModificar', id);
            await storeItem('nombreResumen', nombre);
            navigation.navigate('ModificarResumen');
        }

        if (!loading) {
            return (
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={resumenes}
                        renderItem={(data) =>
                            <TouchableOpacity style={{ backgroundColor: 'grey' }} onPress={() => { itemPressed(data.item.id, data.item.nombre) }}>
                                <View style={styles.listItemContainer}>
                                    <Text style={styles.ItemHeader}>{data.item.nombre}</Text>
                                    <TouchableOpacity style={{ backgroundColor: 'grey' }} onPress={() => { itemModificar(data.item.id, data.item.nombre) }}>
                                        <Image style={styles.pencil} source={require('../../Images/pencil.png')} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        }
                        keyExtractor={(item) => item.id} 
                    />
                    <OCRButton navigation={this.props.navigation}/>
                </SafeAreaView>
            )
        } else {
            return <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        }
    }
}