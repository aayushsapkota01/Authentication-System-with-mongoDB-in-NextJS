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

        const { username, email, password } = reqBody

        // check if user exist
        const user = await User.findOne({ email })
         console.log("User Found:", user); // Debug if user exists
        if (user) {
            return NextResponse.json({error: "User Already Exists!"}, {status: 400})
        }

        // Hash Password
        const salt = await bcryptjs.genSalt(10)
         console.log("Generated Salt:", salt); // Debug salt generation
        const hashedPassword = await bcryptjs.hash(password, salt)
        console.log("Hashed Password:", hashedPassword); // Debug hashed password


        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log("Saved User:", savedUser); // Debug user saving

        return NextResponse.json({ message: "User Created Successfully!", success: true, savedUser })
        
    } catch (error: any) {
        
        return NextResponse.json({error: error.message},{status: 500})
    }
}