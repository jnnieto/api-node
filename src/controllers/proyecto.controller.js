import Proyecto from '../models/Proyecto'

const proyectoController = {
    
    getProyectos: (req, res) => {
        Proyecto.find().sort('nombreProyecto').exec((error, proyectos) => {
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
    createProyecto: async (req, res) => {
        const postProyecto = new Proyecto(req.body)
        console.log(postProyecto);

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
        
    }
    
}

module.exports = proyectoController