import express, {Application} from 'express' 
import morgan from 'morgan'
import routes from './routes'
import path from 'path'
import cors from 'cors'
import { PORT } from './config'

const app: Application = express()

app.use(cors())
app.use(morgan('dev'))
app.set('port', PORT)
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/api', routes)
app.use(express.static(path.join(__dirname, '../public')))

export default app