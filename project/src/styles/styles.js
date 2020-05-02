
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    listItemContainer: {
        borderStyle: 'solid',
        borderColor: '#fff',
        borderBottomWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    ItemHeader: {
        color: '#fff',
        fontSize: 24,
    },
    pencil: {
        height: 50,
        width: 50
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    box: {
        flex: 1,
        textAlign: 'right',
    },
    //header
    box1: {
        flex: 1.5,
        backgroundColor: '#2196F3',
    },
    //content
    box2: {
        flex: 10,
        backgroundColor: '#8BC34A'
    },
    //footer
    box3: {
        flex: .5,
        backgroundColor: '#e3aa1a'
    },
    containerprincipal: {
        flex: 1,

    }, Cabecera: {
        color: 'white',
        fontSize: 40,
        textAlign: 'center',
        backgroundColor: 'black',
        justifyContent: 'center',
        padding: 50,
    },
    botonLogin: {
        textAlign: 'center',
        borderBottomEndRadius: 10,
        color: '#FFFFFF',
        fontWeight: '700',
        borderBottomColor: 'black'
    }, BodyHeader: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'gray',
    },
    texto: {
        padding: 60,
        color: 'white',
        fontSize: 30,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'black',
    },
    UserPass: {
        width: 230,
        height: 50,
        borderWidth: 4,
        borderColor: 'black',
        padding: 20,
        marginVertical: 20
    },
    LoginGeneral: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#4eb3d3',

    },
    fadingContainer: {
        paddingVertical: 20,
        paddingHorizontal: 30,
        backgroundColor: "black"
    },
    fadingText: {
        fontSize: 40,
        textAlign: "center",
        //margin: 10
        color: 'white'
    },
    containerSplash: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",

    },
    buttonRow: {
        flexDirection: "row",
        marginVertical: 16
    },
    LoginHeader: {
        flex: 0.15,
        backgroundColor: '#4eb3d3',
        color: 'white',
        justifyContent: 'center',
        textAlign: 'center'
    },
    LoginGeneral: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#4eb3d3',

    },
    TextHeader: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        justifyContent: 'center',
        padding: 60,
    },
    BodyHeader: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#4eb3d3',
    },

    botonLogin: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700',
        borderBottomColor: 'black'
    },
    botonRegistro: {
        marginTop: 10
    },

    UserPass: {
        width: 130,
        height: 30,
        borderWidth: 1,
        borderColor: 'white',
        padding: 5,
        marginVertical: 10
    },
    vModal2: { 
        backgroundColor: "#ffffff",
        margin: 50,
        padding:40,
        borderRadius:10,
        //flex:1,
    },
})

export default styles;