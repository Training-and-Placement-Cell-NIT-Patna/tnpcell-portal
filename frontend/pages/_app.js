import { useState, useEffect } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import '../styles/globals.css';
import Loading from '@/components/LandingPageElements/Loading';

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // simulate a loading delay
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (isLoading) {
    return (
      <div>
        <div><Loading/></div>
      </div>
    );
  }

  return (

      <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
