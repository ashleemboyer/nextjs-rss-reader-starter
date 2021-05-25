import { useRouter } from 'next/router';
import { useAuth } from '@contexts/auth';
import { useEffect } from 'react';

const LoggedInContent = ({ children }) => {
  const router = useRouter();
  const { user, userIsLoading } = useAuth();

  useEffect(() => {
    if (userIsLoading) {
      return;
    }

    const isLoginPage = router.pathname === '/login';
    if (!user && !isLoginPage) {
      router.replace('/login');
    } else if (user && isLoginPage) {
      router.replace('/');
    }
  }, [user, userIsLoading]);

  if (userIsLoading) {
    return <h1>Loading...</h1>;
  }

  return children;
};

export default LoggedInContent;
