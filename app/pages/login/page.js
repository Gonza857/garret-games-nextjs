"use client";
import Button from "@/components/UI/Button";
import { useAuthContext } from "@/components/context/AuthContext";
import React, { useState } from "react";

const Login = () => {
  const { registerUser, loginUser, googleLogin } = useAuthContext();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <main className="pt-20 flex justify-center items-center min-h-screen">
      <div className="flex flex-col w-fit border rounded-lg items-center p-4 gap-4">
        <h3 className="text-xl">Login</h3>
        <form
          className="flex flex-col gap-3 min-h-fit"
          //   action={handleLogin}
          onSubmit={handleSubmit}
        >
          <input
            className="w-full p-2 outline-none outline-cyan-800 rounded-sm text-neutral-400"
            name="email"
            placeholder="Correo electrónico"
            type="email"
            onChange={handleChange}
          />
          <input
            className="w-full p-2 outline-none outline-cyan-800 rounded-sm text-neutral-400"
            name="password"
            placeholder="Contraseña"
            type="password"
            onChange={handleChange}
          />

          <Button onClick={() => loginUser(values)}>Iniciar</Button>
          <Button onClick={() => registerUser(values)}>Registrar</Button>
          <Button onClick={() => googleLogin()}>Googlearse</Button>
        </form>
      </div>
    </main>
  );
};

export default Login;
