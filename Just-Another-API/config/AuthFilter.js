import env from 'dotenv'
import jwt from 'jsonwebtoken';

env.config();

const isValid = (token) => {
    if (!token) return false;
    try {
        jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
    }
    catch (error) {
        return false;
    }
    return true;
}

const AuthFilter = (req, res, next) => {

    if (req.originalUrl.substring(0, 5) == '/auth')
        next();
    else {
        const header = req.headers;
        const token = header.authorization.substring(7);
        if (!isValid(token)) {
            res.status(403);
            res.send("Unautherized access");
        }
        else
            next();
    }
}

export default AuthFilter;