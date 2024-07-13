import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModels";
import { NextRequest,NextResponse } from "next/server";

connect();
export async function GET(request:NextRequest){
    try {
        
        const products = await Product.find({});
        if(products){
            return NextResponse.json(
                {
                    sucess:true,
                    data:products
                },
                {status:200}
            )
        }else{
            return NextResponse.json(
                {error:"No products found"},
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