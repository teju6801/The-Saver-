import Link from "next/link";
import ReportDogForm from "@/components/lost-found/ReportDogForm";

import Navbar from "@/components/Navbar";

export default function ReportDogPage() {
  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto py-16 px-4">
        <div className="text-center mb-12">

          <Link
            href="/lost-found"
            className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6"
          >
            ← Back to Lost & Found
          </Link>

          <h1 className="heading-1 text-gray-900">
            Report Lost or Found Dog
          </h1>

          <p className="body-primary text-gray-600 max-w-md mx-auto">
            Help reunite dogs with their families. Fill out the form below to report a lost or found dog.
          </p>

        </div>
       
       <p className="body-secondary mt-4">
  Tip: Use the map below to mark the exact location where the dog was seen.
</p>
        <ReportDogForm />

      </div>
    </>
  );
}
