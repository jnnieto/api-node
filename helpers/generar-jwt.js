const jwt = require('jsonwebtoken');

const generarJWT = (uid = '', uname = '', urole = '') => {

    return new Promise( (resolve, reject) => {

        const payload = { uid, uname, urole };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve(token)
            }

        })

    });

}

module.exports = {
    generarJWT
}