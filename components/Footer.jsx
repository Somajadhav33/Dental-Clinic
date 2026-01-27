import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 text-sm mt-10">
      <div className="flex items-center justify-between px-6 py-3">
        <span className="ml-20">
          © 2026 AABHA DENTAL CLINIC. All rights reserved.
        </span>

        <Link href="/admin-login" className="hover:text-white transition">
          Admin Login
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
