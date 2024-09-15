"use client";
import { auth, provider } from "@/firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

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
    const user = userCredential.user;

    setUser({
      logged: true,
      email: user.email,
      user: user.uid,
    });
  };

  const loginUser = async (values) => {
    console.log(values);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    const user = userCredential.user;

    setUser({
      logged: true,
      email: user.email,
      user: user.uid,
    });
  };

  const logout = async () => {
    await signOut(auth);
  };

  const googleLogin = async () => {
    await signInWithPopup(auth, provider);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          logged: true,
          email: user.email,
          user: user.uid,
        });
      } else {
        setUser({
          logged: false,
          email: null,
          user: null,
        });
      }
    });
  }, []);

  const value = { user, registerUser, loginUser, logout, googleLogin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
