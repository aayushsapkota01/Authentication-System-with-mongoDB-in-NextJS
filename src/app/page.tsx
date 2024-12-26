'use client'
import toast from "react-hot-toast";
export default function Home() {
  const notify = () => toast.success('Success');
  return (
    <div className="flex flex-col justify-center items-center h-screen text-2xl">
      <h1>Hi, This is Next</h1>
      <button onClick={notify} className="border p-2 rounded-lg text-white">Click Me</button>
    </div>
  );
}
