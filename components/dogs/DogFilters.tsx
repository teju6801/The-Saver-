"use client"

import { useRouter, useSearchParams } from "next/navigation"

export default function DogFilters() {
  const router = useRouter()
  const params = useSearchParams()

  function updateFilter(key: string, value: string) {
    const newParams = new URLSearchParams(params.toString())

    if (value) {
      newParams.set(key, value)
    } else {
      newParams.delete(key)
    }

    router.push(`/dogs?${newParams.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-4 mb-6">

      <select
        onChange={(e) => updateFilter("breed", e.target.value)}
        className="border rounded px-3 py-2 text-sm"
        defaultValue=""
      >
        <option value="">All Breeds</option>
        <option value="Labrador">Labrador</option>
        <option value="German Shepherd">German Shepherd</option>
        <option value="Golden Retriever">Golden Retriever</option>
      </select>

      <select
        onChange={(e) => updateFilter("age", e.target.value)}
        className="border rounded px-3 py-2 text-sm"
        defaultValue=""
      >
        <option value="">All Ages</option>
        <option value="puppy">Puppy</option>
        <option value="young">Young</option>
        <option value="adult">Adult</option>
      </select>

      <select
        onChange={(e) => updateFilter("adopted", e.target.value)}
        className="border rounded px-3 py-2 text-sm"
        defaultValue=""
      >
        <option value="">Status</option>
        <option value="false">Available</option>
        <option value="true">Adopted</option>
      </select>

    </div>
  )
}