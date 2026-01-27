"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const router = useRouter();

  const loginSub = (e) => {
    e.preventDefault();
    router.push("/admin-panel");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-center mb-4">
          <Image src="/logo.png" alt="Logo" width={60} height={60} />
        </div>

        <h1 className="text-xl font-semibold text-center">Welcome Admin</h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Please login to continue
        </p>

        <form onSubmit={loginSub} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="admin@mail.com"
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#" className="text-blue-600">
              Forgot?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded-md"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          Protected by secure authentication
        </p>
      </div>
    </div>
  );
}
