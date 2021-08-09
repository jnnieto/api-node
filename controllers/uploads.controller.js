const path = require('path');
const fs = require('fs');

const { response } = require("express");
const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const Producto = require('../models/Producto');
const Usuario = require('../models/Usuario');

const { subirArchivo } = require('../helpers/subir-archivo');

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
    
    // Limpiar imágenes previas
    if (modelo.image) {
        // Hay que borrar la imagen del servidor
        const pathImage = path.join(__dirname, '../uploads/', coleccion, modelo.image);
        if (fs.existsSync(pathImage)) {
            // Elimina el archivo con esa ruta
            fs.unlinkSync(pathImage);
        }
    }

    modelo.image = await subirArchivo(req.files, undefined, coleccion);

    await modelo.save();   

    res.json({
       modelo
    })

}

const mostrarImagen = async (req, res= response) => {

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
    
    // Limpiar imágenes previas
    if (modelo.image) {
        // Hay que borrar la imagen del servidor
        const pathImage = path.join(__dirname, '../uploads/', coleccion, modelo.image);
        if (fs.existsSync(pathImage)) {
            return res.sendFile(pathImage)
        }
    }

    const pathNoImage = path.join(__dirname, '../assets/no-image.jpg');

    res.sendFile(pathNoImage)

}

const actualizarImagenCloudinary = async (req, res = response) => {

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
    
    // Limpiar imágenes previas
    if (modelo.image) {
       const nombreArr = modelo.image.split('/');
       const nombre = nombreArr[nombreArr.length - 1];

       const [ public_id ] = nombre.split('.');
       cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  
    modelo.image = secure_url;

    await modelo.save();

    res.json({
       modelo
    })

}

module.exports = {
    actualizarImagen,
    actualizarImagenCloudinary,
    cargarArchivo,
    mostrarImagen
}