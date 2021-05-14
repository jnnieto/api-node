import {Router} from 'express'
import Proyecto from '../models/Proyecto';

const router = Router()

router.get('/', (req, res) => {
    res.send('Proyectos')
})

router.post('/', async (req, res) => {
    const postProyecto = new Proyecto({
        nombreProyecto: req.body.nombreProyecto,
        descripcion: req.body.descripcion,
        urlProyecto: req.body.urlProyecto,
        repositorio: req.body.repositorio,
        imagen: req.body.imagen,
        tecnologias: req.body.tecnologias,
        anio: req.body.anio
    })
    const proyectoGuardado = await postProyecto.save()
    res.json(proyectoGuardado)
})

export default router