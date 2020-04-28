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

export default class ListaTemas extends PureComponent {

    state = {
        temas: [],
        loading: true
    }

    async componentDidMount() {
        try {
            const id = await getItem('idAsignaturaActual');
            const res = await query('queryTemas', { "id":id });
            var aux = [];
            if (res.temas != "") {
                for (let i = 0; i < res.temas.length; i++) {
                    aux.push({ id: res.temas[i].id, nombre: res.temas[i].nombre });
                }
            }
            this.setState({ temas: aux, loading: false });
        } catch (err) {
            console.log("Error getting Temas data->", err);
            this.componentDidMount();
        }
    }

    render() {
        const { temas, loading } = this.state;
        const { navigation } = this.props;

        const itemPressed = async (id) => {
            await storeItem('idTemaActual',id);
            navigation.navigate('Resumenes');
        }

        if (!loading) {
            return (
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={temas}
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