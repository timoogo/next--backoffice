// Import libraries
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import LoginPage from '@/pages/login';  // Import your login component

// Import components
import LeftBar from '@/components/LeftBar/LeftBar';
import Header from '@/components/Navigations/Header';

// Import interfaces
import { AppProps } from '@/interfaces/AppProps.interface';

// Import hooks
import useLeftNavVisibility from '@/hooks/useLeftNavVisibility';
import useActionDisplayWindow from '@/hooks/useActionDisplayWindow';
import useDeleteEntityData from '@/hooks/useDeleteEntityData';

function AppLayout({ Component, pageProps }: AppProps): React.JSX.Element {
  const { isLeftNavVisible, openLeftNav } = useLeftNavVisibility();
  const { isActionWindowDisplayed, openActionWindow, entityName, identifier } = useActionDisplayWindow();
  const deleteMutation = useDeleteEntityData();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log('Status:', status);
    console.log('Session:', session);

    if (status === 'unauthenticated' && !session) {
      // Redirect to login only if not on the login page
      if (router.pathname !== '/login') {
        console.log('Redirecting to /login');
        router.push('/login');
      }
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // Render the login page if the user is not authenticated
  if (status === 'unauthenticated' && !session) {
    return <LoginPage />;
  }

  return (
    <div className='flex flex-col min-h-screen w-full bg-gray-200'>
      <Header />
      <main className='flex flex-grow items-stretch flex-row pt-16'>
        <div className='flex w-full'>
          {isLeftNavVisible && <LeftBar />}
          <div className='relative flex flex-grow flex-col'>
            {isActionWindowDisplayed && (
              <div
                onClick={(event) => openActionWindow(null, undefined, event)}
                className='absolute flex items-center justify-center top-0 h-full w-full bg-gray-800/80'
              >
                <div className='flex justify-center items-center flex-col h-fit w-96 rounded-lg bg-gray-200'>
                  <div className='flex justify-center items-center h-10 w-full rounded-t-lg bg-gray-300'>
                    <p>
                      Action | <span className='font-bold'>{`${entityName}`}</span> -
                      id: <span className='font-bold'>{`${identifier}`}</span>
                    </p>
                  </div>
                  <div className='flex justify-center items-center flex-row'>
                    <button className='w-32 py-2 px-2 m-2 rounded bg-blue-500 text-white hover:bg-blue-600'>Modify</button>
                    <button
                      onClick={() => entityName && identifier && deleteMutation.mutate({ entityName: entityName as string, identifier })}
                      className='w-32 py-2 px-2 m-2 rounded bg-red-700 text-white hover:bg-red-800'
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className='m-4'>
              {/* Render the actual component */}
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
