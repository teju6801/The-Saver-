import Link from 'next/link';

export default function Footer() {
  return (
<footer className="bg-white border-t border-gray-200 py-12 md:py-16 lg:py-20 mt-12 md:mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">The Saver</h3>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-md">
              Saving dogs, one rescue at a time. Your support changes lives.
            </p>
          </div>

          <div>
            <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-base md:text-lg text-gray-700 hover:text-gray-900 font-medium block py-1.5 px-2 lg:px-3 hover:bg-gray-50 rounded-xl transition-colors">Home</Link></li>
              <li><Link href="/adopt" className="text-lg text-gray-700 hover:text-gray-900 font-medium block py-2 px-3 hover:bg-gray-50 rounded-xl transition-colors">Adopt</Link></li>
              <li><Link href="/blog" className="text-lg text-gray-700 hover:text-gray-900 font-medium block py-2 px-3 hover:bg-gray-50 rounded-xl transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Get Help</h4>
            <ul className="space-y-3">
              <li><Link href="/lost-found" className="text-lg text-gray-700 hover:text-gray-900 font-medium block py-2 px-3 hover:bg-gray-50 rounded-xl transition-colors">Lost & Found</Link></li>
              <li><Link href="/donate" className="text-lg text-gray-700 hover:text-gray-900 font-medium block py-2 px-3 hover:bg-gray-50 rounded-xl transition-colors">Donate</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Contact</h4>
            <p className="text-base md:text-lg text-gray-600 mb-3">rescue@thesaver.org</p>
            <p className="text-base md:text-lg text-gray-600">(555) 123-4567</p>
          </div>

        </div>

        <div className="border-t border-gray-200 mt-8 md:mt-12 pt-6 md:pt-8 text-center">
          <p className="text-base md:text-lg text-gray-500">&copy; 2024 The Saver. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

