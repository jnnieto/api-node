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

module.exports = model('Categoria', CategoriaSchema);