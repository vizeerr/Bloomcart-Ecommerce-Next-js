import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'


connect();
export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {name,email,password} = reqBody;
        console.log(reqBody);
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json(
                {error:"User Already register"},
                {status:400}
            )
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedpassword = await  bcryptjs.hash(password,salt);

        const newUser = new User({
            name,
            email,
            password:hashedpassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser);
        if(savedUser){
            return NextResponse.json(
                {error:"User registered success"},
                {status:200}
            )
        }
        
    } catch (error:any) {
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
}