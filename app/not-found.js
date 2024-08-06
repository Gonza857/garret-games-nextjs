"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div>
      <h3>Perdoná, no existe</h3>
      <button onClick={() => router.replace("/")}>Volver</button>
    </div>
  );
}
