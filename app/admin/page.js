import AdminProductList from "@/components/admin/AdminProductList";
import Button from "@/components/Button";
import Link from "next/link";
import React, { Suspense } from "react";

const options = [
  { name: "juego", path: "/game" },
  { name: "subscripción", path: "/subscription" },
  { name: "tarjeta de regalo", path: "/giftcard" },
];

export const metadata = {
  title: "Administración",
};

const Admin = () => {
  return (
    <main className="min-h-screen pt-20 pb-12 flex flex-col items-center bg-slate-600">
      <div className="w-full bg-cyan-900 py-2 flex justify-center items-center gap-3">
        {options.map((o) => (
          <Link
            href={`/admin/agregarproducto/${o.path}`}
            key={`${o.path}${o.name}`}
          >
            <Button>Agregar {o.name}</Button>
          </Link>
        ))}
      </div>
      <div className="w-10/12 flex items-center justify-center">
        <AdminProductList />
      </div>
    </main>
  );
};

export default Admin;
