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
            <h2 className="heading-2 bg-gradient-to-r from-gray-900 via-gray-800 to-primary-500 bg-clip-text text-transparent">
              Ready to Save a Life?
            </h2>
            <p className="body-primary max-w-3xl mx-auto text-gray-600 font-medium">
              Browse our rescue dogs waiting for loving forever homes
            </p>
          </div>
          <Link 
            href="/adopt"
            className="btn-primary inline-flex items-center gap-3 shadow-2xl hover:shadow-3xl px-12 py-6"
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
