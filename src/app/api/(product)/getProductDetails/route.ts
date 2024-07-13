import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModels";
import { NextRequest,NextResponse } from "next/server";


connect();
export async function GET(request:NextRequest){
    try {

        const searchParams = request.nextUrl.searchParams
        const id = searchParams.get('id');
        const category = searchParams.get('category');
        const filters:any = {};

        if (id) {
            filters._id = id;
        }
        if (category) {
            filters.category = category;
        }

        const products = await Product.find(filters);

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


    }catch (error:any) {
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )
    }
    
}