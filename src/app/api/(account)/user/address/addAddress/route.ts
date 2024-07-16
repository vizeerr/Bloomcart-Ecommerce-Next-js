import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFrom } from "@/utils/getDataFrom";
import Address from "@/models/shippingAddress";
connect();

export async function POST(request: NextRequest) {
    try {
        const userId = getDataFrom(request)
        const user = await User.findOne({_id:userId}).select("-password")
        if(!user){
            return NextResponse.json({
                message:"Unauthorized user",
            },{status:404})
        }

        const reqBody = await request.json();
        const {address,name,city,country,postalcode} = reqBody
        const data = {
            userId:user._id,
            shippingAddress:{
                name:name,
                address:address,
                city:city,
                country:country,
                postalcode:postalcode
            }
        }
        const savedOrder = await Address.create(data)
        
        if(savedOrder){
            return NextResponse.json(
                {message:"Address Added"},
                {status:200}
            
            )
        }
        
        return NextResponse.json(
            {message:"Address not added"},
            {status:401}
        
        )


    }catch (error:any) {
        console.log(error);
        
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
  
}
