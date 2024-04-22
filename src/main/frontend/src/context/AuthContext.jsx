import { createContext, useContext, useEffect, useState } from "react";
import { logout, onUserStateChanged } from '../utils/firebase';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChanged(user => {
      setUser(user)
    });
  }, []);

  return (
    <AuthContext.Provider value={{user, logout}}>
      { children }
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}