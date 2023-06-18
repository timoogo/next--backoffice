import React from 'react';
import '../styles/_global.css';
import Header from '@/components/Navigations/Header';

interface AppProps {
    Component: React.ComponentType;
    pageProps: any;
}

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header />
            <main className="pt-16"> {/* Adjust this padding-top value to match your Header's height */}
                <Component {...pageProps} />
            </main>
        </>
    );
}

export default MyApp;
