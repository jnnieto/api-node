const { response } = require("express");
const { subirArchivo } = require('../helpers/subir-archivo');
const { collection } = require("../models/Categoria");

const Producto = require('../models/Producto');
const Usuario = require('../models/Usuario')

const cargarArchivo = async (req, res = response) => {

    try {
        
        const nombre = await subirArchivo(req.files, undefined, 'imgs')
        
        res.json({nombre})

    } catch (error) {
        res.status(400).json({error})
    }
    
}

const actualizarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                })
            }
        break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });
    }

    modelo.image = await subirArchivo(req.files, undefined, coleccion);

    await modelo.save();   

    res.json({
       id, coleccion
    })

}

module.exports = {
    cargarArchivo,
    actualizarImagen
}