"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/UI/Button";

export default function NotFound() {
  const router = useRouter();
  return (
    <main className="pt-20 min-h-screen flex flex-col justify-center items-center gap-3">
      <h3 className="text-3xl">Uups! Esta página no existe {":("}</h3>
      <Button onClick={() => router.replace("/")}>
        Volver a la página principal
      </Button>
    </main>
  );
}
