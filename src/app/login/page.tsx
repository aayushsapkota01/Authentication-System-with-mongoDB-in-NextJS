"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";




export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [loading, setLoading] = useState(false)

    
    const onLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(user)

        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            toast.success("Login Success")
            console.log("Login Success!", response.data)

            router.push("/profile")
            
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error("Login Failed")
            console.log("Login Failed", error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    },[user])


    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1>Login</h1>
            <hr />
            <form onSubmit={onLogin} className="flex flex-col">
                 {/* email */}
            <label htmlFor="email">email</label>
            <input className="p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="email"
                autoComplete="email"
                />
            {/* password */}
            <label htmlFor="password">password</label>
            <input className="p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="password"
                autoComplete="current-password"
                />
            {/* Button */}
            <button className="p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600"
                    onClick={onLogin}
                    disabled= {loading || buttonDisabled}
                >{loading ? "Loading..." : "Sign In"}</button>
           </form>
            {/* Link to home page */}
            <Link href="/signup" className="text-blue-500">Visit Signup</Link>
        </div>
    );
}   