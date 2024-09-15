import Image from "next/image";
import Header from "../components/Header";
import Main from "@/components/Main";

export const metadata = {
  title:
    "Garret Games - Tienda de Juegos Digitales, Tarjetas de Regalo Steam, PSN y PlayStation Plus",
  description:
    "Compra los mejores juegos digitales, tarjetas de regalo de Steam, PlayStation Network (PSN) y suscripciones a PlayStation Plus. Ofrecemos una gran variedad de productos al mejor precio para jugadores de todas las plataformas.",
  keywords: [
    "juegos digitales",
    "tarjetas de regalo Steam",
    "tarjetas PSN",
    "PlayStation Plus",
    "comprar juegos",
    "suscripciones PS Plus",
    "videojuegos",
    "PS4",
    "PS5",
    "PC gaming",
  ],
};

export default function Home() {
  return <Main />;
}
