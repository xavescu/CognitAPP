/**
 * @format
 */

import 'react-native';
import React from 'react';
import listaAsignaturas from '../src/screens/muestraAsignaturas/ListaAsignaturas';
import { query } from '../src/CommonFunctions/fetchQuery';
import "isomorphic-fetch"

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const getItem = async (id, num) => {
  if (id === 'idUsuario') {
    return num;
  }
}

it('getAsignaturas', async () => {
  // const list = new listaAsignaturas();

  const res1 = await llenarAsignatura(1);
  const ex1 = [
    {
    "id": "1",
    "nombre": "Algebra",
    },
    {
    "id": "2",
    "nombre": "Fonaments d'enginyeria",
    },
    {
    "id": "3",
    "nombre": "Fonaments d'informàtica",
    },
    {
    "id": "4",
    "nombre": "Arquitectura de computadors",
    },
    {
    "id": "30",
    "nombre": "prueba111",
    },
    {
    "id": "31",
    "nombre": "prueba111",
    },
    {
    "id": "32",
    "nombre": "prueba111",
    },
    {
    "id": "39",
    "nombre": "prueba111",
    },
    {
    "id": "41",
    "nombre": "prueba111",
    },
  ];
  expect(res1).toEqual(ex1);
  
  const res2 = await llenarAsignatura(3);
  const ex2 = [
    {
    "id": "6",
    "nombre": "Metodologia de la programació",
    },
  ];
  expect(res2).toEqual(ex2);

  const res3 = await llenarAsignatura(14859);
  const ex3 = [];
  expect(res3).toEqual(ex3);

  const res4 = await llenarAsignatura('dfjihfnjgkdnjk');
  const ex4 = [];
  expect(res4).toEqual(ex4);

  const res5 = await llenarAsignatura(7);
  const ex5 = [
    {
    "id": "22",
    "nombre": "esa",
    },
    {
    "id": "23",
    "nombre": "asignatura",
    },
    {
    "id": "24",
    "nombre": "wena",
    },
  ];
  expect(res5).toEqual(ex5);

});

it('creaSubject', async () => {
  const res1 = await createSubject(3,"prueba111");
  const ex1 = {"status": true};
  expect(res1).toEqual(ex1);
  
  const res2 = await createSubject(1,"prueba111");
  const ex2 = {"status": true};
  expect(res2).toEqual(ex2);

  const res3 = await createSubject(-1,32);
  const ex3 = undefined;
  expect(res3).toEqual(ex3);

  const res4 = await createSubject(-1,"prueba111");
  const ex4 = undefined;
  expect(res4).toEqual(ex4);

  const res5 = await createSubject("hola","prueba111");
  const ex5 = undefined;
  expect(res5).toEqual(ex5);

});

const llenarAsignatura = async (num) => {
  try {
      const id = await getItem('idUsuario',num);
      const res = await query('querySubjects', { "id": id });
      aux = [];
      if (res.asignaturas != "") {
          for (let i = 0; i < res.asignaturas.length; i++) {
              aux.push({ id: res.asignaturas[i].id, nombre: res.asignaturas[i].nombre });
          }
      }
      return aux;
  } catch (err) {
      console.log("Error getting Asignaturas data->", err);
  }
}

const createSubject = async (asignatura, idUser)  => {
  try {
      const id = await getItem('idUsuario', idUser);
      const res = await query('storeSubject', { "nombre":asignatura, "id": id });
      return res;
  } catch (err) {
      console.log("Error creating Asignaturas data->", err);
  }
}