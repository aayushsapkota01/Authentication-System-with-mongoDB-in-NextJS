"use client"

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
    
    const router = useRouter()
    const[data, setData] = useState("")

    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success("Logout Successfully!")
            router.push("/login")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me")
        console.log(res.data)
        setData(res.data.data._id)

    }
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1>Profile</h1>
            <hr />
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus, repellat.</p>
            <h2 className="p-3 rounded bg-green-500">{data === "nothing" ? "Nothing" :
                <Link
                href={`/profile/${data}`}
                >{data}</Link>}
            </h2>
            <hr />
            <button
                className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-700 font-medium mt-5"
                onClick={logout}
            >Logout</button>

            <button
                className="px-4 py-2 rounded text-white bg-green-500 hover:bg-green-700 font-medium mt-5"
                onClick={getUserDetails}
            >Get User Details</button>
        </div>
    );
}   