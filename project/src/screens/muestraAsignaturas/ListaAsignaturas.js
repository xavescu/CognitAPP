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
    TextInput,
    Button
} from 'react-native';

import styles from '../../styles/styles';
import { query } from '../../CommonFunctions/fetchQuery';
import { storeItem, getItem } from '../../CommonFunctions/ManageItems';
import OCRButton from '../ocr/OCRButton';

export default class ListaAsignaturas extends PureComponent {

    state = {
        asignaturas: [],
        vacio: [],
        loading: true,
        showAsignatura: false,
        newAsignatura: 'Default',
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
        await storeItem('idPantalla', '1');
        const tutorial = await getItem('tutorial');
        if (tutorial == 1){
            this.setState({first_run: true});
        }else{
            this.setState({first_run: false});
        }
        this.llenarAsignatura();
    }

    async llenarAsignatura(){
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

    async createSubject(){
        try {
            const id = await getItem('idUsuario');
            const res = await query('storeSubject', { "nombre":this.state.newAsignatura, "id": id });
            if(res.status == true){
                alert("Asignatura \""+ this.state.newAsignatura +"\" creada");
                this.llenarAsignatura();
                this.cancelar();
                if(this.state.first_run == true){
                    this.showCuartaPantalla();
                } 
            }  
        } catch (err) {
            console.log("Error creating Asignaturas data->", err);
        }
    }

    cancelar=()=>{
        this.setState({showAsignatura: false});
    }
    showVentana =()=>{
        this.setState({showAsignatura: true});
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

    showAlert = () =>{
        alert("Crea una asignatura nueva para continuar!");
    }

    render() {
        const { asignaturas, loading } = this.state;
        const { navigation } = this.props;
        const { first_run } = this.state;
        const { fondoBoton1 } = this.state;
        const { fondoBoton2 } = this.state;
        const { fondoBoton3 } = this.state;
        const { fondoBoton4 } = this.state;

        const itemPressed = async (id) => {
            await storeItem('idAsignaturaActual', id);
            navigation.navigate('Temas');
        }

        const itemModificar = async (nombre, id) => {
            await storeItem('nombreAsignatura', nombre);
            await storeItem('idAsignaturaActual', id);
            navigation.navigate('ModificarAsignatura');
        }

        if (!loading) {
            return (
                <SafeAreaView style={styles.container}>
                    { first_run == true ? (
                    <SafeAreaView style={styles.container}>
                        <FlatList
                        data={asignaturas}
                        renderItem={(data) =>
                            <TouchableOpacity style={fondoBoton4 == true ? (styles.background_green):(styles.background_grey)} onPress={() => { itemPressed(data.item.id) }}>
                                <View style={styles.listItemContainer} >
                                    <Text style={styles.ItemHeader}>{data.item.nombre}</Text>
                                    <TouchableOpacity onPress={() => { itemModificar(data.item.nombre, data.item.id) }}>
                                        <Image style={styles.pencil} source={require('../../Images/pencil.png')} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        }
                        keyExtractor={(item) => item.id} />
                        <View>
                        <TouchableOpacity style={fondoBoton3 == true ? (styles.background_green):(styles.background_grey)} onPress = {()=>this.showVentana()}>
                            <View style={styles.listItemContainer}>
                                <Text style={styles.ItemHeader}>Crear Asignatura</Text>
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
                                <Text>Entra en tu Asignatura nueva.</Text>
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
                                <Text>Con este boton podras crear nuevas asignaturas. Por favor crea una nueva Asignatura</Text>
                                <Text></Text>
                                <Button 
                                    title="Ok"
                                    onPress = {()=>this.showQuintaPantalla()}
                                />
                            </View>
                        </Modal>
                        <Modal visible={this.state.showAsignatura} 
                        transparent = {true}>
                            <View style = {styles.vModal2}>
                                <View >
                                    <TextInput
                                    placeholder= 'Nombre Asignatura'
                                    onChangeText={(newAsignatura)=>this.setState({newAsignatura})}
                                    />
                                <Button
                                    title="Crear"
                                    onPress = {()=>this.createSubject()}
                                />
                                <Button
                                    title="Cancelar"
                                    onPress = {()=>this.cancelar()}
                                />
                                </View>
                            </View>
                        </Modal>
                    </SafeAreaView>
                    ) 
                    : 
                    (
                    <SafeAreaView style={styles.container}>
                        <FlatList
                        data={asignaturas}
                        renderItem={(data) =>
                            <TouchableOpacity style={{ backgroundColor: 'grey' }} onPress={() => { itemPressed(data.item.id) }}>
                                <View style={styles.listItemContainer} >
                                    <Text style={styles.ItemHeader}>{data.item.nombre}</Text>
                                    <TouchableOpacity style={{ backgroundColor: 'grey' }} onPress={() => { itemModificar(data.item.nombre, data.item.id) }}>
                                        <Image style={styles.pencil} source={require('../../Images/pencil.png')} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        }
                        keyExtractor={(item) => item.id} />
                        <View>
                        <TouchableOpacity style={{ backgroundColor: 'grey' }} onPress = {()=>this.showVentana()}>
                            <View style={styles.listItemContainer}>
                                <Text style={styles.ItemHeader}>Crear Asignatura</Text>
                                <Image style={styles.pencil} source={require('../../Images/iconPlus.png')}/>
                            </View>
                        </TouchableOpacity>
                        <OCRButton navigation={this.props.navigation}/>
                        </View>
                        <View>
                            <TouchableOpacity style={{ backgroundColor: 'grey' }} onPress = {()=>this.llenarAsignatura()}>
                                <View style={styles.listItemContainer}>
                                    <Text style={styles.ItemHeader}>Cargar Pantalla</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Modal visible={this.state.showAsignatura} 
                        transparent = {true}>
                            <View style = {styles.vModal2}>
                                <View >
                                    <TextInput
                                    placeholder= 'Nombre Asignatura'
                                    onChangeText={(newAsignatura)=>this.setState({newAsignatura})}
                                    />
                                <Button
                                    title="Crear"
                                    onPress = {()=>this.createSubject()}
                                />
                                <Button
                                    title="Cancelar"
                                    onPress = {()=>this.cancelar()}
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