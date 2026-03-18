import Link from 'next/link';
  
export default function Hero() {
  return (
    <section className="section-hero min-h-[80vh] flex items-center justify-center text-center bg-gradient-to-br from-primary-50/80 via-white to-gray-50/50">
      <div className="page-container px-4">
        <div className="space-y-8 max-w-5xl mx-auto">
          <h1 className="heading-1 bg-gradient-to-r from-gray-900 via-gray-800 to-primary-500 bg-clip-text text-transparent">
            Saving Dogs
            <br className="hidden lg:inline" />
            <span className="block text-transparent bg-gradient-to-r from-primary-500 to-orange-500 bg-clip-text">One Life at a Time</span>
          </h1>
          <p className="body-primary max-w-3xl mx-auto text-gray-600 font-medium">
            Rescuing street dogs and finding them loving forever homes across India
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-lg mx-auto">
            <Link href="/adopt" className="btn-primary text-lg px-10 py-5 w-full sm:w-auto shadow-2xl">
              🐾 Adopt Now
            </Link>
            <Link href="/donate" className="btn-secondary text-lg px-10 py-5 w-full sm:w-auto shadow-xl">
              💰 Donate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

