"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", icon: "🏠" },
  { href: "/admin/dogs", label: "Manage Dogs", icon: "🐕" },
  { href: "/admin/requests", label: "Adoption Requests", icon: "❤️" },
  { href: "/admin/lost-found", label: "Lost & Found Reports", icon: "📍" },
  { href: "/admin/donations", label: "Donations", icon: "💰" },
  { href: "/admin/blog", label: "Blog", icon: "📝" },
];

export default function NavList() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 p-4">
      <ul className="space-y-1">
        {links.map(({ href, label, icon }) => {
          const isActive =
            pathname === href || pathname.startsWith(href + "/");

          return (
            <li key={href}>
              <Link
                href={href}
                prefetch={false}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-orange-50 text-orange-700 border-r-2 border-orange-500 shadow-sm"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm"
                }`}
              >
                <span className="w-5 h-5 mr-3 flex-shrink-0">
                  {icon}
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}