// pages/login.js
import { signIn, useSession } from 'next-auth/react';
import Layout from '@/app_layout/Layout';
import router from 'next/router';

const LoginPage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Layout>Loading...</Layout>;
  }

  if (session) {
    router.push('/ ');
  }

  return (
    <Layout>
      <div>
        <h1>Login</h1>
        <button onClick={() => signIn('google')}>Sign in with Google</button>
      </div>
    </Layout>
  );
};

export default LoginPage;
