import ContactForm from "@/components/contacto/ContactForm";
import React from "react";

function Contacto() {
  return (
    <main className="pt-20 flex items-center flex-col justify-center">
      <h1 className="mt-5 text-xl">Contáctanos</h1>
      <ContactForm />
    </main>
  );
}

export default Contacto;
