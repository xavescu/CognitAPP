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

export default class ListaExamenes extends PureComponent {
    state = {
        examenes: [],
        loading: true
    }

    async componentDidMount() {
        try {
            const id = await getItem('idTemaActual');
            const res = await query('queryExamenes', { "id": id });
            var aux = [];
            if (res.resumenes != "") {
                for (let i = 0; i < res.resumenes.length; i++) {
                    aux.push({ id: res.resumenes[i].id_documento, nombre: res.resumenes[i].nombre });
                }
            }
            this.setState({ examenes: aux, loading: false });
        } catch (err) {
            console.log("Error getting Examens data->", err);
        }
    }

    render() {
        const { examenes, loading } = this.state;
        const { navigation } = this.props;

        const itemPressed = async (id) => {
            await storeItem('idExamenActual', id);
            //navigation.navigate('COMING SOON');
        }

        if (!loading) {
            return (
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={examenes}
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