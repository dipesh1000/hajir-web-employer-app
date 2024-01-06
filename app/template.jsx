"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const template = ({ children }) => {
  const router = useRouter();
  const { setAuthUser, isLoggedIn, authUser, setIsLoggedIn } = useAuth();

  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    const user = typeof window !== "undefined" && localStorage.getItem("user");

    if (!token) {
      return setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
      setAuthUser({ user: user, token });

      if (token && user) {
        return router.push("/dashboard");
      }
    }
  }, []);

  return <div>{children}</div>;
};

export default template;
