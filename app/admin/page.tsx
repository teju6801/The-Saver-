import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Link href="/admin/dogs" className="group">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group-hover:border-orange-200">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">🐕</span>
              <h2 className="text-lg font-semibold text-gray-900">Manage Dogs</h2>
            </div>
            <p className="text-3xl font-bold text-orange-600 mb-2">12+</p>
            <p className="text-sm text-gray-500">View and add dogs</p>
          </div>
        </Link>
        <Link href="/admin/requests" className="group">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group-hover:border-orange-200">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">❤️</span>
              <h2 className="text-lg font-semibold text-gray-900">Adoption Requests</h2>
            </div>
            <p className="text-3xl font-bold text-orange-600 mb-2">8+</p>
            <p className="text-sm text-gray-500">Manage requests</p>
          </div>
        </Link>
        <Link href="/admin/lost-found" className="group">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group-hover:border-orange-200">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">📍</span>
              <h2 className="text-lg font-semibold text-gray-900">Lost & Found</h2>
            </div>
            <p className="text-3xl font-bold text-orange-600 mb-2">5+</p>
            <p className="text-sm text-gray-500">Review reports</p>
          </div>
        </Link>
        <Link href="/admin/donations" className="group">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group-hover:border-orange-200">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">💰</span>
              <h2 className="text-lg font-semibold text-gray-900">Donations</h2>
            </div>
            <p className="text-3xl font-bold text-orange-600 mb-2">$1,250</p>
            <p className="text-sm text-gray-500">Track contributions</p>
          </div>
        </Link>
        <Link href="/admin/blog" className="group">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group-hover:border-orange-200 lg:col-span-2">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">📝</span>
              <h2 className="text-lg font-semibold text-gray-900">Blog</h2>
            </div>
            <p className="text-3xl font-bold text-orange-600 mb-2">15+</p>
            <p className="text-sm text-gray-500">Manage posts</p>
          </div>
        </Link>
      </div>
      <div className="text-center text-gray-500 text-sm">
        Click cards to navigate or use sidebar
      </div>
    </div>
  );
}

