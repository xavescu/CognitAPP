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

export default class ListaAsignaturas extends PureComponent {

    state = {
        asignaturas: [],
        loading: true
    }

    async componentDidMount() {
        try {
            const id = await getItem('idUsuario');
            const res = await query('querySubjects', { "id": id });
            aux = [];
            if (res.asignaturas != "") {
                for (let i = 0; i < res.asignaturas.length; i++) {
                    aux.push({ id: res.asignaturas[i].id, nombre: res.asignaturas[i].nombre });
                }
            }
            this.setState({ asignaturas: aux, loading: false });
        } catch (err) {
            console.log("Error getting Asignaturas data->", err);
        }
    }

    render() {
        const { asignaturas, loading } = this.state;
        const { navigation } = this.props;

        const itemPressed = async (id) => {
            await storeItem('idAsignaturaActual', id);
            navigation.navigate('Temas');
        }

        if (!loading) {
            return (
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={asignaturas}
                        renderItem={(data) =>
                            <TouchableOpacity style={{ backgroundColor: 'grey' }} onPress={() => { itemPressed(data.item.id) }}>
                                <View style={styles.listItemContainer}>
                                    <Text style={styles.ItemHeader}>{data.item.nombre}</Text>
                                    <Image style={styles.pencil} source={require('../../Images/pencil.png')} />
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