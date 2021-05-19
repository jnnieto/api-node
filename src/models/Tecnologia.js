import { Schema, model } from 'mongoose';

const tecnologiaSchema = new Schema({

    /**
     * 
     */
    nombreTecnologia: {
        type: String,
        required: true
    },
    
    /**
     * 
     */
    imagen: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
})

export default model('Tecnlogía', tecnologiaSchema)