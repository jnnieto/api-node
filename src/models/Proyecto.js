import {Schema, model}from 'mongoose';

/**
 * Atributos del objeto Proyecto
 */
const proyectoSchema = new Schema({

    /**
     * Variable de tipo string que representa el nombre del Proyecto
     */
    nombreProyecto: {
        type: String,
        required: true
    },

    /**
     * Variable de tipo string que representa una breve descripción del objetivo de proyecto
     */
    descripcion: {
        type: String,
        required: true
    },

    /**
     * Variable de tipo string que representa la url del proyecto en GitHub o Azure DevOps
     */
    urlProyecto: {
        type: String,
        required: false
    },

    /**
     * Variable de tipo string que representa la url del repositorio en GitHub O Azure DevOps
     */
    repositorio: {
        type: String,
        required: true
    },

    /**
     * Variable de tipo string que representa la ruta de la imagen del proyecto en el backend
     */
    imagen: {
        type: String,
        required: false
    },

    /**
     * Arreglo de tipo string que representa las tecnologías implementadas en ese proyecto
     */
    tecnologias: {
        type: [String],
        required: true
    },

    /**
     * Variable de tipos number que representa el año de realización del proyecto
     */
    anio: {
        type: Number,
        required: true
    },
}, {
    versionKey: false,
    timestamps: true
});

export default model('Proyecto', proyectoSchema)