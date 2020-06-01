/**
 * @format
 */

import 'react-native';
import React from 'react';
import listaTemas from '../src/screens/muestraTemas/ListaTemas';
import { query } from '../src/CommonFunctions/fetchQuery';
import "isomorphic-fetch"

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const getItem = async (id, num) => {
    return num;
}

it('getTemas', async () => {
  // const list = new listaAsignaturas();

  const res1 = await llenarTema(1);
  const ex1 = {
    "temas": [
    {
    "id": "1",
    "nombre": "Nombres reals i imaginàris",
    },
    {
    "id": "2",
    "nombre": "Conjunt z2",
    },
    {
    "id": "3",
    "nombre": "Operacions amb polinomis",
    },
    {
    "id": "39",
    "nombre": "TEMA_TEST",
    },
    {
    "id": "41",
    "nombre": "prueba",
    },
    {
    "id": "47",
    "nombre": "prueba",
    },
    {
    "id": "50",
    "nombre": "prueba",
    },
    {
    "id": "54",
    "nombre": "prueba",
    },
    ],
    "status": true
  };
  expect(res1).toEqual(ex1);
  
  const res2 = await llenarTema(28);
  const ex2 = {
    "temas": [
        {
            "id": "23",
            "nombre": "T2"
        },
        {
        "id": "42",
        "nombre": "prueba",
        },
        {
        "id": "48",
        "nombre": "prueba",
        },
        {
        "id": "51",
        "nombre": "prueba",
        },
        {
        "id": "55",
        "nombre": "prueba",
        },
    ],
    "status": true
};
  expect(res2).toEqual(ex2);

  const res3 = await llenarTema(14859);
  const ex3 = {"status": true, "temas": []};
  expect(res3).toEqual(ex3);

  const res4 = await llenarTema('randomeText');
  const ex4 = {"status": true, "temas": []};
  expect(res4).toEqual(ex4);

  const res5 = await llenarTema(41);
  const ex5 = {
    "temas": [],
    "status": true
  };
  expect(res5).toEqual(ex5);

});

it('creaTemas', async () => {
  const res1 = await createTema(1,"prueba");
  const ex1 = {"status": true};
  expect(res1).toEqual(ex1);
  
  const res2 = await createTema(28,"prueba");
  const ex2 = {"status": true};
  expect(res2).toEqual(ex2);

  const res3 = await createTema(-1,32);
  const ex3 = undefined;
  expect(res3).toEqual(ex3);

  const res4 = await createTema(-1,"prueba");
  const ex4 = undefined;
  expect(res4).toEqual(ex4);

  const res5 = await createTema("hola","prueba");
  const ex5 = undefined;
  expect(res5).toEqual(ex5);

});

const llenarTema = async (num) => {
  try {
      const id = await getItem('idAsignaturaActual',num);
      const res = await query('queryTemas', { "id": id });
      var aux = [];
      if (res.temas != "") {
          for (let i = 0; i < res.temas.length; i++) {
              aux.push({ id: res.temas[i].id, nombre: res.temas[i].nombre });
          }
      }
      return res;
  } catch (err) {
      console.log("Error getting Temas data->", err);
  }
}

const createTema = async (num,tema) => {
  try {
      const id = await getItem('idAsignaturaActual',num);
      const res = await query('storeTema', { "nombre": tema, "id": id });
      return res;
  } catch (err) {
      console.log("Error creating Tema data->", err);
  }
}