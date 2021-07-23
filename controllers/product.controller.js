const { response, request } = require('express');

const Categoria = require('../models/Categoria');
const Producto = require('../models/Producto');

const obtenerProductos = async (req = request, res = response) => {

}

const obtenerProductoId = async (req = request, res = response) => {

}

const crearProducto = async (req = request, res = response) => {

    const { name, price, category, description } = req.body;

    const categoryObj = await Categoria.findOne({ name: category });


    // Generar la data a guardar
    const data = {
        name,
        user: req.usuario._id,
        price,
        category: categoryObj._id,
        description
    }

    const producto = new Producto(data);

    // Guardar en la base da datos la nuevo producto
    await producto.save();

    res.status(201).json({
        msg: 'Producto agregado satisfactoriamente',
        producto
    })

}

const actualizarProducto = async (req = request, res = response) => {

}

const eliminarProducto = async (req = request, res = response) => {

}

module.exports = {
    obtenerProductos,
    obtenerProductoId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}
