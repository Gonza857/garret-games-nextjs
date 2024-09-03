import Image from "next/image";
import React from "react";

function loading() {
  return (
    <main className="pt-20 w-full min-h-screen flex items-center justify-center">
      <Image
        src={"/vercel.svg"}
        alt="Vercel Logo"
        width={150}
        height={150}
        className="animate-pulse"
      />
    </main>
  );
}

export default loading;
