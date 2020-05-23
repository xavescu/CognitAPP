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
import { getItem } from '../../CommonFunctions/ManageItems';

let label_done = '';
let label_NoDone = '';

export default class ListaFitas extends PureComponent {

    state = {
        fitas: [],
        loading: true,
        idioma:''
    }

    async componentDidMount() {
        const idioma_tmp = await getItem('idioma');
        this.setState({idioma : idioma_tmp});
        this.refreshFites();
    }

    async refreshFites() {
        try {
            const id = await getItem('idUsuario');
            const res = await query('getFites', { "id": id });
            aux = [];
            if (res.fites != "") {
                for (let i = 0; i < res.fites.length; i++) {
                    aux.push({
                        id: res.fites[i].id,
                        nombre: res.fites[i].nombre,
                        fecha_limite: res.fites[i].fecha_limite,
                        hecho: res.fites[i].hecho,
                    });
                }
            }
            this.setState({ fitas: aux, loading: false });
        } catch (err) {
            console.log("Error getting Fitas data->", err);
        }
    }

    render() {
        const { fitas, loading } = this.state;
         if(this.state.idioma == 'CAST') {
            label_done = 'Hecho';
            label_NoDone = 'Falta por hacer';
        }else if(this.state.idioma == 'CAT') {
            label_done = 'Fet';
            label_NoDone = 'Falta per fer';
        }else if(this.state.idioma == 'ENG'){
            label_done = 'Done';
            label_NoDone = 'Not done';
        }


        const itemPressed = async (id) => {
            await query('completarFita', { "id": id });
            this.refreshFites();
        }

        if (!loading) {                                         // Se puede cambiar el texto a una imagen por ejemplo o estilo para ponerlo de diferentes colores
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.separador}/> 
                    <FlatList
                        data={fitas}
                        renderItem={(data) =>
                            <TouchableOpacity style={{ backgroundColor: '#85929E' }} onPress={() => { itemPressed(data.item.id) }}>
                                <View style={styles.listItemContainer}>
                                    <Text style={styles.ItemHeader}>{data.item.nombre}</Text>
                                    <Text>{data.item.fecha_limite}</Text>
                                    { data.item.hecho == 0 ? (<Text> {label_NoDone} </Text>) : (<Text> {label_done} </Text>) }
                                </View>
                            </TouchableOpacity>
                        }
                        keyExtractor={(item) => item.id} />
                </SafeAreaView>
            )
        } else {
            return <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        }
    }
} 