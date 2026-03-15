import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DonateCTA from "@/components/DonateCTA";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Adopt CTA - Replaces FeaturedDogs */}
      <section className="section bg-gradient-to-br from-primary-50 via-white to-gray-50/50">
        <div className="page-container text-center">
          <div className="max-w-5xl mx-auto mb-20 lg:mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-primary-500 bg-clip-text text-transparent mb-8 leading-tight">
              Ready to Save a Life?
            </h2>
            <br className="hidden lg:block" />
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
              Browse our rescue dogs waiting for loving forever homes
            </p>
          </div>
          <Link 
            href="/adopt"
            className="btn-primary text-xl px-12 py-6 inline-flex items-center gap-3 shadow-2xl hover:shadow-3xl text-lg"
          >
            🐾 Browse Dogs & Adopt
          </Link>
        </div>
      </section>
      
      <DonateCTA />
      <Footer />
    </main>
  );
}
