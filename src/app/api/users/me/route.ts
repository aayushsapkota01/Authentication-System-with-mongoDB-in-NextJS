import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";
import { connect } from "@/dbConfig/dbConfig";


connect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        return NextResponse.json({
            message: "User Found",
            data: user
        })
        w

        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 400})
    }
}