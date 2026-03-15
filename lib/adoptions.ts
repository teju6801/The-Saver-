import { db } from "./firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

export const createAdoptionRequest = async (data: any) => {
  await addDoc(collection(db, "adoptionRequests"), {
    ...data,
    status: "pending",
    createdAt: Date.now()
  });
};

export const approveRequest = async (id: string) => {
  const ref = doc(db, "adoptionRequests", id);

  await updateDoc(ref, {
    status: "approved"
  });
};

export const rejectRequest = async (id: string) => {
  const ref = doc(db, "adoptionRequests", id);

  await updateDoc(ref, {
    status: "rejected"
  });
};