import React, { Suspense, useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
// Providers
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { PrimeReactProvider } from 'primereact/api';
// Styles
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-green/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../../public/assets/theme/theme-green.css';
import '../../public/assets/layout/css/layout-green.css';
import '../styles/globals.scss';
// i18n Config
import '../../ni18n.config';
import ToastContextProvider from '../components/ui/elements/Toast';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(router.locale);
  }, [router]);

  return (
    <>
      <Head>
        <title>Easy Pay - Payrolls</title>
      </Head>

      <Provider store={store}>
        <PrimeReactProvider>
          <Suspense fallback={<>...</>}>
            <ToastContextProvider>
              <Component {...pageProps} />
            </ToastContextProvider>
          </Suspense>
        </PrimeReactProvider>
      </Provider>
    </>
  );
}

export default CustomApp;
