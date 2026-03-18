"use client";

import { useState } from "react";
import DogCard from "@/components/dogs/DogCard";
import { useDogs } from "@/hooks/useDogs";

export default function DogGallery() {

  const { dogs } = useDogs();

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
    <section className="pt-0 lg:section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Search + Filter */}

        <div className="max-w-4xl mx-auto mb-4 lg:mb-8">
          <div className="flex flex-col lg:flex-row gap-6 pb-6">

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

        {/* Dogs Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 xl:gap-12">
          {filteredDogs.length === 0 ? (
            <div className="col-span-full text-center py-32">
              <p className="text-2xl text-gray-500">No dogs match your search. Try different filters.</p>
            </div>
          ) : (
            filteredDogs.map((dog: any) => (
              <DogCard
                key={dog.id}
                id={dog.id}
                name={dog.name}
                age={dog.age}
                breed={dog.breed}
                image={dog.image || "/dogs/dog1.jpg"}
              />
            ))
          )}
        </div>

      </div>

    </section>
  );
}