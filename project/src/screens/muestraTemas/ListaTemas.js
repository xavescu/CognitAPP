import React, { PureComponent } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    Modal,
    TextInput,
    Button,
    ActivityIndicator
} from 'react-native';

import styles from '../../styles/styles';
import { query } from '../../CommonFunctions/fetchQuery';
import { storeItem, getItem } from '../../CommonFunctions/ManageItems';

export default class ListaTemas extends PureComponent {

    state = {
        temas: [],
        loading: true,
        showTema: false,
        newTema: 'Default'
    }

    async componentDidMount() {
        this.llenarTema();
    }

    async llenarTema() {
        try {
            const id = await getItem('idAsignaturaActual');
            const res = await query('queryTemas', { "id": id });
            var aux = [];
            if (res.temas != "") {
                for (let i = 0; i < res.temas.length; i++) {
                    aux.push({ id: res.temas[i].id, nombre: res.temas[i].nombre });
                }
            }
            this.setState({ temas: aux, loading: false });
        } catch (err) {
            console.log("Error getting Temas data->", err);
        }
    }

    cancelar = () => {
        this.setState({ showTema: false });
    }
    showVentana = () => {
        this.setState({ showTema: true });
    }

    async createTema() {
        try {
            const id = await getItem('idAsignaturaActual');
            const res = await query('storeTema', { "nombre": this.state.newTema, "id": id });
            if (res.status == true) {
                alert("Tema \"" + this.state.newTema + "\" creat");
                this.llenarTema();
                this.cancelar();
            }
        } catch (err) {
            console.log("Error creating Tema data->", err);
        }
    }

    render() {
        const { temas, loading } = this.state;
        const { navigation } = this.props;

        const itemPressed = async (id) => {
            await storeItem('idTemaActual',id);
            navigation.navigate('Resumenes');
        }

        const itemModificar = async (id) => {
            await storeItem('idTemaModificar', id);
            navigation.navigate('ModificarTema');
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
                                    <TouchableOpacity style={{ backgroundColor: 'grey' }} onPress={() => { itemModificar(data.item.id) }}>
                                        <Image style={styles.pencil} source={require('../../Images/pencil.png')} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        }
                        keyExtractor={(item) => item.id} />
                                <View>
                                    <TouchableOpacity style={{ backgroundColor: 'grey' }} onPress={() => this.showVentana()}>
                                        <View style={styles.listItemContainer}>
                                            <Text style={styles.ItemHeader}>Crear Tema</Text>
                                            <Image style={styles.pencil} source={require('../../Images/iconPlus.png')} />
                                        </View>
                                    </TouchableOpacity>
                    </View>
                    <Modal visible={this.state.showTema}
                        transparent={true}>
                        <View style={styles.vModal2}>
                            <View >
                                <TextInput
                                    placeholder='Nombre Tema'
                                    onChangeText={(newTema) => this.setState({ newTema })}
                                />
                                <Button
                                    title="Crear"
                                    onPress={() => this.createTema()}
                                />
                                <Button
                                    title="Cancelar"
                                    onPress={() => this.cancelar()}
                                />
                            </View>
                        </View>
                    </Modal>
                </SafeAreaView>
            )
        } else {
            return <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        }
    }
}