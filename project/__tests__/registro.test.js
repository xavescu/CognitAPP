import 'react-native';
import React from 'react';
import { isTSAnyKeyword } from '@babel/types'
import renderer from 'react-test-renderer';

import Registro from '../../src/screens/Registro/Registro'

import "isomorphic-fetch"

test('comprobamos que no se realiza el registro cuando se dejan los campos vacios', () => {
    const reg = new Registro();

    return reg.registro().then(data => {
        expect(data.status).toBeFalsy();
    });
});

test('comprobamos que no se realiza el registro si el email ya está registrado', () => {
    const reg = new Registro();
    reg.state.email = "Test@test.com";
    reg.state.user= "Testeo";
    reg.state.nombre = "Testeo";
    reg.state.password= "Pass";

    return reg.registro().then(data => {
        expect(data.status).toBeFalsy();
    });
});

test('comprobamos que no se realiza el registro si el username ya existe', () => {
    const reg = new Registro();
    reg.state.email = "correo@correo.com";
    reg.state.user= "pepito";
    reg.state.nombre = "pepe";
    reg.state.password= "Pass";

    return reg.registro().then(data => {
        expect(data.status).toBeFalsy();
    });
});

test('comprobamos que no se realiza el registro si el email no tiene el formato adecuado', () => {
    const reg = new Registro();
    reg.state.email = "correo";
    reg.state.user= "usuario";
    reg.state.nombre = "nombre";
    reg.state.password= "Pass";

    return reg.registro().then(data => {
        expect(data.status).toBeFalsy();
    });
});

test('comprobamos que no se realiza el registro si falta el campo del email', () => {
    const reg = new Registro();
    reg.state.user= "usuario";
    reg.state.nombre = "nombre";
    reg.state.password= "Pass";

    return reg.registro().then(data => {
        expect(data.status).toBeFalsy();
    });
});

test('comprobamos que no se realiza el registro si falta el campo del usuario', () => {
    const reg = new Registro();
    reg.state.email = "correo@correo.com";
    reg.state.nombre = "nombre";
    reg.state.password= "Pass";

    return reg.registro().then(data => {
        expect(data.status).toBeFalsy();
    });
});

test('comprobamos que no se realiza el registro si falta el campo del nombre', () => {
    const reg = new Registro();
    reg.state.email = "correo@correo.com";
    reg.state.user= "usuario";
    reg.state.password= "Pass";

    return reg.registro().then(data => {
        expect(data.status).toBeFalsy();
    });
});

test('comprobamos que no se realiza el registro si falta el campo de la contraseña', () => {
    const reg = new Registro();
    reg.state.email = "correo@correo.com";
    reg.state.user= "usuario";
    reg.state.nombre = "nombre";

    return reg.registro().then(data => {
        expect(data.status).toBeFalsy();
    });
});

it('hace render de forma correcta del componente registro', () => {
    const tree = renderer.create(<Registro />).toJSON();
    expect(tree).toMatchSnapshot();
  });