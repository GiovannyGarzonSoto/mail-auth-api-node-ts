import nodemailer from 'nodemailer'
import { GMAIL_PASS } from './env'

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'giovankyandres@gmail.com',
        pass: GMAIL_PASS,
    },
})
console.log(transporter, 'probado')
transporter.verify().then(() => {
    console.log('Server ready for send emails')
})