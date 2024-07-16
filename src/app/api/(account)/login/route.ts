import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


connect();
export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody;
        
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json(
                {error:"User Not registered"},
                {status:500}
            )
        }
        const validPassword = await bcryptjs.compare(password,user.password);

        if(!validPassword){
            return NextResponse.json(
                {error:"Check Credentail"},
                {status:400}
            )
        }

        const tokenData = {
            id:user._id,
            email:user.email,
            name:user.name
        }
        const userdata= {
            email:user.email,
            name:user.name,
            isAdmin : user.isAdmin
        }

        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'})
        const response = NextResponse.json({
            message:"Logged in Success",
            success:true,
            data:userdata
        })
        response.cookies.set("token",token,{httpOnly:true})
        
        return response
    } catch (error:any) {
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
}