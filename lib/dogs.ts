import { db } from "./firebase";
import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

export const addDog = async (dogData: any) => {
  const docRef = await addDoc(collection(db, "dogs"), { ...dogData, status: "available" });
  return docRef.id;
};

export const deleteDog = async (id: string) => {
  if (typeof id !== 'string' || id.trim() === '') {
    throw new Error(`Invalid dog ID: ${id} (must be non-empty string)`);
  }
  await deleteDoc(doc(db, "dogs", id));
};

export const markAdopted = async (id: string) => {
  if (typeof id !== 'string' || id.trim() === '') {
    throw new Error(`Invalid dog ID: ${id} (must be non-empty string)`);
  }
  await updateDoc(doc(db, "dogs", id), {
    status: "adopted",
  });
};
