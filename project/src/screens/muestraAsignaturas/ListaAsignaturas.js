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

export default class ListaAsignaturas extends PureComponent {

    state = {
        asignaturas: [],
        loading: true,
        showAsignatura: false,
        newAsignatura: 'Default',
    }

    componentDidMount() {
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
    render() {
        const { asignaturas, loading } = this.state;
        const { navigation } = this.props;

        const itemPressed = async (id) => {
            await storeItem('idAsignaturaActual', id);
            navigation.navigate('Temas');
        }

        const itemModificar = async (nombre) => {
            await storeItem('nombreAsignatura', nombre);
            navigation.navigate('ModificarAsignatura');
        }

        if (!loading) {
            return (
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={asignaturas}
                        renderItem={(data) =>
                            <TouchableOpacity style={{ backgroundColor: 'grey' }} onPress={() => { itemPressed(data.item.id) }}>
                                <View style={styles.listItemContainer} >
                                    <Text style={styles.ItemHeader}>{data.item.nombre}</Text>
                                    <TouchableOpacity style={{ backgroundColor: 'grey' }} onPress={() => { itemModificar(data.item.nombre) }}>
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

            )
        } else {
            return <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        }
    }
}