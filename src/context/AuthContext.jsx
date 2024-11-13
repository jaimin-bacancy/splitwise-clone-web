import React, { createContext, useState } from "react";

const AuthContext = createContext();

// this function converts JSON into string to be entered into localStorage
function AddToLocalStorage(data) {
  if (typeof data != "string") {
    data = JSON.stringify(data);
  }
  return data;
}

// this function gets string from localStorage and converts it into JSON
function GetFromLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return localStorage.getItem(key);
  }
}

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(GetFromLocalStorage("token"));
  const [user, setUser] = useState(GetFromLocalStorage("user"));

  const login = (token, user) => {
    localStorage.setItem("token", AddToLocalStorage(token));
    localStorage.setItem("user", AddToLocalStorage(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, setUser, setToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
