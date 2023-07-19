import nodemailer from 'nodemailer'
import { GMAIL_PASS } from './env'

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
        user: 'giovankyandres@gmail.com',
        pass: GMAIL_PASS,
    },
})
transporter.verify().then(() => {
    console.log('Server ready for send emails')
})