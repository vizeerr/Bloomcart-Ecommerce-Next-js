import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Cart from "@/models/cartModels";
import { NextRequest, NextResponse } from "next/server";
import { getDataFrom } from "@/utils/getDataFrom";

connect();

export async function POST(request: NextRequest) {
  try {
    const userLogId = await getDataFrom(request); // Assuming this function returns a promise
    const userLog = await User.findOne({ _id: userLogId }).select("-password");
    if (!userLog) {
      return NextResponse.json({
        message: "Unauthorized user",
      }, { status: 404 });
    }
    const userId = userLog._id
    const reqBody = await request.json();
    const {productId } = reqBody;
    const findAlreadyProduct = await Cart.findOne({ productId, userId });

    if (findAlreadyProduct) {
      const updatedProductToCart = await Cart.findOneAndUpdate(
        { userId, productId },
        { $inc: { quantity: 1 } },
        { new: true }
      );
      return NextResponse.json(
        { message: "Product quantity updated successfully", updatedProductToCart },
        { status: 200 }

      );
    } else {
      const addProductToCart = new Cart({ userId, productId, quantity: 1 });
      const addedProduct = await addProductToCart.save();
      if (addedProduct) {
        return NextResponse.json(
          { message: "Product added successfully", addedProduct },
          { status: 200 }
        );
      }
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
