import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { SEED } from '../config'

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const token = req.get('token')
    if(!token){
        return res.json({
            success: false,
            message: 'Acceso no autorizado'
        })
    }
    const decoded = jwt.verify(token, SEED)
    if(!decoded){
        return res.status(401).json({
            success: false,
            message: 'Usuario no valido'
        })
    }
    req.user = decoded
    next()
}