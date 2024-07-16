import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFrom } from "@/utils/getDataFrom";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import jwt from 'jsonwebtoken'
import { metadata } from "@/app/layout";

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
        
        const {lineItem,shippingAddress} = reqBody
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types : ["card"],
            line_items:lineItem,
            mode:'payment',
            success_url:'http://localhost:3000/checkout/success/{CHECKOUT_SESSION_ID}',
            cancel_url:'http://localhost:3000/checkout/failed',
            metadata:shippingAddress
        })
        const tokenData = {
            sessionId:session.id,
        }
        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'})
        const response = NextResponse.json(
            {id:session.id},
            {status:200}
        )
        response.cookies.set('sessionId',token)
        return response

    }catch (error:any) {
        console.log(error);
        
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
  
}
