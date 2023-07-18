import {connect} from 'mongoose' 
import {DATABASE} from './config'

export const connectDatabase = async() => {
    try{
        //mongodb+srv://${DATABASE}/mail-auth?retryWrites=true&w=majority
        await connect(`mongodb://localhost:27017/mail-auth`) 
        console.log('Database is connected')
    }catch(err){
        console.log(err)
    }
}