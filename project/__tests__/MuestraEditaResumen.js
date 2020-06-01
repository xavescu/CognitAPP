/**
 * @format
 */

import 'react-native';
import React from 'react';
import muestraEditaResumen from '../src/screens/muestraEditaResumen/muestraEditaResumen';
import { query } from '../src/CommonFunctions/fetchQuery';
import "isomorphic-fetch"

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const getItem = async (id, num) => {
  if (id === 'id_tema') {
    return num;
  }else if (id === 'id_resumen'){
    return num;
  }
}

it('renders correctly', async () => {
  const res1 = await consultaResumen(1, 77);
  const ex1 =  "texto de testeo";
  expect(res1).toEqual(ex1);
});

it('renders correctly 2', async () => {
  //tema 1 - tema 1, 2, 3
  const res1 = await consultaResumen(1, 1);
  const ex1 =  "texto de testeo 1";
  expect(res1).not.toBe(ex1);
});

it('renders correctly 3', async () => {
  //tema 1 - tema 1, 2, 3
  const res1 = await consultaResumen(1, 2);
  const ex1 =  "mes coses...123";
  expect(res1).toEqual(ex1);
});

it('renders correctly 4', async () => {
  //tema 1 - tema 1, 2, 3
  const res1 = await editaResumen(1, 3, "apunts tercera clase", "encara mes coses de algebra...", 0);
  expect(res1).toBeFalsy();
});

it('renders correctly 5', async () => {
  //tema 1 - tema 1, 2, 3
  const res1 = await CompartirUsuario(3, "Pepito");
  expect(res1).toBeFalsy();
});


const CompartirUsuario = async (param1, param2) =>{
  try{
      const id_res = await getItem("id_resumen", param1);
      ///console.log("Compartir: " + id_res + " - " + this.state.userAmigo);
      var params = {
          "id": id_res,
          "user": param2
      }
      const res = await query('share', params);
      ///console.log("comprtir codigo : "+ res.code);
      //console.log("comprtir status : "+ res.status);
       if (res.status == true) {
         return true;
          //alert("Comparte este codigo: " + res.code);
          //this.cancelar();
       }else {
         return false;
          //alert("Error al compartir");
       }
  }catch(error){
   console.log("ERROR", error);
  }
}


const editaResumen = async (param1, param2, param3, param4, param5) => {
  try{
      const id_t = await getItem("id_tema", param1);
      const id_res = await getItem("id_resumen", param2);
      var params = {
          id: id_res,
          nombre: param3,
          texto: param4,
          tema: id_t,
          tipo: param5
      }
      console.log("params ----->", params);
      const res = await query('changeResumen', params);
        if (res.status == true) {
          console.log("response 1----->", res.status);
          return true;
          //console.log("response ----->", res);
          //alert("Cambios guardados");
        }else {
          console.log("response 2----->", res.status);
          return false;
          //console.log("response -->>>>" , res)
          //alert("Cambios guardados");
        }
  }catch(error){
    console.log("ERROR", error);
  }
}


const consultaResumen = async (num1, num2) => {
  try {
      const id_t = await getItem("id_tema", num1);
      const id_res = await getItem("id_resumen", num2);
      var params = {
          id: id_t
      }
      const res = await query('queryResumenes', params);
      if (res.status == true) {
          //alert("Resumen recuperado");
          for (let i = 0; i < res.resumenes.length; i++) {
              if(id_res == res.resumenes[i].id){
                  auxText = res.resumenes[i].texto;
                  auxName = res.resumenes[i].nombre;
                  //this.setState({text: auxText, nombre_documento: auxName});
                  exist = true;
              }
          }
          return auxText;
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
}
