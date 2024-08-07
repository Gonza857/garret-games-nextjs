"use client";
import { products } from "@/app/globals";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import React from "react";

const Consola = ({ params }) => {
  const router = useRouter();

  const juegos = products.filter((g) => {
    if (g.hasOwnProperty("console")) {
      if (g.console.includes(params.console.toLowerCase())) {
        return g;
      }
    }
  });

  return (
    <main className="pt-20 flex items-center justify-center min-h-screen">
      <div className="flex items-center flex-col gap-4">
        {juegos.length == 0 ? (
          <>
            <h3 className="text-2xl text-cyan-800 flex flex-col items-center gap-2">
              Ups! No hay juegos para consola {params.console.toUpperCase()}.
            </h3>

            <Button onClick={() => router.back()}>Volver atras</Button>
          </>
        ) : (
          <h3 className="text-2xl text-cyan-800 flex flex-col items-center gap-2">
            Estas viendo juegos para {params.console.toUpperCase()} y se
            encontraron {juegos.length} coincidencias.
          </h3>
        )}
      </div>
    </main>
  );
};

export default Consola;
