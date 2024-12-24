import { useRouter } from "next/router";

export default function UserProfile() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1>User Profile</h1>
            <hr />
            <p className="text-4xl">Profile Page
                <span className="text-2xl p-2 rounded bg-orange-500 text-black">{id}</span></p>
        </div>
    );
}  

