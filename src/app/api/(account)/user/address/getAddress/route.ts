import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFrom } from "@/utils/getDataFrom";
import Address from "@/models/shippingAddress";

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

        const savedAddress = await Address.find({ userId: user._id });
            return NextResponse.json(
                {
                    message: "Address found",
                    data: savedAddress
                },
                { status: 200 }
            );

    } catch (error: any) {
        console.log(error);

        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
