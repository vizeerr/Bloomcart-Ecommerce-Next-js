import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModels";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

connect();

export async function DELETE(request: NextRequest) {
    try {
        // Retrieve token from cookies
        const token = request.cookies.get('token');
        
        // Handle unauthorized request
        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Verify token and find user by email
        const decoded: any = jwt.verify(token.value, process.env.TOKEN_SECRET!);
        const user = await User.findOne({ email: decoded.email });

        // Handle user not found
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const reqBody = await request.json();

        // Extract product ID from query parameters
        const {_id} = reqBody

        // Find product by ID and delete it
        const deletedProduct = await Product.findByIdAndDelete(_id);

        // Handle product not found
        if (!deletedProduct) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        // Handle successful deletion
        return NextResponse.json(
            { status: 200, message: "Product deleted successfully" }
        );
        
    } catch (error:any) {
        // Handle any errors
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
