/**
 * @format
 */

import 'react-native';
import React from 'react';
import listaResumen from '../src/screens/muestraResumenesTab/ListaResumenes';
import { query } from '../src/CommonFunctions/fetchQuery';
import "isomorphic-fetch"

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const getItem = async (id, num) => {
    return num;
}

it('getResumenes', async () => {
  // const list = new listaAsignaturas();

  const res1 = await llenarResumen(1);
  const ex1 = [
    {
        "id": "2",
        "nombre": "apunts segona clase",
        "texto": "mes coses...123",
        "tipo": "0",
        "foto": "0"
    },
    {
        "id": "3",
        "nombre": "apunts tercera clase",
        "texto": "encara mes coses de algebra...",
        "tipo": "0",
        "foto": "0"
    },
    {
        "id": "77",
        "nombre": "test1",
        "texto": "texto de testeo",
        "tipo": "0",
        "foto": "0"
    }
];
  expect(res1).toEqual(ex1);
  
  const res2 = await llenarResumen(30);
  const ex2 = [
    {
        "id": "52",
        "nombre": "Foto",
        "texto": "Vdnfj",
        "tipo": "0",
        "foto": "1"
    }
];
  expect(res2).toEqual(ex2);

  const res3 = await llenarResumen(14859);
  const ex3 = [];
  expect(res3).toEqual(ex3);

  const res4 = await llenarResumen('randomText');
  const ex4 = [];
  expect(res4).toEqual(ex4);

  const res5 = await llenarResumen(41);
  const ex5 = [];
  expect(res5).toEqual(ex5);

});

const llenarResumen = async (num) => {
    try {
        const id = await getItem('idTemaActual',num);
        const res = await query('queryResumenes', { "id": id });
        var aux = [];

        if (res.resumenes != "") {
            for (let i = 0; i < res.resumenes.length; i++) {
                aux.push({ id: res.resumenes[i].id, nombre: res.resumenes[i].nombre, foto: res.resumenes[i].foto, texto: res.resumenes[i].texto  });
            }
        }

        return aux;
    } catch (err) {
        console.log("Error getting Resumenes data->", err);
    }
}
