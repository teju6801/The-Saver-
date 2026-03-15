import { db } from "./firebase";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";

export const deleteLostFoundReport = async (id: string) => {
  if (typeof id !== 'string' || id.trim() === '') {
    throw new Error(`Invalid report ID: ${id} (must be non-empty string)`);
  }
  await deleteDoc(doc(db, "lost-found", id));
};

export const markResolved = async (id: string) => {
  if (typeof id !== 'string' || id.trim() === '') {
    throw new Error(`Invalid report ID: ${id} (must be non-empty string)`);
  }
  await updateDoc(doc(db, "lost-found", id), {
    status: "resolved",
  });
};
