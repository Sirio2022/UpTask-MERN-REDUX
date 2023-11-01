import jwt from 'jsonwebtoken';

const generarJWT = (id) => {
    return jwt.sign({
        id
    }, process.env.SECRETORPRIVATEKEY, {
        expiresIn: '30d'
    });
};

export default generarJWT;