import React from 'react';
import '../styles/_global.css';
import Header from '@/components/Header';

interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
}

function MyApp({ Component, pageProps }: AppProps) {
    return (
    <>
    <Header />
        <Component {...pageProps} />
    </>)
}

export default MyApp;
