import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DogGallery from "@/components/dogs/DogGallery";

export default function AdoptPage() {
  return (
    <>
      <Navbar />
      <section className="section text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 leading-tight">
            Adopt a Dog
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Find your new best friend from our loving rescue dogs.
          </p>
        </div>
      </section>
      <DogGallery />
      <Footer />
    </>
  );
}

