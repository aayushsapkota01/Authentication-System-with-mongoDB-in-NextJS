 import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.models.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        console.log(reqBody);
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "Invalid Credentials" }, { status: 400 });
        }

        // Check password
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid Credentials" }, { status: 400 });
        }
        
        // Create Token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        // Create Token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });
        
        const response = NextResponse.json({
            message: "Login Successful",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
