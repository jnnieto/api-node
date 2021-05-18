import {Router} from 'express'
import proyectoController from '../controllers/proyecto.controller';

const router = Router()

router.get('/', proyectoController.obtenerProyectos)
router.post('/', proyectoController.crearProyecto)
router.get('/:id', proyectoController.obtenerProyecto)
router.put('/:id', proyectoController.actualizarProyecto)
router.delete('/:id', proyectoController.borrarProyecto)

export default router