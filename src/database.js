import mongoose from 'mongoose';

(async () => {
    const db = await mongoose.connect('mongodb://localhost:27017/portafolio' , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('Conexión con', db.connection.name)
})();
