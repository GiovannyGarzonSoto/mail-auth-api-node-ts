import express, {Application} from 'express' 
import morgan from 'morgan'
import routes from './routes'
import path from 'path'
import cors from 'cors'
import nodemailer from 'nodemailer'
import { PORT, GMAIL_PASS } from './config'

const app: Application = express()

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'giovankyandres@gmail.com',
        pass: GMAIL_PASS,
    },
})
transporter.verify().then(() => {
    console.log('Server ready for send emails')
})

app.use(cors())
app.use(morgan('dev'))
app.set('port', PORT)
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/api', routes)
app.use(express.static(path.join(__dirname, '../public')))

export default app