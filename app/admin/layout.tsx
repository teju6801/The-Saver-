 "use client";

import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}

      <aside className="w-64 bg-white border-r border-gray-200 shadow-sm hidden lg:flex flex-col">

        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-900">
            Admin Panel
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">

          <Link
            href="/admin"
            className="flex items-center px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100"
          >
            <span className="mr-3">🏠</span>
            Dashboard
          </Link>

          <Link
            href="/admin/dogs"
            className="flex items-center px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100"
          >
            <span className="mr-3">🐕</span>
            Manage Dogs
          </Link>

          <Link
            href="/admin/requests"
            className="flex items-center px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100"
          >
            <span className="mr-3">❤️</span>
            Adoption Requests
          </Link>

          <Link
            href="/admin/lost-found"
            className="flex items-center px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100"
          >
            <span className="mr-3">📍</span>
            Lost & Found Reports
          </Link>

          <Link
            href="/admin/donations"
            className="flex items-center px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100"
          >
            <span className="mr-3">💰</span>
            Donations
          </Link>

          <Link
            href="/admin/blog"
            className="flex items-center px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100"
          >
            <span className="mr-3">📝</span>
            Blog
          </Link>

        </nav>

      </aside>

      {/* Main Content */}

      <div className="flex-1 flex flex-col">

        {/* Top Bar */}

        <header className="flex justify-between items-center px-6 py-4 bg-white border-b shadow-sm">

          <h2 className="text-lg font-semibold text-gray-900">
            Admin Dashboard
          </h2>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Logout
          </button>

        </header>

        {/* Page Content */}

        <main className="flex-1 p-6">
          {children}
        </main>

      </div>

    </div>
  );
} 
