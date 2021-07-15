const bcriptjs = require('bcryptjs')

const { response, request } = require('express') 
const Usuario = require('../models/Usuario')


const usuarioPut = async(req, res = response) => {

    const { id } = req.params;
    const { password, google, email, ...resto } = req.body;

    // Validar contraseña de la base de datos
    if (password) {
        // Encriptar la contraseña
        const salt = bcriptjs.genSaltSync();
        resto.password = bcriptjs.hashSync(password, salt)
    
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    
    res.json({
        msg: "Usuario actualizado correctamente",
        usuario
    })    
}    

const usuarioGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { state: true }

    // Ejecutar ambas promesas de forma simultanea y asíncrona
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .limit(Number(limite))
        .skip(Number(desde))

    ])

    res.json({
        total,
        usuarios
    })
    
}    

const usuarioPost = async(req, res = response) => {
    
    const { name, email, password, role } = req.body;    
    const usuario = new Usuario({ name, email, password, role });

    // Encriptar la contraseña
    const salt = bcriptjs.genSaltSync();
    usuario.password = bcriptjs.hashSync(password, salt)

    // Guardar en BD
    await usuario.save();


    res.json({
        usuario
    })
}

const usuarioDelete = async(req, res = response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { state: false });

    res.json({
        msg: 'Usuario inhabilitado'
    })
}

module.exports = {
    usuarioPut,
    usuarioGet,
    usuarioPost,
    usuarioDelete
}