import { useState } from 'react';
import { signIn } from '@lib/firebase';
import { LoggedInContent } from '@components';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoggedInContent>
      <h1>Log In</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (isLoading) {
            return;
          }

          const inputs = e.target.querySelectorAll('input');
          const email = inputs[0].value;
          const password = inputs[1].value;

          if (!email) {
            alert('Email cannot be blank');
            return;
          }

          if (!password) {
            alert('Password cannot be blank');
            return;
          }

          setIsLoading(true);

          signIn(email, password).catch((err) => {
            setIsLoading(false);
            alert(err);
          });
        }}
      >
        <label htmlFor="email">Email</label>
        <input disabled={isLoading} id="email" type="email" />
        <label htmlFor="password">Password</label>
        <input disabled={isLoading} id="password" type="password" />
        <button disabled={isLoading} type="submit">
          {isLoading ? 'Loading...' : 'Sign in'}
        </button>
      </form>
    </LoggedInContent>
  );
};

export default LoginPage;
