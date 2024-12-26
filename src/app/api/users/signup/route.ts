/* eslint-disable @typescript-eslint/no-explicit-any */

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.models.js"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        console.log("Request Body:", reqBody);

        const { username, email, password } = reqBody;

        if (!username || !email || !password) {
            return NextResponse.json({ error: "All fields are required!" }, { status: 400 });
        }

        // Ensure email uniqueness (case-insensitive)
        const user = await User.findOne({ email: new RegExp(`^${email}$`, "i") });
        console.log("User Found:", user);
        if (user) {
            return NextResponse.json({ error: "User Already Exists!" }, { status: 400 });
        }

        // Hash Password
        const hashedPassword = await bcryptjs.hash(password, 10);
        console.log("Hashed Password:", hashedPassword);

        // Create and save user
        const newUser = new User({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();
        console.log("Saved User:", savedUser);

        return NextResponse.json({
            message: "User Created Successfully!",
            success: true,
        });

    } catch (error: any) {
        console.error("Error occurred:", error);
        return NextResponse.json({ error: error?.message || "Internal Server Error" }, { status: 500 });
    }
}
