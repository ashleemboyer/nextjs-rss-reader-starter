import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from '@lib/firebase';

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <h1>Log In</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();

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

          setLoading(true);

          signIn(email, password).catch((err) => {
            setLoading(false);
            alert(err);
          });
        }}
      >
        <label htmlFor="email">Email</label>
        <input id="email" type="email" />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
        <button type="submit">{loading ? 'Loading...' : "Let's Go!"}</button>
      </form>
    </>
  );
};

export default LoginPage;
