import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../axiosConfig/AxiosConfig";

export const UserContext = createContext();

const LOGIN_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const loginTimestamp = localStorage.getItem("loginTimestamp");

    if (savedUser && loginTimestamp) {
      const isExpired = Date.now() - loginTimestamp > LOGIN_DURATION;

      if (isExpired) {
        localStorage.removeItem("user");
        localStorage.removeItem("loginTimestamp");
      } else {
        setUser(savedUser);
      }
    }
  }, []);

  const loginUser = async (info, navigate, toast) => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/useri/login",
        info
      );
      const { user, jwtToken } = response.data;
      localStorage.setItem("token", jwtToken);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("loginTimestamp", Date.now().toString());
      setUser(user);

      if (user.status === "junior") navigate("/profile");
      else if (user.status === "mentor") navigate("/mentor-homepage");
      else navigate("/admin");
    } catch (error) {
      console.error("Error:", error.message);
      toast.current.show({
        severity: "fail",
        summary: "Failed",
        detail: "Wrong password",
        life: 3000,
      });
      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
      } else if (error.request) {
        console.error("No response received");
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loginTimestamp");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
