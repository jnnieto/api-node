import {Router} from 'express'
import proyectoController from '../controllers/proyecto.controller';

const router = Router()

router.get('/', proyectoController.getProyectos)
router.post('/', proyectoController.createProyecto)

export default router