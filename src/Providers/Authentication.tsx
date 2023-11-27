import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";

interface Props {
  children: React.ReactNode;
}

interface Context {
  user: boolean | null;
}

const AuthContext = createContext<Context>({ user: null });

const AuthProvider = ({ children }: Props) => {
  // user null = loading
  const [user, setUser] = useState<boolean | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((res) => (res ? setUser(true) : setUser(false)));
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
