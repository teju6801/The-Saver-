"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { collection, onSnapshot, query, where } from "firebase/firestore"
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
  const unsubscribeRef = useRef<(() => void) | null>(null)

  const fetchDogs = useCallback(() => {
    // Cleanup previous listener
    if (unsubscribeRef.current) {
      unsubscribeRef.current()
    }

    let q = query(collection(db, "dogs"))

    if (filters?.breed) {
      q = query(q, where("breed", "==", filters.breed))
    }

    if (filters?.age) {
      q = query(q, where("age", "==", filters.age))
    }

    if (filters?.adopted !== undefined) {
      const adopted = filters.adopted === "true"
      q = query(q, where("status", "==", adopted ? "adopted" : "available"))
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const results: Dog[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Dog[]

      setDogs(results)
      if (loading) setLoading(false)  // Only set false once
    }, (error) => {
      console.error("Error fetching dogs:", error)
      setLoading(false)
    })

    unsubscribeRef.current = unsubscribe
  }, [filters, loading])

  useEffect(() => {
    fetchDogs()
    
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
      }
    }
  }, [fetchDogs])

  return { dogs, loading }
}
