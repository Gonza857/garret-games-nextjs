"use client";
import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    logged: false,
    email: null,
    uid: null,
  });

  const registerUser = async (values) => {
    console.log(values);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    console.log(userCredential);

    const user = userCredential.user;

    setUser({
      logged: false,
      email: user.email,
      user: user.uid,
    });
  };

  const value = { user, registerUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
