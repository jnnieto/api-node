import express from 'express';
import ProjectsRoutes from './routes/projects.routes';

const app = express()

app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => {
    res.json({
        message: 'Proyectos del portafolio web de Nicolás Nieto'
    });
})

app.use('/api/proyectos', ProjectsRoutes)

export default app
