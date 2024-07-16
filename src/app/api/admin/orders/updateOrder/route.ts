import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Order from "@/models/orderModels";
import { NextRequest, NextResponse } from "next/server";
import { getDataFrom } from "@/utils/getDataFrom";

connect();

export async function PUT(request: NextRequest) {
    try {
        const userId = await getDataFrom(request);
        const user = await User.findOne({ _id: userId }).select("-password");

        if (!user?.isAdmin) {
            return NextResponse.json({
                message: "Unauthorized user",
            }, { status: 404 });
        }

        const {_id} = await request.json();

        const updateOrder = await Order.findByIdAndUpdate(_id,{
            isProcessing:false
        })

        if (updateOrder) {
            return NextResponse.json(
                {
                    message: "Order Updated",
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { message: "Order not updated" },
                { status: 401 }
            );
        }

    } catch (error: any) {

        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
