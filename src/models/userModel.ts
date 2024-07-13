import mongoose,{Document, Schema} from "mongoose";

export interface UserInterface extends Document{
    name:string,
    email:string,
    password:string,
    // verifyCode:string,
    // verifyCodeExpiry:string,
    // isVerified:boolean,
    isAdmin:boolean
}

const userSchema:Schema<UserInterface> = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Provide name"],
    },
    email:{ 
        type:String,
        required:[true,"Provide Email"],
        unique : true
    },
    password:{
        type:String,
        required:[true,"Provide Password"],
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

const User =mongoose.models.User as mongoose.Model<UserInterface> || mongoose.model<UserInterface>("User",userSchema)

export default User
