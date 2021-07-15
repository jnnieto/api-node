const Role = require('../models/Role');
const Usuario = require('../models/Usuario');

const esRolValido = async(role = '') => {
    // Encuentra coincidencias con algún rol registrado en la base de datos 
    const isRole = await Role.findOne({ role });
    if (!isRole) {
        throw new Error(`El rol ${ role } no está resgistrado en la base de datos`)
    }
}

const emailExiste = async(email = '') => {
    
    const isEmail = await Usuario.findOne({ email });
    if (isEmail) {
        throw new Error(`El correo ya existe`);
    }

}

const existeUsuarioId = async(id = '') => {
    
    const isId = await Usuario.findById(id);
    if (!isId) {
        throw new Error(`El id no existe ${ id }`);
    }

}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioId
}