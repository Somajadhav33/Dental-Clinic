"use client";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [remember, setRemember] = useState(
    localStorage.getItem("remember") === "true",
  );

  const router = useRouter();
  localStorage;

  const loginSub = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
      const res = await axios.post("http://localhost:3000/api/auth", {
        username,
        password,
      });

      if (res.data.valid) {
        toast.success("Welcome admin, login successfull");
        router.push("/admin-panel");
        setLoader(false);
      } else {
        setError(res.data.message);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
    setUsername("");
    setPassword("");
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
            <label className="text-sm text-gray-600 font-semibold">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              required
              type="text"
              placeholder="Enter Username"
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 font-semibold">
              Password
            </label>
            <input
              value={password}
              required
              type="password"
              placeholder="••••••••"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>
          {error ? (
            <p className="text-red-600 text-sm font-semibold m-1 delay-300">
              {error}
            </p>
          ) : (
            ""
          )}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => {
                  const val = e.target.checked;
                  setRemember(val);
                  localStorage.setItem("remember", val);
                }}
              />
              Remember me
            </label>

            <a href="#" className="text-blue-600">
              Forgot?
            </a>
          </div>

          <button
            type="submit"
            disabled={loader}
            className="w-full py-2 bg-black text-white rounded-md"
          >
            {loader ? "Logging in...." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          Protected by secure authentication
        </p>
      </div>
    </div>
  );
}
