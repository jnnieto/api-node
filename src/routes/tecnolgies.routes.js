import { Router } from 'express'
import tecnolgiaController from '../controllers/tecnologia.controller'

const routerTec = Router()

routerTec.get('/', tecnolgiaController.obtenerTecnologias)
routerTec.post('/', tecnolgiaController.agregarTecnologia)

module.exports = routerTec