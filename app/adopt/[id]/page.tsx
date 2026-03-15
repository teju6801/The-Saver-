import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdoptionForm from "@/components/dogs/AdoptionForm";
import DogImageGallery from "@/components/dogs/DogImageGallery";

export const dynamic = "force-dynamic";

export default async function DogProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const docRef = doc(db, "dogs", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return (
      <>
        <Navbar />
        <div className="p-10 text-center text-red-500">
          Dog not found
        </div>
        <Footer />
      </>
    );
  }

  const dog = docSnap.data();

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto py-16 md:py-20 lg:py-24 px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          <DogImageGallery images={[dog.image || "/dogs/dog1.jpg"]} />

          <div className="space-y-6 md:space-y-8 pt-8 md:pt-12 lg:pt-0">

            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 md:mb-6 leading-tight">
                {dog.name}
              </h1>

              <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8 text-base md:text-lg text-gray-600">
                <span>{dog.age}</span>
                <span>•</span>
                <span>{dog.breed}</span>
                <span>•</span>
                <span>📍 {dog.location || "Our Shelter"}</span>
              </div>
            </div>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {dog.story}
            </p>

            <div className="pt-8 md:pt-10">
              <AdoptionForm dogName={dog.name} />
            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

