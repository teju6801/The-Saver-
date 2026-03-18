"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import useLostFoundDogs from "@/hooks/useLostFoundDogs";
import LostDogCard from "@/components/lost-found/LostDogCard";
import dynamic from "next/dynamic";

const LostDogsMap = dynamic(
  () => import("@/components/lost-found/LostDogsMap"),
  { ssr: false }
);


export default function LostFoundPage() {
  const dogs = useLostFoundDogs();

  const lostDogs = dogs.filter((dog: any) => dog.type === "lost");
  const foundDogs = dogs.filter((dog: any) => dog.type === "found");

  return (
    <>
      <Navbar />

      <section className="section pt-0">
        <div className="page-container">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-20 gap-8">

            <div className="max-w-2xl">

              <h1 className="text-15px sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-primary-600 bg-clip-text text-transparent mb-6">
                Lost & Found Dogs
              </h1>

              <p className="text-lg md:text-xl text-gray-600">
                Help reunite dogs with their families by reporting lost or
                found dogs in your area.
              </p>

            </div>

            <Link
              href="/lost-found/report"
              className="btn-primary px-8 py-4 text-lg shadow-lg whitespace-nowrap"
            >
              📢 Report a Dog
            </Link>

          </div>

          {/* Map Section */}

<div className="mb-20">
            <LostDogsMap dogs={dogs} />
          </div>


          {/* Lost Dogs */}

          <section className="mb-20">

            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="text-red-500 text-3xl">🐕</span>
              Lost Dogs
            </h2>

            {lostDogs.length === 0 ? (

              <div className="card p-16 text-center">

                <p className="text-lg text-gray-500 mb-6">
                  No lost dog reports yet
                </p>

                <Link
                  href="/lost-found/report"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Report a lost dog
                </Link>

              </div>

            ) : (

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                {lostDogs.map((dog: any) => (
                  <LostDogCard key={dog.id} dog={dog} />
                ))}

              </div>

            )}

          </section>

          {/* Found Dogs */}

          <section>

            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="text-emerald-500 text-3xl">🐶</span>
              Found Dogs
            </h2>

            {foundDogs.length === 0 ? (

              <div className="card p-16 text-center">

                <p className="text-lg text-gray-500 mb-6">
                  No found dog reports yet
                </p>

                <Link
                  href="/lost-found/report"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Report a found dog
                </Link>

              </div>

            ) : (

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                {foundDogs.map((dog: any) => (
                  <LostDogCard key={dog.id} dog={dog} />
                ))}

              </div>

            )}

          </section>

        </div>
      </section>
    </>
  );
}