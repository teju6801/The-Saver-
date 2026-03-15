"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AdminProtected({ children }: any) {

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{

    const unsubscribe = onAuthStateChanged(auth,(user)=>{

      if(!user){
        router.push("/admin/login");
      }

      setLoading(false);

    });

    return ()=>unsubscribe();

  },[]);

  if(loading) return <p className="p-10">Checking access...</p>;

  return children;
}