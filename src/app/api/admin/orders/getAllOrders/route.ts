import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Order from "@/models/orderModels";
import { NextRequest, NextResponse } from "next/server";
import { getDataFrom } from "@/utils/getDataFrom";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFrom(request);
        const user = await User.findOne({ _id: userId }).select("-password");

        if (!user) {
            return NextResponse.json({
                message: "Unauthorized user",
            }, { status: 404 });
        }

        const savedOrder = await Order.find({})

        if (savedOrder) {
            return NextResponse.json(
                {
                    message: "Order found",
                    data: savedOrder
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { message: "Order not found" },
                { status: 401 }
            );
        }

    } catch (error: any) {
        console.log(error);

        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
