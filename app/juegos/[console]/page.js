import { products } from "@/app/globals";
import React from "react";

const Consola = ({ params }) => {
  console.log(params);

  const juegos = products.filter((g) => {
    if (g.hasOwnProperty("console")) {
      if (g.console.includes(params.console.toLowerCase())) {
        return g;
      }
    }
  });

  return (
    <div className="pt-20">
      Estas viendo: {params.console} y se encontraron {juegos.length}{" "}
      coincidencias.
    </div>
  );
};

export default Consola;
