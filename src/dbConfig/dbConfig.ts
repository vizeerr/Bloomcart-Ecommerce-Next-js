import mongoose from "mongoose";

export async function connect(){
    try {
        if (mongoose.connections[0].readyState) {
            return;
          }
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on('connected',()=>{
            console.log('MongoDb Connected')
        })
        connection.on('error',(error)=>{
            console.log('MongoDb Connection Error'+ error);
            process.exit()
        })
    } catch (error) {
        console.log('Not Connected Error')
        console.log(error);
        
    }
}