import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Cart from "@/models/cartModels";
import Product from "@/models/productModels";

import { NextRequest, NextResponse } from "next/server";
import { getDataFrom } from "@/utils/getDataFrom";

connect();

export async function GET(request: NextRequest) {
  try {

    const userLogId = await getDataFrom(request);
    const userLog = await User.findOne({ _id: userLogId }).select("-password");
    if (!userLog) {
      return NextResponse.json({
        message: "Unauthorized user",
      }, { status: 404 });
    }
    const userId = userLog._id

    const findCartProduct = await Cart.find({userId:userId }).populate("productId");

    if (findCartProduct) {
      return NextResponse.json(
        { message: "Product fetched successfully",
            data: findCartProduct,
        },
        { status: 200 }
  
      );
        
    }
    

  }catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }


}