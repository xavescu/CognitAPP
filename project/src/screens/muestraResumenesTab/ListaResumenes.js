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
import Texttomp3 from '../../CommonFunctions/mp3/texttomp3';
import { storeItem, getItem } from '../../CommonFunctions/ManageItems';
import OCRButton from '../ocr/OCRButton';
import MuestraEditaResumen from '../muestraEditaResumen/muestraEditaResumen';
import MuestraImagen from '../muestraImagen/MuestraImagen';
import RNFetchBlob from 'react-native-fetch-blob'

export default class ListaResumenes extends PureComponent {

    state = {
        resumenes: [],
        loading: true,
		first_run: false,
        mostrarAyudaCargar: true,
        mostrarAyudaScan: false,
        mostrarAyudaCrear: false,
        mostrarAyudaNuevo: false,
        fondoBoton1: true,
        fondoBoton2: false,
        fondoBoton3: false,
        fondoBoton4: false,
    }

    async componentDidMount() {
        await storeItem('idPantalla', '3');
        const tutorial = await getItem('tutorial');
        if (tutorial == 1){
            this.setState({first_run: true});
        }else{
            this.setState({first_run: false});
        }
        this.llenarResumen();
    }
	
	async llenarResumen(){
		try {
            const id = await getItem('idTemaActual');
            const res = await query('queryResumenes', { "id": id });
            var aux = [];

            if (res.resumenes != "") {
                for (let i = 0; i < res.resumenes.length; i++) {
                    aux.push({ id: res.resumenes[i].id, nombre: res.resumenes[i].nombre, foto: res.resumenes[i].foto, texto: res.resumenes[i].texto  });
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

    async getPDF(idResumen, nombreResumen){
        ///var fullPath = '/storage/emulated/0/Android/data/com.loginapp/files/' + nombreResumen +'.pdf';
        var fullPath = '/storage/emulated/0/Download/' + nombreResumen +'.pdf';
        try {
            var form = {
                id: idResumen,
              }
              var formBody = [];
              for (var property in form) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(form[property]);
                formBody.push(encodedKey + "=" + encodedValue);
              }
              formBody = formBody.join("&");
            let value =   await RNFetchBlob
            .config({
              fileCache : true,
              appendExt : 'pdf',
              path : fullPath
              })
             .fetch('POST','http://cognitapp.duckdns.org/getPdf', {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8,ca;q=0.7',
            },formBody)
            .then((res) => {
              console.log("resd", res);
              console.log('The file saved to ',res.path());
              alert("Archivo exportado a PDF correctamente en Descargas!");
            })
          }
           catch (error) {
            console.log('The file saved get an error ');
          }
    }

    render() {
        const { resumenes, loading } = this.state;
        const { navigation } = this.props;
        const { first_run } = this.state;
        const { fondoBoton1 } = this.state;

         const itemPressed = async (id_res, nombre, fotico, textaco) => {
            let id_tema = await getItem('idTemaActual');
            //console.log(id_res,"id_res")
            //console.log(nombre,"nombre")

            await storeItem('id_resumen', id_res);
            await storeItem('nombre_documento', nombre);
            await storeItem('id_tema', id_tema)
            await storeItem('foto', fotico);

            if(fotico == '1'){
                navigation.navigate('MuestraImagen', {textoImagen: textaco});
            }else{
                navigation.navigate('MuestraEditaResumen');
            }
         }

        const itemModificar = async (id, nombre) => {
            await storeItem('idResumenModificar', id);
            await storeItem('nombreResumen', nombre);
            navigation.navigate('ModificarResumen');
        }
        console.log(this.state.esFoto)
        if (!loading) {
            return (
				<SafeAreaView style={styles.container}>
					{ first_run == true ? (
					<SafeAreaView style={styles.container}>
						<FlatList
							data={resumenes}
							renderItem={(item) =>
								<TouchableOpacity style={{ backgroundColor: 'grey' }} onPress={() => { itemPressed(data.item.id, data.item.nombre, data.item.foto, data.item.texto) }}>
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
								<TouchableOpacity style={{ backgroundColor: 'grey' }} onPress={() => { itemPressed(data.item.id, data.item.nombre, data.item.foto, data.item.texto) }}>
									<View style={styles.listItemContainer}>
										<Text style={styles.ItemHeader}>{data.item.nombre}</Text>
										<TouchableOpacity style={{ backgroundColor: 'grey' }} onPress={() => { itemModificar(data.item.id, data.item.nombre) }}>
											<Image style={styles.pencil} source={require('../../Images/pencil.png')} />
										</TouchableOpacity>
                                        <TouchableOpacity style={{ backgroundColor: 'grey' }} onPress={()=>this.getPDF(data.item.id, data.item.nombre)}>
											<Image style={styles.pencil} source={require('../../Images/pdf.png')} />
										</TouchableOpacity>
										{data.item.foto == '0' ? (
										    <Texttomp3 txt={data.item.nombre} txt2={data.item.id}></Texttomp3>) : (<Text/>)
										}
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