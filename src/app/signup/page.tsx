 "use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await axios.post("/api/users/signup", user);
        toast.success("Signup Success");
        console.log("Signup Success!!", response.data);
        router.push("/login");
    } catch (error) {
        let errorMessage = "An unexpected error occurred";

        if (axios.isAxiosError(error) && error.response?.data) {
            errorMessage = error.response.data.error || errorMessage;
        }

        toast.error(errorMessage);
        console.log("Signup Failed:", errorMessage);
    } finally {
        setLoading(false);
    }
};


    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1>Sign Up</h1>
            <hr />
            {/* Form to wrap inputs and button */}
            <form onSubmit={onSignup} className="flex flex-col">
                {/* Username */}
                <label htmlFor="username">Username</label>
                <input
                    className="p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Username"
                />
                {/* Email */}
                <label htmlFor="email">Email</label>
                <input
                    className="p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                />
                {/* Password */}
                <label htmlFor="password">Password</label>
                <input
                    className="p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                />
                {/* Button */}
                <button
                    type="submit"
                    className={`p-2 border text-black rounded mb-4 focus:outline-none ${
                        buttonDisabled ? "bg-gray-300 cursor-not-allowed" : "focus:border-gray-600 text-white"
                    }`}
                    disabled={buttonDisabled || loading}
                >
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>
            </form>
            {/* Link to home page */}
            <Link href="/">
                <span className="text-blue-500">Go to home page</span>
            </Link>
        </div>
    );
}
