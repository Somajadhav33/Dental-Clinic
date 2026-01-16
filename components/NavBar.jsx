"use client";
import { GiHamburgerMenu } from "react-icons/gi";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#servicesSection" },
  { name: "About Us", href: "#aboutSection" },
  { name: "FAQ", href: "/faq" },
  { name: "Reviews", href: "/pricing" },
  { name: "Contact", href: "/#contactSection" },
];

export function NavigationBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 max-w-full bg-white shadow">
      <div className="mx-auto flex max-w-full items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link href="/" className="text-3xl font-bold text-gray-900">
          <Image
            src="/logo.png"
            alt="Clinic Logo"
            width={80}
            height={80}
            className="h-12"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-xl font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="transition hover:text-blue-600"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/book-appointment"
            className="inline-flex rounded-lg  bg-blue-500 px-4 py-2 text-lg font-semibold text-white hover:bg-blue-700 animate-pulse"
          >
            Book Appointment
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden rounded-lg text-4xl font-bold p-2 text-gray-700 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white px-6 py-4">
          <div className="flex flex-col gap-4 text-lg font-medium text-gray-700">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
