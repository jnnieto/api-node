const { response, request } = require('express');
const bcriptjs = require('bcryptjs')

const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/generar-jwt')

const login = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {

        // Verficar si el email exite
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - correo'
            });
        }

        // Si el usuario está activo
        if (!usuario.state) {
            return res.status(400).json({
                msg: 'El usuario no está activo actualmente'
            })
        }

        // Verificar la contraseña
        const validPassword = bcriptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - contraseña'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id, usuario.name, usuario.role)
        
        res.json({
            usuario, 
            token
        });

    } catch (error) {
        return res.status(500).json({
            msg: 'Error en es servidor'
        });
    }

}

module.exports = {
    login
}