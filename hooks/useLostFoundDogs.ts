"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function useLostFoundDogs() {

  const [dogs, setDogs] = useState<any[]>([]);

  useEffect(() => {

    const unsubscribe = onSnapshot(
      collection(db, "lost-found"),
      (snapshot) => {

        const dogList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setDogs(dogList);
      }
    );

    return () => unsubscribe();

  }, []);

  return dogs;
}