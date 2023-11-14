import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface Props {
  children: React.ReactNode;
}

interface Context {
  user: boolean | null;
}

const AuthContext = createContext<Context>({ user: null });

const AuthProvider = ({ children }: Props) => {
  const auth = getAuth();

  // user null = loading
  const [user, setUser] = useState<boolean | null>(null);

  useEffect(() => {
    checkLogin();
  }, []);

  function checkLogin() {
    onAuthStateChanged(auth, (res) => (res ? setUser(true) : setUser(false)));
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
