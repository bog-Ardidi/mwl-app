import React, { createContext, useState, useEffect } from "react";
import { auth } from "../Config/firebase";
interface Props {
  children: React.ReactNode;
}

interface Context {
  user: boolean | null;
}

// Context around the whole app, tracks if the user is logger
const AuthContext = createContext<Context>({ user: null });

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<boolean | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((res: any) =>
      res ? setUser(true) : setUser(false)
    );
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
