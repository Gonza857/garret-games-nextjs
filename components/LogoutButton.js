"use client";
import React from "react";
import { useAuthContext } from "./context/AuthContext";
import Button from "./UI/Button";

const LogoutButton = () => {
  const { logout } = useAuthContext();
  return <Button onClick={logout}>Logout</Button>;
};

export default LogoutButton;
