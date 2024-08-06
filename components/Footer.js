import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="w-full bg-cyan-800 h-80 text-white p-4 flex flex-col gap-3">
      <div className="w-10/12 mx-auto flex py-4">
        {/* COL 1 */}
        <div className="w-4/12 flex flex-col gap-3 items-center p-4">
          <p className="font-bold">¡Síguenos en nuestras redes!</p>
          <p>Facebook</p>
          <p>Instagram</p>
        </div>
        {/* COL 2 */}
        <div className="w-4/12 flex flex-col gap-3 items-center p-4 border-l-cyan-200">
          <p>Inicio</p>
          <p>Juegos</p>
          <p>Tarjetas de regalo</p>
          <p>PlayStation Plus</p>
        </div>
        {/* COL 3 */}
        <div className="w-4/12 flex items-center justify-center p-4 border-l-cyan-200">
          <Link href={"/"} className="rounded-full border-4 overflow-hidden">
            <Image
              src={"/images/logo-nuevo.png"}
              width={120}
              height={120}
              alt="Logo Garret Games"
            />
          </Link>
        </div>
      </div>
      <hr />
      <div></div>
    </footer>
  );
};
