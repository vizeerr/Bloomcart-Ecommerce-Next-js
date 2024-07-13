import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFrom } from "@/utils/getDataFrom";

connect();

export async function GET(request: NextRequest) {
    try {

        const userId = getDataFrom(request)
        const user = await User.findOne({_id:userId}).select("-password")
        if(!user){
            return NextResponse.json({
                message:"Unauthorized user",
            },{status:404})
        }
        return NextResponse.json({
            message:"Logged in Success",
            data:user
        },{status:200})
    }catch (error:any) {
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
  
}
