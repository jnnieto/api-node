import Tecnologia from '../models/Tecnologia'

const tecnologiaController = {

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    obtenerTecnologias: async (req, res) => {
        await Tecnologia.find().exec((error, tecnologias) => {
            if (error) {
                return res.status(500).send({message: "Error al cargar los datos"})
            }

            if (!tecnologias) {
                return res.status(404).send({ message: "No hay tecnologías disponibles" })
            }

            res.status(200).send({ tecnologias })
        })
    },


    agregarTecnologia: async (req, res) => {
        const newTecnologia = new Tecnologia(req.body)

        await newTecnologia.save((err, tecnologiaNueva) => {

            if (err) {
                return res.status(500).send({ message: "Ocurrió un erro al crear la tecnología" })
            }

            if (!tecnologiaNueva) {
                return res. status(404).send({ message: "No se ha podido guardar la nueva tecnologia" })
            }

            res.status(200).send({ message: "La tecnología ha sido creada satisfactoriamente" })
        })
    }

}

module.exports = tecnologiaController