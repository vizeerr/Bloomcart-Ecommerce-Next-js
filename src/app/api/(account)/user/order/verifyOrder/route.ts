import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Order from "@/models/orderModels";
import { NextRequest, NextResponse } from "next/server";
import { getDataFrom } from "@/utils/getDataFrom";
import { getPaymentFrom } from "@/utils/getPaymentFrom";
import Cart from "@/models/cartModels";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
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
        
        const {sessionId} = reqBody
        
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const shippingData = session.metadata

        const findSession:any = await Order.findOne({userId:userId,sessionId:sessionId})
        if(findSession){
            return NextResponse.json(
                {message:"order already placed"},
               {status:200}
           )
        }else{

            if(session.payment_status == 'paid'){
            const finalCartProduct = await Cart.find({userId:userId }).populate("productId");
            if(finalCartProduct){
                console.log(finalCartProduct);
                

                const orderData = {
                    sessionId:sessionId,
                userId : user._id,
                shippingAddress : {
                    name:shippingData.name,
                    address:shippingData.address,
                    city:shippingData.city,
                    country:shippingData.country,
                    postalcode:shippingData.postalcode
                },
                orderItems : finalCartProduct.map((item:any)=>({
                    quantity:item.quantity,
                    product: item.productId._id,
                })),
                totalPrice : finalCartProduct.reduce((sum, item:any) => sum + item.productId.priceDrop * item.quantity, 0),
                isPaid:true,
                paidAt:new Date(),
                isProcessing : true,

                }
                const savedOrder = await Order.create(orderData)
                             
                if(savedOrder){
                    const del = await Cart.deleteMany({userId:user._id})
                    if(del){
                        return NextResponse.json(
                             {message:"order created"},
                             {status:200}
                            
                        )
                    }
            }
        }
            return NextResponse.json(
                {message:"order not created"},
                {status:401}
            )
            
        }else{
            return NextResponse.json(
                {message:"order not found"},
                {status:404}
            )
        }
    }

    }catch (error:any) {
        console.log(error);
        
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
  
}
