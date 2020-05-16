import React from 'react'
import { StyleSheet, TouchableHighlight, Text,Button, View } from "react-native";
import App from '../../../App';
import RNFetchBlob from 'react-native-fetch-blob'
import TrackPlayer from 'react-native-track-player';
import { query } from '../../CommonFunctions/fetchQuery';
import { storeItem, getItem } from '../../CommonFunctions/ManageItems';


class Texttomp3 extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            txt: '',
            txt2 : '',
        }
        global.status = true;  
    }

render(){
    let txt = this.props.txt;
    let txt2 = this.props.txt2;
return(
    <View style = {styles.container}>
      <Button  
      title = 'Mp3'
      style={styles.button} 
      onPress={() =>this.existe(txt ,txt2)}>
      </Button >
    </View>
)
};


existe(txt,txt2){
  var fullPath = '/storage/emulated/0/Android/data/com.loginapp/files/' + txt +'.mp3';

  if(!RNFetchBlob.fs.exists(fullPath).exists){
    this.aceptar(txt,txt2);
  }
  this.repro(txt);

}

async aceptar(txt ,txt2){
  let string = "";

  try {
    const id_t = await getItem("id_tema");
    const id_res = await getItem("id_resumen");
    var params = {
        id: id_t
    }
    const res = await query('queryResumenes', params);
    if (res.status == true) {
        for (let i = 0; i < res.resumenes.length; i++) {
            if(txt2 == res.resumenes[i].id){
                string = res.resumenes[i].texto;
                exist = true;
            }
        }
        if(!exist){
            alert("El resumen no existe con la id:",this.state.id_resumen);
        }
    }else {
        console.log("response -->>>>" , res)
        alert('Error');
    }
}catch(error){
   console.log("ERROR", error);
}

console.log("texto", string);

  let fullPath = '/storage/emulated/0/Android/data/com.loginapp/files/' + txt +'.mp3';

  if(global.status==true){
      global.status = false;
  
    var form = {
          filename: txt,
          text: string,
                   }
       var formBody = [];
  
        for (var property in form) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(form[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
       
      
       try {
        let value =   await RNFetchBlob
        .config({
          fileCache : true,
          appendExt : 'mp3',
          path : fullPath
          })
         .fetch('POST','http://cognitapp.duckdns.org/mp3', {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding' : 'gzip,deflate',
            'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8,ca;q=0.7',
        },formBody)
        .then((res) => {
          console.log("resd", res);
          console.log('The file saved to ',res.path());
          global.status = true;
        })
      }
       catch (error) {
        console.log('The file saved get an error ');
      }
      
  }
  }

  
  repro(txt){

    var fullPath = '/storage/emulated/0/Android/data/com.loginapp/files/' + txt +'.mp3';

    try {
        TrackPlayer.setupPlayer({}).then(async () => {

            await TrackPlayer.add({
                id: 'trackId',
                url:  '/storage/emulated/0/Android/data/com.loginapp/files/'+txt+'.mp3',
                title: txt,
                artist: 'CognitApp',
                artwork: require('./imagen.png')
            });

            TrackPlayer.play();
        
        });
      } catch (error) {
        console.log('The sound get an error ');
      }
    }
}


const styles = StyleSheet.create({
    button: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        marginTop:1,
        marginBottom:1,
        backgroundColor:'rgb(201, 76, 76)',
        borderRadius:50,
    },
    container : {
        alignItems:'flex-end',
    }
});

export default Texttomp3;

