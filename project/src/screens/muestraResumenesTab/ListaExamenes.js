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
import Texttomp3 from '../../CommonFunctions/mp3/texttomp3';
import { storeItem, getItem } from '../../CommonFunctions/ManageItems';
import OCRButton from '../ocr/OCRButton';
import MuestraEditaResumen from '../muestraEditaResumen/muestraEditaResumen';

let label_CargarPantalla = '';

export default class ListaExamenes extends PureComponent {
    state = {
        examenes: [],
        loading: true,
        idioma: ''
    }

    async componentDidMount() {
        await storeItem('idPantalla', '4');
        const idioma_temp = await getItem('idioma');
        this.setState({idioma: idioma_temp});
        this.llenarExamen();
    }

	async llenarExamen(){
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

        if(this.state.idioma == 'CAST'){
            label_CargarPantalla = 'Cargar Pantalla';
        }else if(this.state.idioma == 'CAT'){
            label_CargarPantalla = 'Carregar Pantalla';
        }else if(this.state.idioma == 'ENG'){
            label_CargarPantalla = 'Reload Screen';
        }

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
                        data={examenes}
                        renderItem={(data) =>
                            <TouchableOpacity style={{ backgroundColor: '#85929E' }} onPress={() => { itemPressed(data.item.id, data.item.nombre) }}>
                                <View style={styles.listItemContainer}>
                                    <Text style={styles.ItemHeader}>{data.item.nombre}</Text>
                                    <TouchableOpacity style={{ backgroundColor: '#85929E' }} onPress={() => { itemModificar(data.item.id, data.item.nombre) }}>
                                        <Image style={styles.pencil} source={require('../../Images/pencil.png')} />
                                    </TouchableOpacity>
                                    <Texttomp3 txt={data.item.nombre} txt2={data.item.id}></Texttomp3> 
                                </View>
                            </TouchableOpacity>
                        }
                        keyExtractor={(item) => item.id} />
                        <OCRButton navigation={this.props.navigation}/>
						<TouchableOpacity style={{ backgroundColor: '#FF0033' }} onPress = {()=>this.llenarExamen()}>
                            <View style={styles.listItemContainer}>
                                <Text style={styles.ItemHeader}>{label_CargarPantalla}</Text>
                            </View>
                        </TouchableOpacity>
                </SafeAreaView>
            )
        } else {
            return <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        }
    }
}