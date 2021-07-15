const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Conectar a la base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB () {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Directorio público
        this.app.use(express.static('public'))

        // Lectura y parseo del body
        this.app.use(express.json());
    }

    routes() {
        
        this.app.use(this.usuariosPath, require('../routes/user.routes'));

    }

    listen() {
        this.app.listen(    process.env.PORT, () => {
            console.log('Servidor corriendo en el puerto', process.env.PORT );
        });
    }
}

module.exports = Server;