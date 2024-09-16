"use client";
import React, { useState } from "react";
import Button from "../UI/Button";

const ContactForm = () => {
  const [value, setValue] = useState({ email: "", text: "" });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/api/contacto", {
      method: "POST",
      body: JSON.stringify(value),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border flex flex-col gap-5 w-80 m-2"
    >
      <input
        type="email"
        required
        placeholder="Tu correo electrónico"
        name="email"
        onChange={handleChange}
        className="p-2"
      />
      <textarea
        required
        placeholder="Tu mensaje"
        name="text"
        onChange={handleChange}
        className="resize-none p-2"
      />
      <Button type="submit">Enviar</Button>
    </form>
  );
};

export default ContactForm;
