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

export default class ListaFitas extends PureComponent {

    state = {
        fitas: [],
        loading: true,
    }

    componentDidMount() {
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

        const itemPressed = async (id) => {
            await query('completarFita', { "id": id });
            this.refreshFites();
        }

        if (!loading) {                                         // Se puede cambiar el texto a una imagen por ejemplo o estilo para ponerlo de diferentes colores
            return (
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={fitas}
                        renderItem={(data) =>
                            <TouchableOpacity style={{ backgroundColor: 'grey' }} onPress={() => { itemPressed(data.item.id) }}>
                                <View style={styles.listItemContainer}>
                                    <Text style={styles.ItemHeader}>{data.item.nombre}</Text>
                                    <Text>{data.item.fecha_limite}</Text>
                                    { data.item.hecho == 0 ? (<Text> not done </Text>) : (<Text> done </Text>) }
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