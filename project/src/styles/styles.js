
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
        flex: 1,
        backgroundColor: 'white',
        padding:50
    },
    HeaderLoginText: {
        fontSize: 40,
        textAlign: "center",
        color:'black'
    },
    NombreLogin:{
        fontFamily:'Helvetica-Bold',
        fontWeight:'bold',
        textAlign:'left',
        justifyContent:'center',
        fontSize:15,
        color:'#474646',
        paddingTop:50,
      },
      PasswordLogin:{
        fontFamily:'Helvetica-Bold',
        fontWeight:'bold',
        textAlign:'left',
        justifyContent:'center',
        fontSize:15,
        color:'#474646',
        padding:10
      },
      InputText:{
        width:300,
        height:50,
        //color:'white',
        marginVertical:20,
        letterSpacing:0.5,
        textAlign: 'center',
        // Set border width.
        borderWidth: 2,
        // Set border Hex Color Code Here.
        borderColor: '#FF0033',
        // Set border Radius.
        borderRadius: 20 ,
        //Set background color of Text Input.
        //backgroundColor : "#FF0033"
        backgroundColor : "#fff"
      },
      InputText2:{
        width:300,
        height:50,
        justifyContent:'center',
        //color:'white',
        letterSpacing:0.5,
        textAlign: 'center',
        // Set border width.
        borderWidth: 2,
        // Set border Hex Color Code Here.
        borderColor: '#FF0033',
        // Set border Radius.
        borderRadius: 20 ,
        //Set background color of Text Input.
        //backgroundColor : "#FF0033"
        backgroundColor : "#fff"
      },
      botonLogin:{
        width:300,
        height:50,
        backgroundColor:'#FF0033',
        borderRadius:2,
        borderWidth: 2,
        paddingBottom:30
    },
    //separador
    separador:{
        padding:0.5, 
        backgroundColor:'white',
        paddingTop:5
    },
    //content
    box2: {
        flex: 10,
        backgroundColor: 'white'
    },
     //footer
     box3: {
        flex: 3,
        backgroundColor: 'white'
    },
    TextFooter:{
        fontFamily:'Helvetica-Bold',
        fontWeight:'bold',
        textAlign:'center' ,
        fontSize:20,
        paddingTop:10,
    },
    botonRegistro:{
        fontFamily:'Helvetica-Bold',
        fontWeight:'bold',
        fontSize:50,
        width:2700,
        height:500,
        backgroundColor:'#FF0033',
        borderRadius:2,
        borderWidth: 2,
        paddingBottom:30
    },
    containerprincipal: {
        flex: 1,

    }, 
    Cabecera: {
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
    Texto2:{
        fontFamily:'Helvetica-Bold',
        fontWeight:'bold',
        textAlign:'left',
        justifyContent:'center',
        fontSize:15,
        padding:0,
        color:'#474646'
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
        backgroundColor: "white"
    },
    fadingText: {
        fontSize: 60,
        textAlign: "center",
        color:'black'
    },
    containerSplash: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"white"

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
		marginTop: 200,
        padding:40,
        borderRadius:10,
        //flex:1,
    },
    MainContainerMostrarResumen:
    {
        flex: 1,
        alignItems: 'center',
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 15,
        paddingHorizontal: 10
    },

    ButtonEdit: {
        width: '100%',
        height: 45,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 55,
        borderRadius: 25,
    },

    ButtonChange: {
        width: '100%',
        height: 45,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 5,
        borderRadius: 25,
    },

     textStyle:{
         color: '#fff',
         fontSize:20
     },

     ButtonChangeDisabled:{
         width: '100%',
         height: 45,
         backgroundColor: 'grey',
         justifyContent: 'center',
         alignItems: 'center',
         position: 'absolute',
         bottom: 5,
         borderRadius: 25,
     },

     ButtonEditDisabled:{
         width: '100%',
         height: 45,
         backgroundColor: 'grey',
         justifyContent: 'center',
         alignItems: 'center',
         position: 'absolute',
         bottom: 55,
         borderRadius: 25,
     },
     ButtonShare: {
        width: '100%',
        height: 45,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 105,
        borderRadius: 25,
    },
     background_grey: {
        backgroundColor: "grey",
     },

     background_green: {
        backgroundColor: "green",
     },
     Nombre:{
        color:'#474646',
        padding:10,
        paddingLeft:60
    }
})

export default styles;