"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "🏠" },
  { href: "/admin/dogs", label: "Manage Dogs", icon: "🐕" },
  { href: "/admin/requests", label: "Adoption Requests", icon: "❤️" },
  { href: "/admin/lost-found", label: "Lost & Found Reports", icon: "📍" },
  { href: "/admin/donations", label: "Donations", icon: "💰" },
  { href: "/admin/blog", label: "Blog", icon: "📝" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 shadow-sm h-screen flex-col sticky top-0 overflow-y-auto z-40">

      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-lg font-semibold text-gray-900">
          Admin Panel
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">

          {navItems.map((item) => {

            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch={false}
                  className={`flex items-center px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-orange-50 text-orange-700 border border-orange-200"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className="w-5 h-5 mr-3 flex-shrink-0">
                    {item.icon}
                  </span>

                  <span>{item.label}</span>

                </Link>
              </li>
            );
          })}

        </ul>
      </nav>

    </aside>
  );
}