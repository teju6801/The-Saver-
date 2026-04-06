"use client"

import { useSearchParams } from "next/navigation"
import { useDogs } from "@/hooks/useDogs"
import DogFilters from "@/components/dogs/DogFilters"

export default function DogsPage() {
  const params = useSearchParams()

  const breed = params.get("breed") || undefined
  const age = params.get("age") || undefined
  const adopted = params.get("adopted") || undefined

  const { dogs, loading } = useDogs({ breed, age, adopted })

  if (loading) return <p>Loading dogs...</p>

  return (
    <div>

      <h1 className="text-2xl font-semibold mb-6">
        Adopt a Dog
      </h1>

      <DogFilters />

      <div className="grid md:grid-cols-3 gap-6">
        {dogs.map((dog) => (
          <div key={dog.id} className="border rounded-lg p-4 bg-white">

            <img
              src={`${dog.image || "/dog-placeholder.jpg"}?t=${Date.now()}`}
              className="w-full h-48 object-cover rounded"
              alt={dog.name}
            />

            <h2 className="text-lg font-medium mt-3">
              {dog.name}
            </h2>

            <p className="text-sm text-gray-500">
              {dog.breed} • {dog.age}
            </p>

          </div>
        ))}
      </div>

    </div>
  )
}