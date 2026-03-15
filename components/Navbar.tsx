"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 border-b border-gray-100/50 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="page-container">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-primary-500 bg-clip-text text-transparent"
          >
            The Saver
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 lg:gap-8">
            <Link href="/" className="text-base text-gray-700 hover:text-gray-900 font-medium py-2 px-3 rounded-xl transition-colors duration-200 hover:bg-orange-50">
              Home
            </Link>
            <Link href="/adopt" className="text-base text-gray-700 hover:text-gray-900 font-medium py-2 px-3 rounded-xl transition-colors duration-200 hover:bg-orange-50">
              Adopt
            </Link>
            <Link href="/blog" className="text-base text-gray-700 hover:text-gray-900 font-medium py-2 px-3 rounded-xl transition-colors duration-200 hover:bg-orange-50">
              Blog
            </Link>
            <Link href="/lost-found" className="text-base text-gray-700 hover:text-gray-900 font-medium py-2 px-3 rounded-xl transition-colors duration-200 hover:bg-orange-50">
              Lost & Found
            </Link>
            <Link
              href="/donate"
              className="btn-primary text-sm px-6 py-2 h-fit whitespace-nowrap"
            >
              Donate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200/50 pt-4 pb-4 space-y-2 backdrop-blur-sm">
            <Link href="/" className="block px-4 py-3 text-lg font-medium text-gray-700 hover:bg-orange-50 rounded-xl transition-all">
              Home
            </Link>
            <Link href="/adopt" className="block px-4 py-3 text-lg font-medium text-gray-700 hover:bg-orange-50 rounded-xl transition-all">
              Adopt
            </Link>
            <Link href="/blog" className="block px-4 py-3 text-lg font-medium text-gray-700 hover:bg-orange-50 rounded-xl transition-all">
              Blog
            </Link>
            <Link href="/lost-found" className="block px-4 py-3 text-lg font-medium text-gray-700 hover:bg-orange-50 rounded-xl transition-all">
              Lost & Found
            </Link>
            <Link
              href="/donate"
              className="block px-4 py-3 text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl hover:from-orange-600 hover:to-orange-700 font-bold shadow-md hover:shadow-lg transition-all text-lg"
            >
              Donate
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

