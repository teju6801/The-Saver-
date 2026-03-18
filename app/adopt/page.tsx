"use client";

import { useState } from "react";
import { useDogs } from "@/hooks/useDogs";
import Navbar from "@/components/Navbar";
import DogCard from "@/components/dogs/DogCard";
// import Footer from "@/components/Footer";

export default function AdoptPage() {
  const { dogs, loading } = useDogs();

  const [search, setSearch] = useState("");
  const [breedFilter, setBreedFilter] = useState("");

  const filteredDogs = dogs.filter((dog: any) => {
    return (
      dog.status !== "adopted" &&
      dog.name?.toLowerCase().includes(search.toLowerCase()) &&
      (breedFilter === "" || dog.breed === breedFilter)
    );
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <section className="pt-10 pb-8 text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="heading-1 mb-2">
              Adopt a Dog
            </h1>
            <p className="body-primary text-gray-600 max-w-3xl mx-auto mb-8">
              Find your new best friend from our loving rescue dogs.
            </p>
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-6">
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="input-field"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <select
                  className="input-field"
                  value={breedFilter}
                  onChange={(e) => setBreedFilter(e.target.value)}
                >
                  <option value="">All Breeds</option>
                  <option value="Labrador">Labrador</option>
                  <option value="Indie">Indie</option>
                  <option value="Beagle">Beagle</option>
                  <option value="German Shepherd">German Shepherd</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-32">
              <p className="text-2xl text-gray-500">Loading dogs...</p>
            </div>
          ) : filteredDogs.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-2xl text-gray-500">No dogs match your search. Try different filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 xl:gap-12">
              {filteredDogs.map((dog: any) => (
                <DogCard
                  key={dog.id}
                  id={dog.id}
                  name={dog.name}
                  age={dog.age}
                  breed={dog.breed}
                  image={dog.image || "/dogs/dog1.jpg"}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

