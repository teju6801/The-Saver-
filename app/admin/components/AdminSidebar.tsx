"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className='w-64 bg-white border-r border-gray-200 shadow-sm h-screen flex flex-col sticky top-0 hidden lg:flex overflow-y-auto z-40'>
      <div className='p-6 border-b border-gray-200 flex-shrink-0'>
        <h1 className='text-xl font-semibold text-gray-900'>Admin Panel</h1>
      </div>
      <nav className='flex-1 p-4'>
        <ul className='space-y-1'>
          <li>
            <Link href='/admin' className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${pathname === '/admin' ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`} prefetch={false}>
              <span className='w-5 h-5 mr-3'>🏠</span>
              Dashboard
            </Link>
          </li>
          <li>
            <Link href='/admin/dogs' className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${pathname.startsWith('/admin/dogs') ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`} prefetch={false}>
              <span className='w-5 h-5 mr-3'>🐕</span>
              Manage Dogs
            </Link>
          </li>
          <li>
            <Link href='/admin/requests' className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${pathname.startsWith('/admin/requests') ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`} prefetch={false}>
              <span className='w-5 h-5 mr-3'>❤️</span>
              Adoption Requests
            </Link>
          </li>
          <li>
            <Link href='/admin/lost-found' className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${pathname.startsWith('/admin/lost-found') ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`} prefetch={false}>
              <span className='w-5 h-5 mr-3'>📍</span>
              Lost & Found Reports
            </Link>
          </li>
          <li>
            <Link href='/admin/donations' className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${pathname.startsWith('/admin/donations') ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`} prefetch={false}>
              <span className='w-5 h-5 mr-3'>💰</span>
              Donations
            </Link>
          </li>
          <li>
            <Link href='/admin/blog' className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${pathname.startsWith('/admin/blog') ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`} prefetch={false}>
              <span className='w-5 h-5 mr-3'>📝</span>
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

