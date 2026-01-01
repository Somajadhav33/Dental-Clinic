import React from "react";

const AdminLogin = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-indigo-200 bg-white/90 px-10 py-12 shadow-2xl backdrop-blur-sm transition-all duration-300">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6">
            <svg
              className="w-8 h-8 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-indigo-800">Admin Login</h1>
          <h3 className="mt-2 text-xl font-semibold text-blue-700">Welcome Doctor</h3>
          <p className="mt-3 text-sm text-gray-600">
            Sign in to access the admin panel
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="doctor@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full h-12 mt-8 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold text-base shadow-lg hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-[1.02] transition-all duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Optional footer */}
        <p className="mt-10 text-center text-xs text-gray-500">
          Secure access • Protected by encryption
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;