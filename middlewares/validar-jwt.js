const { response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/Usuario')

const validarJWT = async (req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Leer el usuario que corresponde a su id
        const usuario = await Usuario.findById(uid)
        
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe en la BD'
            })
        }

        // Verificar si el uid está activo
        if (!usuario.state) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario inactivo'
            })
        }

        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }

}

module.exports = {
    validarJWT
}