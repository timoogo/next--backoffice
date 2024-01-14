// useAuth.ts
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log('Status:', status);
    console.log('Session:', session);

    if (status === 'authenticated' && !session) {
      router.push('/login');
    }
  }, [status, session, router]);

  return { session, status };
};

export default useAuth;