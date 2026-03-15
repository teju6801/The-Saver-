"use client";

import Link from "next/link";
import useLostFoundDogs from "@/hooks/useLostFoundDogs";
import LostDogCard from "@/components/lost-found/LostDogCard";
import dynamic from 'next/dynamic';

const LostDogsMap = dynamic(
  () => import('@/components/lost-found/LostDogsMap'),
  { ssr: false }
);

export default function LostFoundPage() {
  const dogs = useLostFoundDogs();

  const lostDogs = dogs.filter((dog: any) => dog.type === "lost");
  const foundDogs = dogs.filter((dog: any) => dog.type === "found");

  return (
    <section className="section">
      <div className="page-container">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-20 lg:mb-24 gap-6 lg:gap-0">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-primary-600 bg-clip-text text-transparent mb-4">
              Lost & Found
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-2xl">
              Help reunite dogs with their families through our community reports
            </p>
          </div>
          <Link
            href="/lost-found/report"
            className="btn-primary whitespace-nowrap px-10 py-6 text-lg shadow-xl self-start lg:self-center"
          >
            📢 Report a Dog
          </Link>
        </div>

        {/* Lost Dogs */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <span className="text-red-400 text-3xl">🐕</span>
            Lost Dogs
          </h2>
          {lostDogs.length === 0 ? (
            <div className="card p-16 text-center">
              <p className="text-xl text-gray-500 mb-4">No lost dog reports yet</p>
              <Link href="/lost-found/report" className="btn-primary inline-flex items-center gap-2">
                Be the first to report
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {lostDogs.map((dog: any) => (
                <LostDogCard key={dog.id} dog={dog} />
              ))}
            </div>
          )}
        </section>

        {/* Found Dogs */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <span className="text-emerald-400 text-3xl">🐕</span>
            Found Dogs
          </h2>
          {foundDogs.length === 0 ? (
            <div className="card p-16 text-center">
              <p className="text-xl text-gray-500 mb-4">No found dog reports yet</p>
              <Link href="/lost-found/report" className="btn-primary inline-flex items-center gap-2">
                Report a found dog
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {foundDogs.map((dog: any) => (
                <LostDogCard key={dog.id} dog={dog} />
              ))}
            </div>
          )}
        </section>

      </div>
    </section>
  );
}
