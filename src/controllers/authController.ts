import { Request, Response } from 'express'
import User, { IUser } from '../models/User'
import { transporter } from '../config/mail'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { SEED } from '../config'

class AuthController {
    public async signup(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body
            const verifyUser = await User.findOne({ email })
            if (verifyUser) {
                return res.status(200).json({
                    success: false,
                    message: 'El correo ya existe para otro usuario'
                })
            }
            const newUser: IUser = new User({
                name,
                email,
                password
            })
            newUser.password = await newUser.encryptPassword(newUser.password)
            const data = await newUser.save()
            const emailDecored = data.email.split("@")[0]
            const info = await transporter.sendMail({
                from: 'noreply@app.com',
                to: email,
                subject: 'App Account Activation Link',
                html: `
                <h2>Please click on given link to activate your App account</h2>
                <a href="https://beamish-parfait-f718c4.netlify.app/auth/activate/${emailDecored}">http://localhost:5173/auth/activate</a>`
            })

            if (!info) {
                return res.json({
                    success: false,
                    message: 'Problemas al enviar correo de verificacion'
                })
            }
            return res.json({
                success: true,
                message: 'Le hemos enviado un correo para verificar su cuenta'
            })
        } catch (err) {
            return res.status(200).json({
                success: false,
                message: 'Problemas al registrar el Usuario',
                err
            })
        }
    }

    public async signin(req: Request, res: Response) {
        try {
            const data = await User.findOne({ email: req.body.email })
            if (!data) {
                return res.status(200).json({
                    success: false,
                    message: 'Correo o contraseña erronea'
                })
            }
            const correctPassword: boolean = await data.validatePassword(req.body.password)
            if (!correctPassword) {
                return res.status(200).json({
                    success: false,
                    message: 'Correo o contraseña erronea'
                })
            }
            if (!data.active) {
                return res.status(200).json({
                    success: false,
                    message: 'Es necesario confirmar su correo'
                })
            }
            const payload = {
                _id: data._id,
                email: data.email,
                role: data.role
            }
            const token = jwt.sign(payload, SEED, {
                expiresIn: 60 * 60 * 2
            })
            return res.json({
                success: true,
                token
            })
        } catch (err) {
            return res.status(200).json({
                sucess: false,
                message: 'No se pudo autenticar el Usuario',
                err
            })
        }
    }

    public async activateAccount(req: Request, res: Response) {
        try {
            const { token } = req.body
            if (!token) {
                return res.status(200).json({
                    success: false,
                    message: 'Es necesario un token'
                })
            }
            const email  = token + '@gmail.com'
            const user = await User.findOne({ email })
            await user.updateOne({ active: true })
            return res.json({
                success: true,
                message: 'La cuenta ha sido activada'
            })
        } catch (err) {
            return res.status(200).json({
                success: false,
                message: 'Error al activar la cuenta',
                err
            })
        }
    }

    public async forgotPassword(req: Request, res: Response) {
        try {
            const { email } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(200).json({
                    success: false,
                    message: 'Problemas al realizar la operacion'
                })
            }
            const random = uuidv4();
        
            const info = await transporter.sendMail({
                from: 'noreply@app.com', // sender address,
                to: email,
                subject: 'App Reset Password Link',
                html: `
                    <a href="https://beamish-parfait-f718c4.netlify.app/auth/resetpass/${random}">http://localhost:5173/auth/resetpass/${random}</a>
                    `
                })
            if (!info) {
                return res.json({
                    success: false,
                    message: 'Problemas al cambiar su contraseña'
                })
            }
            const data = await user.updateOne({ resetLink: random })
            if (!data) {
                return res.status(200).json({
                    success: false,
                    message: 'Enlace de resetear contraseña incorrecto'
                })
            }
            return res.json({
                success: true,
                message: 'Le hemos enviado un enlace para resetear la contraseña'
            })
        } catch (err) {
            return res.status(200).json({
                success: false,
                message: 'Error al enviar enlace para resetear contraseña',
                err
            })
        }
    }

    public async resetPassword(req: Request, res: Response) {
        try {
            const { resetLink, newPass } = req.body
            if (!resetLink) {
                return res.status(200).json({
                    success: false,
                    message: 'Token incorrecto o expirado'
                })
            }
            let user = await User.findOne({ resetLink })
            const obj = {
                password: newPass,
                resetLink: ''
            }
            user = _.extend(user, obj)
            user.password = await user.encryptPassword(user.password)
            const modifiedUser = await user.save()
            if (!modifiedUser) {
                return res.status(200).json({
                    success: false,
                    message: 'Error al modificar contraseña',
                })
            }
            return res.json({
                success: true,
                message: 'Tu contraseña ha sido modificada'
            })
        } catch (err) {
            return res.status(200).json({
                success: false,
                message: 'Error al resetear contraseña',
                err
            })
        }
    }
}

export const authController = new AuthController()