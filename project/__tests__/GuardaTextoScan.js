/**
 * @format
 */

import 'react-native';
import React from 'react';
//import guardaTextoScan from '../src/screens/GuardaTextoScan/GuardaTextoScan';
import { query } from '../src/CommonFunctions/fetchQuery';
import "isomorphic-fetch"

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const getItem = async (id, num) => {
    if (id === 'textFoto') {
      return num;
    }else if (id === 'foto'){
      return num;
    }
  }

const texto = "TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4="
it('renders correctly', async () => {
    const res1 = await guardar("hola", 0, 2,"Prueba", 0);
    expect(res1).toBeTruthy();
  });

const guardar  = async (param1, param2, param3, param4, param5) => {
    const aux = getItem('textFoto', param1);
    const foto = getItem('foto', param2);
    //foto = await storeItem('foto',foto)
    var form = {
      id: param3,
      nombre: param4,
      texto: aux,
      tipo: param5,
      foto: foto,
    }
    const res = await query('storeResumen', form);
    if (res.status==true){
      return true;
    }
    else {
      return false;
    }
  }