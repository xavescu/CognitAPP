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

it('renders correctly', async () => {
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
  expect(1+1).toBe(2);
  expect(true).toBeTruthy();
});

const llenarAsignatura = async (num) =>{
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