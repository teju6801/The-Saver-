import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Dog } from "@/types/dog"

interface Filters {
  breed?: string
  age?: string
  adopted?: string
}

export function useDogs(filters?: Filters) {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDogs() {
      let q = query(collection(db, "dogs"))

      if (filters?.breed) {
        q = query(q, where("breed", "==", filters.breed))
      }

      if (filters?.age) {
        q = query(q, where("age", "==", filters.age))
      }

      if (filters?.adopted) {
        const adopted = filters.adopted === "true"
        q = query(q, where("adopted", "==", adopted))
      }

      const snapshot = await getDocs(q)

      const results: Dog[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Dog[]

      setDogs(results)
      setLoading(false)
    }

    fetchDogs()
  }, [filters])

  return { dogs, loading }
}