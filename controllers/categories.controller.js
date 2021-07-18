const { response, request } = require('express');

const Categoria = require('../models/Categoria')


const obtenerCategorias = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { state: true }

    // Ejecutar ambas promesas de forma simultanea y asíncrona
    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .limit(Number(limite))
        .skip(Number(desde))
        .populate('user', 'name')

    ]);

    res.json({
        total,
        categorias
    });

}

const obtenerCategoriaId = async (req, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findById(id);

    res.json(categoria);

}

const crearCategoria = async (req, res = response) => {

    const name = req.body.name.toUpperCase();

    const categoriaDB = await Categoria.findOne({ name });

    // Validar si la categoria ya existe en la base de datos
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${ name } ya existe en la base de datos` 
        })
    }

    // Generar la data a guardar
    const data = {
        name,
        user: req.usuario._id
    }

    const categoria = new Categoria(data);

    // Guardar en la base da datos la nueva categoria
    await categoria.save();

    res.status(201).json({
        msg: 'Categoria agregada satisfactoriamente',
        categoria
    })
}

const actualizarCategoria = async (req, res = response) => {

    const { id } = req.params;
    const name = req.body.name.toUpperCase();

    const data = {
        name,
        user: req.usuario._id
    }

    const categoria = await Categoria.findByIdAndUpdate(id, data)
                                    .populate('user', 'name');

    res.json({
        msg: 'Categoria actualizada correctamente',
        categoria
    });

}

const eliminarCategoria = async (req, res = response) => {

    const { id } = req.params;

    const data = {
        state: false,
        user: req.usuario._id
    }

    const categoria = await Categoria.findByIdAndUpdate(id, data);

    res.json({
        msg: 'Categoria inhabilitada correctamente',
        categoria
    })
}

module.exports = {
    obtenerCategorias,
    obtenerCategoriaId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
}