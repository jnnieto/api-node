const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [
            true,
            'El nombre es obligatorio'
        ]
    },
    email: {
        type: String,
        required: [
            true,
            'El correo es obligatorio'
        ],
        unique: true
    },
    password: {
        type: String,
        required: [
            true,
            'La contraseña es obligatoria'
        ]
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Pära ocultar la contraseña y _v en la response de la petición
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;

    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);