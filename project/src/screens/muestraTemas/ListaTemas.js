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
import OCRButton from '../ocr/OCRButton';

let label_CrearTema = '';
let label_RealizarEscaneo = '';
let label_CargarPantalla = '';
let label_EntraEnTuTemaNuevoParaCrearTuPrimerDocumento = '';
let label_ConEsteBotonPodrasRecargarLaPantalla = '';
let label_ConEsteBotonPodrasEscanearLosResumenesOFotosQueQuieras = '';
let label_ConEsteBotonPodrasCrearNuevosTemasPorFavorCreaUnNuevoTema = '';

export default class ListaTemas extends PureComponent {

    state = {
        temas: [],
        loading: true,
        showTema: false,
        newTema: 'Default',
        first_run: false,
        mostrarAyudaCargar: true,
        mostrarAyudaScan: false,
        mostrarAyudaCrear: false,
        mostrarAyudaNuevo: false,
        fondoBoton1: true,
        fondoBoton2: false,
        fondoBoton3: false,
        fondoBoton4: false,
        idioma: '',
    }

    async componentDidMount() {
        await storeItem('idPantalla', '2');
        const tutorial = await getItem('tutorial');
        if (tutorial == 1){
            this.setState({first_run: true});
        }else{
            this.setState({first_run: false});
        }
        this.llenarTema();
    }

    async llenarTema() {
        try {
            const idioma_temp = await getItem('idioma');
            this.setState({idioma: idioma_temp});
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

    showAlert = () =>{
        alert("Crea un nuevo tema para continuar!");
    }

    showSegundaPantalla =()=>{
        this.setState({mostrarAyudaCargar: false});
        this.setState({mostrarAyudaScan: true});
        this.setState({mostrarAyudaCrear: false});
        this.setState({mostrarAyudaNuevo: false});
        this.setState({fondoBoton1: false});
        this.setState({fondoBoton2: true});
        this.setState({fondoBoton3: false});
        this.setState({fondoBoton4: false});
    }
    showTerceraPantalla =()=>{
        this.setState({mostrarAyudaCargar: false});
        this.setState({mostrarAyudaScan: false});
        this.setState({mostrarAyudaCrear: true});
        this.setState({mostrarAyudaNuevo: false});
        this.setState({fondoBoton1: false});
        this.setState({fondoBoton2: false});
        this.setState({fondoBoton3: true});
        this.setState({fondoBoton4: false});
    }
    showCuartaPantalla = () =>{
        this.setState({mostrarAyudaCargar: false});
        this.setState({mostrarAyudaScan: false});
        this.setState({mostrarAyudaCrear: false});
        this.setState({mostrarAyudaNuevo: true});
        this.setState({fondoBoton1: false});
        this.setState({fondoBoton2: false});
        this.setState({fondoBoton3: false});
        this.setState({fondoBoton4: true});
    }

    showQuintaPantalla = () =>{
        this.setState({mostrarAyudaCargar: false});
        this.setState({mostrarAyudaScan: false});
        this.setState({mostrarAyudaCrear: false});
        this.setState({mostrarAyudaNuevo: false});
        this.setState({fondoBoton1: false});
        this.setState({fondoBoton2: false});
        this.setState({fondoBoton3: false});
        this.setState({fondoBoton4: true});
    }

    async createTema() {
        try {
            const id = await getItem('idAsignaturaActual');
            const res = await query('storeTema', { "nombre": this.state.newTema, "id": id });
            if (res.status == true) {
                alert("Tema \"" + this.state.newTema + "\" creat");
                this.llenarTema();
                this.cancelar();
                if(this.state.first_run == true){
                    this.showCuartaPantalla();
                }
            }
        } catch (err) {
            console.log("Error creating Tema data->", err);
        }
    }

    render() {
        const { temas, loading } = this.state;
        const { navigation } = this.props;
        const { first_run } = this.state;
        const { fondoBoton1 } = this.state;
        const { fondoBoton2 } = this.state;
        const { fondoBoton3 } = this.state;
        const { fondoBoton4 } = this.state;



        if (this.state.idioma == 'CAST'){
            label_CrearTema = 'Crear Tema';
            label_RealizarEscaneo = 'Realizar Escaneo';
            label_CargarPantalla = 'Cargar Pantalla';
            label_EntraEnTuTemaNuevoParaCrearTuPrimerDocumento = 'Entra en tu nuevo Tema para crear tu primer documento!';
            label_ConEsteBotonPodrasRecargarLaPantalla = 'Con este boton podras recargar la pantalla';
            label_ConEsteBotonPodrasEscanearLosResumenesOFotosQueQuieras = 'Con este boton podras escanear los resumenes o fotos que quieras';
            label_ConEsteBotonPodrasCrearNuevosTemasPorFavorCreaUnNuevoTema = 'Con este boton podras crear nuevos temas. Por favor crea un nuevo Tema';
        } else if (this.state.idioma == 'CAT'){
            label_CrearTema = 'Crar Tema';
            label_RealizarEscaneo = 'Realitzar Escaneig';
            label_CargarPantalla = 'Cargar Pantalla';
            label_EntraEnTuTemaNuevoParaCrearTuPrimerDocumento = 'Entra en el teu nou Tema per crear el teu primer document!';
            label_ConEsteBotonPodrasRecargarLaPantalla = 'Amb aquest boto podras carregar la pantalla';
            label_ConEsteBotonPodrasEscanearLosResumenesOFotosQueQuieras = 'Amb aquest boto podras escanejar els resums o fotos que vulguis';
            label_ConEsteBotonPodrasCrearNuevosTemasPorFavorCreaUnNuevoTema = 'Amb aquest boto podras crear nous temes. Siusplau crea un nou Tema';
        } else if (this.state.idioma == 'ENG'){
            label_CrearTema = 'Create Theme';
            label_RealizarEscaneo = 'Executen Scan';
            label_CargarPantalla = 'Reload Screen';
            label_EntraEnTuTemaNuevoParaCrearTuPrimerDocumento = 'Enter in your new theme to create your first document';
            label_ConEsteBotonPodrasRecargarLaPantalla = 'With this button you will be available to reload the screen';
            label_ConEsteBotonPodrasEscanearLosResumenesOFotosQueQuieras = 'With thi button you will be available to scan resumes or photos';
            label_ConEsteBotonPodrasCrearNuevosTemasPorFavorCreaUnNuevoTema = 'With thi button you will be available create new Themes. Please, create a new Theme';
        }

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
                    { first_run == true ? (
                        <SafeAreaView style={styles.container}>
                        <FlatList
                            data={temas}
                            renderItem={(data) =>
                                <TouchableOpacity style={fondoBoton4 == true ? (styles.background_green):(styles.background_grey)} onPress={() => { itemPressed(data.item.id) }}>
                                    <View style={styles.listItemContainer}>
                                        <Text style={styles.ItemHeader}>{data.item.nombre}</Text>
                                        <TouchableOpacity onPress={() => { itemModificar(data.item.id) }}>
                                            <Image style={styles.pencil} source={require('../../Images/pencil.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            }
                            keyExtractor={(item) => item.id} />
                        <View>
                        <TouchableOpacity style={fondoBoton3 == true ? (styles.background_green):(styles.background_grey)} onPress = {()=>this.showVentana()}>
                            <View style={styles.listItemContainer}>
                                <Text style={styles.ItemHeader}>{label_CrearTema}</Text>
                                <Image style={styles.pencil} source={require('../../Images/iconPlus.png')}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={fondoBoton2 == true ? (styles.background_green):(styles.background_grey)} onPress = {()=>this.showAlert()} >
                            <View style={styles.listItemContainer}>
                                <Text style={styles.ItemHeader}>{label_RealizarEscaneo}</Text>
                                <Image style={styles.pencil} source={require('../../Images/camera.png')} />
                            </View>
                        </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={fondoBoton1 == true ? (styles.background_green):(styles.background_grey)} onPress = {()=>this.llenarTema()}>
                                <View style={styles.listItemContainer}>
                                    <Text style={styles.ItemHeader}>{label_CargarPantalla}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Modal visible={this.state.mostrarAyudaNuevo} 
                        transparent = {true}>
                            <View style = {styles.vModal2}>
                                <Text>{label_EntraEnTuTemaNuevoParaCrearTuPrimerDocumento}</Text>
                                <Text></Text>
                                <Button 
                                    title="Ok"
                                    color="#FF0033"
                                    onPress = {()=>this.showQuintaPantalla()}
                                    style = {styles.botonRegistro}
                                />
                            </View>
                        </Modal>
                        <Modal visible={this.state.mostrarAyudaCargar} 
                        transparent = {true}>
                            <View style = {styles.vModal2}>
                                <Text>{label_ConEsteBotonPodrasRecargarLaPantalla}</Text>
                                <Text></Text>
                                <Button 
                                    title="Ok"
                                    color="#FF0033"
                                    onPress = {()=>this.showSegundaPantalla()}
                                    style = {styles.botonRegistro}
                                />
                            </View>
                        </Modal>
                        <Modal visible={this.state.mostrarAyudaScan} 
                        transparent = {true}>
                            <View style = {styles.vModal2}>
                                <Text>{label_ConEsteBotonPodrasEscanearLosResumenesOFotosQueQuieras}</Text>
                                <Text></Text>
                                <Button 
                                    title="Ok"
                                    color="#FF0033"
                                    onPress = {()=>this.showTerceraPantalla()}
                                    style = {styles.botonRegistro}
                                />
                            </View>
                        </Modal>
                        <Modal visible={this.state.mostrarAyudaCrear} 
                        transparent = {true}>
                            <View style = {styles.vModal2}>
                                <Text>{label_ConEsteBotonPodrasCrearNuevosTemasPorFavorCreaUnNuevoTema}</Text>
                                <Text></Text>
                                <Button 
                                    title="Ok"
                                    color="#FF0033"
                                    onPress = {()=>this.showQuintaPantalla()}
                                    style = {styles.botonRegistro}
                                />
                            </View>
                        </Modal>
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
                                        color="#FF0033"
                                        onPress={() => this.createTema()}
                                        style = {styles.botonRegistro}
                                    />
                                    <Button
                                        title="Cancelar"
                                        color="#FF0033"
                                        onPress={() => this.cancelar()}
                                        style = {styles.botonRegistro}
                                    />
                                </View>
                            </View>
                        </Modal>
                    </SafeAreaView>     
                    )
                    :(
                        <SafeAreaView style={styles.container}>
                        <FlatList
                            data={temas}
                            renderItem={(data) =>
                                <TouchableOpacity style={{ backgroundColor: '#85929E' }} onPress={() => { itemPressed(data.item.id) }}>
                                    <View style={styles.listItemContainer}>
                                        <Text style={styles.ItemHeader}>{data.item.nombre}</Text>
                                        <TouchableOpacity style={{ backgroundColor: '#85929E' }} onPress={() => { itemModificar(data.item.id) }}>
                                            <Image style={styles.pencil} source={require('../../Images/pencil.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            }
                            keyExtractor={(item) => item.id} />
                        <View>
                            <TouchableOpacity style={{ backgroundColor: '#FF0033' }} onPress={() => this.showVentana()}>
                                <View style={styles.listItemContainer}>
                                    <Text style={styles.ItemHeader}>{label_CrearTema}</Text>
                                    <Image style={styles.pencil} source={require('../../Images/iconPlus.png')} />
                                </View>
                            </TouchableOpacity>
                            <OCRButton navigation={this.props.navigation}/>
                            <TouchableOpacity style={{ backgroundColor: '#FF0033' }} onPress = {()=>this.llenarTema()}>
                                <View style={styles.listItemContainer}>
                                    <Text style={styles.ItemHeader}>{label_CargarPantalla}</Text>
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
                                        color="#FF0033"
                                        onPress={() => this.createTema()}
                                        style = {styles.botonRegistro}
                                    />
                                    <Button
                                        title="Cancelar"
                                        color="#FF0033"
                                        onPress={() => this.cancelar()}
                                        style = {styles.botonRegistro}
                                    />
                                </View>
                            </View>
                        </Modal>
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