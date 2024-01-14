/*
// Import styles
import '../styles/_global.css';
// Import libraries
import React from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
// Import interfaces
import { AppProps } from '@/interfaces/AppProps.interface';
// Import Layout
import AppLayout from '@/app_layout/AppLayout';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps): React.ReactNode {
    return (
        <QueryClientProvider client={queryClient}>
            <AppLayout Component={Component} pageProps={pageProps} />
        </QueryClientProvider>
    );
}

export default MyApp;
*/

// pages/_app.tsx
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import AppLayout from '@/app_layout/AppLayout';
import '../styles/_global.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps): React.ReactNode {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <AppLayout Component={Component} pageProps={pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;