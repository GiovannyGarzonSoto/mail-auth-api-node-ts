import {connect} from 'mongoose' 
import {DATABASE} from './config'

export const connectDatabase = async() => {
    try{
        //mongodb+srv://${DATABASE}/mail-auth?retryWrites=true&w=majority
        await connect(`mongodb+srv://${DATABASE}/mail-auth?retryWrites=true&w=majority`) 
        console.log('Database is connected')
    }catch(err){
        console.log(err)
    }
}