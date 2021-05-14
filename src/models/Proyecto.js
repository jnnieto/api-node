import {Schema, model}from 'mongoose';

/**
 * Atributos del objeto Proyecto
 */
const proyectoSchema = new Schema({

    /**
     * Variable de tipo string que representa el nombre del Proyecto
     */
    nombreProyecto: String,

    /**
     * 
     */
    descripcion: String,

    /**
     * 
     */
    urlProyecto: String,

    /**
     * 
     */
    repositorio: String,

    /**
     * 
     */
    imagen: String,

    /**
     * 
     */
    tecnologias: [String],

    /**
     * 
     */
    anio: Number
}, {
    versionKey: false,
    timestamps: true
});

export default model('Proyecto', proyectoSchema)