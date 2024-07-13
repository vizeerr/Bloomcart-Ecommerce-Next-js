import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModels";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import { getDataFrom } from "@/utils/getDataFrom";

connect();
export async function POST(request:NextRequest){
    try {
    
        const userId = getDataFrom(request)

        const user = await User.findOne({_id:userId}).select("-password")

        if(!user){

            return NextResponse.json({
                message:"Unauthorized user",
            },{status:404})
            
        }

        const reqBody = await request.json();

        const {name,description,price,category,brand,onSale,priceDrop,imageUrl,colors,inventory} = reqBody

        const createdProduct = new Product({
            name,description,price,category,brand,onSale,priceDrop,imageUrl,colors,inventory
        })

        const savedProduct = await createdProduct.save();
        if(savedProduct){
            return NextResponse.json(
                {message:"Product Added"},
                {status:200}
            )
        }else{
            return NextResponse.json(
                {error:"Failed"},
                {status:401}
            )
        }

    } catch (error:any) {
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
}