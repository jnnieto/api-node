import {Router} from 'express'
import proyectoController from '../controllers/proyecto.controller';

const routerPro = Router()

routerPro.get('/', proyectoController.obtenerProyectos)
routerPro.post('/', proyectoController.crearProyecto)
routerPro.get('/:id', proyectoController.obtenerProyecto)
routerPro.put('/:id', proyectoController.actualizarProyecto)
routerPro.delete('/:id', proyectoController.borrarProyecto)

module.exports = routerPro