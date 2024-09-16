"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { links } from "../app/globals";
import { useCartContext } from "./context/CartContext";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCartOutline } from "react-icons/io5";

const Header = () => {
  const pathName = usePathname();
  const { isCartEmpty, cart } = useCartContext();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <>
      <header className="w-full h-20 border-b-4 border-cyan-500 fixed z-40 bg-cyan-800 hidden md:block">
        <div className="md:w-11/12 lg:w-9/12 mx-auto h-full flex justify-between items-center">
          <Link href={"/"} className="rounded-full overflow-hidden">
            <Image
              src={"/images/logo-nuevo.png"}
              width={60}
              height={60}
              alt="Logo Garret Games"
            />
          </Link>
          <ul className="flex gap-3 lg:gap-5 text-white items-center">
            {links.map((link) => (
              <li
                className={`${
                  pathName === link.href ? "bg-cyan-900" : ""
                } p-1 lg:p-2 rounded-sm`}
                key={`${link.href}+${link.title}`}
              >
                <Link
                  key={link.title}
                  href={link.href}
                  className={`${
                    pathName === link.href ? "font-bold" : ""
                  }  hover:text-slate-400 ${
                    link.href == "/pages/carrito" && "flex gap-2"
                  }`}
                >
                  {link.title}
                  {link.href == "/pages/carrito" && !isCartEmpty()
                    ? cart.length
                    : ""}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <header className="md:hidden w-full fixed z-30 bg-cyan-800 h-14 flex flex-col justify-center px-5 border-b-2 border-b-cyan-400">
        <div className="w-full flex justify-between items-center">
          <RxHamburgerMenu
            className="text-white text-2xl"
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          />
          <Link href={"/"} className="rounded-full overflow-hidden">
            <Image
              src={"/images/logo-nuevo.png"}
              width={40}
              height={40}
              alt="Logo Garret Games"
            />
          </Link>
          <Link
            href={"/pages/carrito"}
            className={`font-bold hover:text-slate-400 flex gap-2`}
          >
            <IoCartOutline className="text-white text-2xl" />
            {!isCartEmpty() ? cart.length : ""}
          </Link>
        </div>
        <div
          className={`w-3/4 min-h-screen top-14 absolute bg-cyan-800 -left-full border-r-2 border-r-cyan-400 pt-4 transition-all ${
            !isOpenMenu ? "-left-full" : "left-0 "
          }`}
        >
          <ul className="flex flex-col gap-5 text-white items-center">
            {links.map((link) => {
              if (link.href == "/pages/carrito") return <></>;
              return (
                <li
                  onClick={() => setIsOpenMenu(false)}
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
                      link.href == "/pages/carrito" && "flex gap-2"
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
