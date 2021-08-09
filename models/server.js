const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Rutas de la API
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            cargar: '/api/cargar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios'
        }

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

        // Fileupload - carga ade archivos 
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.buscar, require('../routes/search.routes'));
        this.app.use(this.paths.cargar, require('../routes/uploads.routes'));
        this.app.use(this.paths.categorias, require('../routes/categories.routes'));
        this.app.use(this.paths.productos, require('../routes/products.routes'));
        this.app.use(this.paths.usuarios, require('../routes/user.routes'));
        
    }

    listen() {
        this.app.listen(    process.env.PORT, () => {
            console.log('Servidor corriendo en el puerto', process.env.PORT );
        });
    }
}

module.exports = Server;