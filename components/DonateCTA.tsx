import Link from "next/link";

export default function DonateCTA() {
  return (
    <section className="section bg-gradient-to-b from-white via-orange-50 to-orange-50/30 border-t border-gray-100/50">
      <div className="page-container text-center">
        <div className="pt-20 lg:pt-24 pb-16 lg:pb-20">
          <h2 className="heading-2 bg-gradient-to-r from-gray-900 to-orange-600 bg-clip-text text-transparent">
            Help Us Save
            <br />
            <span className="text-orange-500">More Dogs</span>
          </h2>
          <p className="body-primary text-gray-600 font-medium max-w-3xl mx-auto">
            Every donation rescues another dog. Your support creates hope and second chances.
          </p>
          <Link 
            href="/donate"
            className="btn-primary inline-flex items-center gap-3 text-lg px-10 py-5 shadow-2xl hover:shadow-3xl font-bold"
          >
            💖 Donate Today
          </Link>
        </div>
      </div>
    </section>
  );
}

