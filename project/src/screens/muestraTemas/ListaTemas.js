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
                                <Text style={styles.ItemHeader}>Crear Tema</Text>
                                <Image style={styles.pencil} source={require('../../Images/iconPlus.png')}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={fondoBoton2 == true ? (styles.background_green):(styles.background_grey)} onPress = {()=>this.showAlert()} >
                            <View style={styles.listItemContainer}>
                                <Text style={styles.ItemHeader}>Realizar Escaneo</Text>
                                <Image style={styles.pencil} source={require('../../Images/camera.png')} />
                            </View>
                        </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={fondoBoton1 == true ? (styles.background_green):(styles.background_grey)} onPress = {()=>this.showAlert()}>
                                <View style={styles.listItemContainer}>
                                    <Text style={styles.ItemHeader}>Cargar Pantalla</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Modal visible={this.state.mostrarAyudaNuevo} 
                        transparent = {true}>
                            <View style = {styles.vModal2}>
                                <Text>Entra en tu Tema nuevo para crear tu primer documento!</Text>
                                <Text></Text>
                                <Button 
                                    title="Ok"
                                    onPress = {()=>this.showQuintaPantalla()}
                                />
                            </View>
                        </Modal>
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
                                <Text>Con este boton podras escanear los resumenes o fotos que quieras</Text>
                                <Text></Text>
                                <Button 
                                    title="Ok"
                                    onPress = {()=>this.showTerceraPantalla()}
                                />
                            </View>
                        </Modal>
                        <Modal visible={this.state.mostrarAyudaCrear} 
                        transparent = {true}>
                            <View style = {styles.vModal2}>
                                <Text>Con este boton podras crear nuevos temas. Por favor crea un nuevo Tema</Text>
                                <Text></Text>
                                <Button 
                                    title="Ok"
                                    onPress = {()=>this.showQuintaPantalla()}
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
                    :(
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
                            <OCRButton navigation={this.props.navigation}/>
                            <TouchableOpacity style={{ backgroundColor: 'grey' }} onPress = {()=>this.llenarTema()}>
                                <View style={styles.listItemContainer}>
                                    <Text style={styles.ItemHeader}>Cargar Pantalla</Text>
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