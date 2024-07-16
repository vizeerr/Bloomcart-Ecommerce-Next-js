import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Order from "@/models/orderModels";
import { NextRequest, NextResponse } from "next/server";
import { getDataFrom } from "@/utils/getDataFrom";
import Cart from "@/models/cartModels";
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
        const savedOrder = await Order.create(reqBody)
        if(savedOrder){
            const del = await Cart.deleteMany({userId:user._id})
            if(del){
                return NextResponse.json(
                    {message:"order created"},
                    {status:200}
                
                )
            }
        }
        
        return NextResponse.json(
            {message:"order not created"},
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
