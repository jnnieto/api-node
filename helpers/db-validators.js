const Categoria = require('../models/Categoria');
const Producto = require('../models/Producto');
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

const existeCategoriaId = async (id = '') => {

    const isCId = await Categoria.findById(id);
    // Validar de que la categoria si exista
    if (!isCId) {
        throw new Error(`El id de categoria no existe ${ id }`);
    }

}

const existeCategoria = async (name = '') => {

    const isCategory = await Categoria.findOne({ name });

    // Validar de que la categoria exista en la base de datos
    if (!isCategory) {
        throw new Error(`La categoria ${ name } no existe en la base de datos`)
    }

}

const existeProductoId = async (id = '') => {

    const isProducto = await Producto.findById(id);

    if (!isProducto) {
        throw new Error(`El id  de producto no existe ${ id }`);
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La colecccion ${ coleccion } no es permitida, ${ colecciones }`)
    }

    return true;
}

module.exports = {
    coleccionesPermitidas,
    esRolValido,
    emailExiste,
    existeUsuarioId,
    existeCategoriaId,
    existeCategoria,
    existeProductoId
}
