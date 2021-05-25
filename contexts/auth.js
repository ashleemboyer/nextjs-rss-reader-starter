import { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from '@lib/firebase';

const DEFAULT_AUTH_DATA = { user: null, userIsLoading: true };

const AuthContext = createContext(DEFAULT_AUTH_DATA);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(DEFAULT_AUTH_DATA);

  useEffect(() => {
    setAuthData({ ...authData, userIsLoading: true });
    return onAuthStateChanged((user) => {
      setAuthData({ user, userIsLoading: false });
    });
  }, []);

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
