import AdminProductList from "@/components/admin/AdminProductList";
import Button from "@/components/UI/Button";
import LogoutButton from "@/components/LogoutButton";
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
    <main className="min-h-screen md:pb-12 flex flex-col items-center bg-slate-600">
      <div className="w-full pt-16 md:pt-24 md:pb-4 bg-cyan-900 py-2 flex flex-wrap flex-row justify-center items-center gap-3">
        {options.map((o) => (
          <Link
            href={`/admin/agregarproducto/${o.path}`}
            key={`${o.path}${o.name}`}
          >
            <Button>Agregar {o.name}</Button>
          </Link>
        ))}
        <Link href={"/admin/ordenes"}>
          <Button>Ver ordenes</Button>
        </Link>
        <LogoutButton />
      </div>
      <div className="w-full lg:w-10/12 flex items-center justify-center">
        <AdminProductList />
      </div>
    </main>
  );
};

export default Admin;
