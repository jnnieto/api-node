import Proyecto from '../models/Proyecto'

const proyectoController = {
    
    /**
     * Método para obtener la lista de proyecto
     * @param {*} req 
     * @param {*} res 
     */
    obtenerProyectos: async (req, res) => {
        await Proyecto.find().sort('nombreProyecto').exec((error, proyectos) => {
            if(error) return res.status(500).send({ message: "Error al enviar los datos" })

            if(!proyectos) return res.status(404).send({ message: "No hay ningún proyecto para mostrar" })

            return res.status(200).send({ proyectos })
        })
    },

    /**
     * Método para crear un nuevo proyecto
     * @param {*} res 
     * @param {*} req 
     */
    crearProyecto: async (req, res) => {
        const postProyecto = new Proyecto(req.body)

        await postProyecto.save((err, proyectoStore) => {
            //Se valida de que no haya ningún tipo de error en el servidor
            if (err) {  
                return res.status(500).send({ message: "Ocurrió un error al guardar el proyectos" })
            }

            // Se valida de que lo que se vaya a enviar no esté vacío
            if (!proyectoStore)
                return res.status(404).send({ message: "No se ha podido guardar el proyecto" })

            res.status(200).send({ message: "El proyecto ha sido creado satisfactoriamente" })
        }) 
        
    },

    /**
     * Método para obtener un proyecto por medio de su id
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    obtenerProyecto: async (req, res) => {
        let idProyecto = req.params.idProyecto

        if (idProyecto == null || idProyecto == undefined) {
            return res.status(404).send({
                message: "No se encontró ningún proyecto"
            })
        }

        await Proyecto.findById(idProyecto, (err, proyecto) => {
            if (err) {
                res.status(500).send( {
                    message: "No se pudo obtener el proyecto"
                })
            }
        
        res.status(200).send({
            proyecto
        })
        })
    },

    /**
     * Método para actualizar un proyecto por medio de su id
     * @param {*} req 
     * @param {*} res 
     */
    actualizarProyecto: async (req, res) => {
        let idProyecto = req.params.idProyecto
        let body = req.body

        await Proyecto.findByIdAndUpdate(idProyecto, body, {new: true}, (err, proyectoActualizado) => {

            if (err) {
                return res.status(500).send({
                    message: "Ocurrió un error al actualizar el proyecto"
                })
            }

            if (!proyectoActualizado) {
                return res.status(404).send({
                    message: "No existe el proyecto que se desea actualizar"
                })
            }

            res.status(200).send( { proyectoActualizado })

        })
    },

    /**
     * Método para eliminar un proyecto por medio de su id
     * @param {*} req 
     * @param {*} res 
     */
    borrarProyecto: async (req, res) => {
        let idProyecto = req.params.id

        await Proyecto.findByIdAndRemove(idProyecto, (err, proyectoEliminado) => {
            if(err) {
                return res.status(500).send({
                    message: "Error al eliminar el proyecto"
                })
            }

            if (!proyectoEliminado) {
                return res.status(404).send({
                    message: "No existe el proyecto para eliminar"
                })
            }

            res.status(200).send({
                message: "El proyecto fue eliminado satisfatoriamente"
            })
        })
    },
    
}

module.exports = proyectoController