"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect } from "react";

const Template = ({ children }) => {
  const router = useRouter();
  const params = useParams();
  const { setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    const token =
      typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("token"));
    const user =
      typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      setIsLoggedIn(true);
      setAuthUser({ user: user, token });

      // Redirect to the dashboard if user is already logged in and trying to access /, /otp, or /login
      if (
        router.pathname === "/" ||
        router.pathname === "/otp" ||
        router.pathname === "/login"
      ) {
        router.push("/dashboard");
      }
    } else {
      setIsLoggedIn(false);
      setAuthUser(null);

      // Redirect to the login page if there is no token
      if (router.pathname !== "/login" && router.pathname !== "/otp") {
        router.replace("/login");
      }
    }
  }, [router, setAuthUser, setIsLoggedIn]);

  return <div>{children}</div>;
};

export default Template;
