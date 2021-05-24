import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from '@lib/firebase';

const DEFAULT_AUTH_DATA = { user: null, userLoading: null };

const AuthContext = createContext(DEFAULT_AUTH_DATA);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const isErrorPage = router.pathname.endsWith('error');
  const isLoginPage = router.pathname.endsWith('login');
  const [authData, setAuthData] = useState(DEFAULT_AUTH_DATA);

  useEffect(() => {
    setAuthData({ ...authData, userLoading: true });
    return onAuthStateChanged((user) => {
      console.log('onAuthStateChanged', user);
      if (isErrorPage) {
        return;
      }

      if (!user && !isLoginPage) {
        router.replace('/login');
      }

      if (user && isLoginPage) {
        router.replace('/');
      }

      setAuthData({ user, userLoading: false });
    });
  }, []);

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
