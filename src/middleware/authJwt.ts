import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'

export const verifyToken = (req : Request, res : Response, next: NextFunction) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).json({ message: "No token provided!" });
    }
    
    jwt.verify(token, config.jwt.secret, ( error, decoded ) => {
    if (error) {
        return res.status(401).send({ message: "Unauthorized!" });
    }
    req.params._id = decoded.id;
        next();
    });
};

const authJet = {
    verifyToken
}