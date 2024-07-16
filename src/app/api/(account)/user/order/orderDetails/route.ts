import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModels";
import Order from "@/models/orderModels";
import User from "@/models/userModel";
import { getDataFrom } from "@/utils/getDataFrom";
import { NextRequest,NextResponse } from "next/server";


connect();
export async function GET(request:NextRequest){
    try {

        const userId = getDataFrom(request)
        const user = await User.findOne({_id:userId}).select("-password")
        if(!user){
            return NextResponse.json({
                message:"Unauthorized user",
            },{status:404})
        }

        const searchParams = request.nextUrl.searchParams
        const id = searchParams.get('orderId');

        if (!id) {
            return NextResponse.json(
                {error:"No Id found"},
                {status:401}
            )
        }
        const orderDetail = await Order.findById(id).populate('orderItems.product');
        if(orderDetail && orderDetail?.userId == userId || orderDetail && orderDetail?.userId !== userId && user.isAdmin){
            
                return NextResponse.json(
                {
                    sucess:true,
                    data:orderDetail
                },
                {status:200})
            
        }else{
            return NextResponse.json(
                {error:"No products found"},
                {status:401}
            )
        }


    }catch (error:any) {
        console.log(error);
        
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
    
}