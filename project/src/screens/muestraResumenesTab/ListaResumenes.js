import React, { PureComponent } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    ActivityIndicator,
	Modal,
    Button,
} from 'react-native';

import styles from '../../styles/styles';
import { query } from '../../CommonFunctions/fetchQuery';
import { storeItem, getItem } from '../../CommonFunctions/ManageItems';
import OCRButton from '../ocr/OCRButton';
import MuestraEditaResumen from '../muestraEditaResumen/muestraEditaResumen';

export default class ListaResumenes extends PureComponent {

    state = {
        resumenes: [],
        loading: true,
		first_run: true,
        mostrarAyudaCargar: false,
        mostrarAyudaScan: false,
        mostrarAyudaCrear: false,
        mostrarAyudaNuevo: false,
        fondoBoton1: true,
        fondoBoton2: false,
        fondoBoton3: false,
        fondoBoton4: false,
    }

    async componentDidMount() {
        this.llenarResumen();
    }
	
	async llenarResumen(){
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
    
    showAlert = () =>{
        alert("Crea tu primer documento para continuar!");
    }

    showSegundaPantalla =()=>{
        this.setState({mostrarAyudaCargar: false});
        this.setState({mostrarAyudaScan: true});
        this.setState({fondoBoton1: false});
    }

    showTerceraPantalla =()=>{
        this.setState({mostrarAyudaCargar: false});
        this.setState({mostrarAyudaScan: false});
        this.setState({fondoBoton1: false});
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
        const { first_run } = this.state;
        const { fondoBoton1 } = this.state;

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
					{ first_run == true ? (
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
                        <TouchableOpacity style={fondoBoton1 == true ? (styles.background_green):(styles.background_grey)} onPress = {()=>this.showAlert()}>
                            <View style={styles.listItemContainer}>
                                <Text style={styles.ItemHeader}>Cargar Pantalla</Text>
                            </View>
                        </TouchableOpacity>
                        <Modal visible={this.state.mostrarAyudaCargar} 
                        transparent = {true}>
                            <View style = {styles.vModal2}>
                                <Text>Con este boton podras reacargar la pantalla</Text>
                                <Text></Text>
                                <Button 
                                    title="Ok"
                                    onPress = {()=>this.showSegundaPantalla()}
                                />
                            </View>
                        </Modal>
                        <Modal visible={this.state.mostrarAyudaScan} 
                        transparent = {true}>
                            <View style = {styles.vModal2}>
                                <Text>Ahora crea tu primer resumen!</Text>
                                <Text></Text>
                                <Button 
                                    title="Ok"
                                    onPress = {()=>this.showTerceraPantalla()}
                                />
                            </View>
                        </Modal>
                    </SafeAreaView>
					)
					:
					(
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
						<TouchableOpacity style={{ backgroundColor: 'grey' }} onPress = {()=>this.llenarResumen()}>
							<View style={styles.listItemContainer}>
								<Text style={styles.ItemHeader}>Cargar Pantalla</Text>
							</View>
						</TouchableOpacity>
					</SafeAreaView>
					)}
				</SafeAreaView>
            )
        } else {
            return <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        }
    }
}