const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    name: {
        type: String,
        required: [
            true,
            'El nombre es obligatorio'
        ],
    },
    state: {
        type: Boolean,
        required: true, 
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

// Pära ocultar la contraseña y _v en la response de la petición
CategoriaSchema.methods.toJSON = function() {
    const { __v,...categoria } = this.toObject();
    return categoria;
}

module.exports = model('Categoria', CategoriaSchema);