const { response, request } = require('express');
const { ObjectId } = require('mongoose').Types;

const Usuario = require('../models/Usuario');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuarios = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        res.json({
            results: (usuario) ? [usuario] : []
        })
    }
 
    // No tiene en cuenta expresiones regulares
    const regex = new RegExp(termino, 'i')

    const usuarios = await Usuario.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ state: true }]
    });

    res.json({
        results: usuarios
    })
    
}

const buscar = async (req = request, res = response) => {

    const { coleccion, termino } = req.params;
    
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            mgs: `Las colecciones permitidas son ${ coleccionesPermitidas }`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;

        case 'categorias':
            
            break;
        
        case 'productos':
            
            break;
    
        default:
            res.status(500).json({
                msg: 'Se le olvidó hacer la busqueda...'
            })
            break;
    }

}

module.exports = {
    buscar
}