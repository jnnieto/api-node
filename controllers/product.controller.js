const { response, request } = require('express');

const Categoria = require('../models/Categoria');
const Producto = require('../models/Producto');

const obtenerProductos = async (req = request, res = response) => {

  const { limite = 5, desde = 0 } = req.query;
  const query = { state: true }

  // Ejecutar ambas promesas de forma simultanea y asíncrona
  const [ total, productos ] = await Promise.all([
      Producto.countDocuments(query),
      Producto.find(query)
      .limit(Number(limite))
      .skip(Number(desde))
      .populate('user', 'name')
      .populate('category', 'name')

  ]);

  res.json({
      total,
      productos
  });

}

const obtenerProductoId = async (req = request, res = response) => {

  const { id } = req.params;

  const producto = await Producto.findById(id)
                          .populate('user', 'name')
                          .populate('category', 'name')

  res.json(producto);

}

const crearProducto = async (req = request, res = response) => {

    const { name, price, category, description } = req.body;

    const categoryObj = await Categoria.findOne({ name: category });

    // Generar la data a guardar
    const data = {
        name: name.charAt(0).toUpperCase() + name.slice(1),
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

    const { id } = req.params;
    const { state, user, ...data } = req.body;

    if (data.name) {
        data.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    }
    
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true})
                                                    .populate('user', 'name')
                                                    .populate('category', 'name')

    res.json({
        msg: "Producto actulizado correctamente",
        producto
    })
}

const eliminarProducto = async (req = request, res = response) => {

    const { id } = req.params;

    const data = {
        state: false,
        user: req.usuario._id
    }

    const producto = await Producto.findByIdAndUpdate(id, data);

    res.json({
        msg: 'Producto inhabilitado correctamente',
        producto
    })
    
}

module.exports = {
    obtenerProductos,
    obtenerProductoId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}
