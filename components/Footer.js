import { links } from "@/app/globals";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="w-full bg-cyan-800 min-h-fit text-white p-4 flex flex-col gap-3">
      <div className="w-full md:w-10/12 mx-auto flex flex-col md:flex-row py-4">
        {/* COL 1 */}
        <div className="w-full md:w-4/12 flex flex-col gap-3 items-center p-4">
          <p className="font-bold">¡Síguenos en nuestras redes!</p>
          <p>Facebook</p>
          <p>Instagram</p>
        </div>
        <hr className="md:hidden" />
        {/* COL 2 */}
        <ul className="w-full md:w-4/12 flex flex-col gap-1 items-center p-4">
          {links.map((link) => {
            if (link.href == "/pages/carrito") return;
            return (
              <li
                className={`p-1 rounded-sm`}
                key={`${link.href}+${link.title}`}
              >
                <Link
                  key={link.title}
                  href={link.href}
                  className={`hover:text-slate-400`}
                >
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <hr className="md:hidden" />
        {/* COL 3 */}
        <div className="w-full md:w-4/12 flex items-center justify-center p-4">
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
      <div>
        <p className="text-sm text-center">
          Desarrollado por Gonzalo Ramos - Coderhouse - Next.js
        </p>
      </div>
    </footer>
  );
};
