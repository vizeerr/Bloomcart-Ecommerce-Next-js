import { connect } from "@/dbConfig/dbConfig";
import Product, { ProductInterface } from "@/models/productModels";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

connect();

export async function PUT(request: NextRequest) {
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

        // Extract product data from request body
        const { _id, name, description, price, category, brand, onSale, priceDrop, imageUrl, colors, reviews, inventory }: ProductInterface = await request.json();

        // Update product in database
        const updatedProduct = await Product.findByIdAndUpdate(
            _id,
            { name, description, price, category, brand, onSale, priceDrop, imageUrl, colors, reviews, inventory },
            { new: true }
        );

        // Handle successful update
        if (updatedProduct) {
            return NextResponse.json(
                { status: 200, message: "Product updated successfully" }
            );
        } else {
            // Handle product not found
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }
    } catch (error:any) {
        // Handle any errors
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
