import {connect} from 'mongoose' 

export const connectDatabase = async() => {
    try{
        await connect(process.env.DATABASE) //mongodb+srv://${process.env.DATABASE}/manga-app?retryWrites=true&w=majority
        console.log('Database is connected')
    }catch(err){
        console.log(err)
    }
}