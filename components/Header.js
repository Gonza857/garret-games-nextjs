"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { links } from "../app/globals";
import { useCartContext } from "./context/CartContext";

const Header = () => {
  const pathName = usePathname();
  const { isCartEmpty, cart } = useCartContext();

  return (
    <header className="w-full h-20 border border-cyan-500 fixed z-50 bg-cyan-800">
      <div className="w-10/12 mx-auto h-full flex justify-between items-center">
        <Link href={"/"} className="rounded-full overflow-hidden">
          <Image
            src={"/images/logo-nuevo.png"}
            width={60}
            height={60}
            alt="Logo Garret Games"
          />
        </Link>
        <ul className="flex gap-5 text-white items-center">
          {links.map((link) => (
            <li
              className={`${
                pathName === link.href ? "bg-cyan-900" : ""
              } p-2 rounded-sm`}
              key={`${link.href}+${link.title}`}
            >
              <Link
                key={link.title}
                href={link.href}
                className={`${
                  pathName === link.href ? "font-bold" : ""
                }  hover:text-slate-400 ${
                  link.href == "/carrito" && "flex gap-2"
                }`}
              >
                {link.title}
                {link.href == "/carrito" && !isCartEmpty() ? cart.length : ""}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
