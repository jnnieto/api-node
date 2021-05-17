import express from 'express';
import ProjectsRoutes from './routes/projects.routes';

const app = express()

// Settings
app.set('port', process.env.PORT || 3000)

// Para entender métodos JSON
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Proyectos del portafolio web de Nicolás Nieto'
    });
})

//CORS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

app.use('/api/proyectos', ProjectsRoutes)

export default app
