import {Router} from 'express'
import proyectoController from '../controllers/proyecto.controller';

const router = Router()

router.get('/', proyectoController.obtenerProyectos)
router.post('/', proyectoController.crearProyecto)

export default router