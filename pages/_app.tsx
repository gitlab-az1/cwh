import React from 'react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@/redux';

import '@/styles/App.scss';
import '@/styles/boxicons/boxicons.min.css';

import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <ToastContainer
        toastStyle={{ color: 'var(--text-color)' }}
        position="bottom-right"
        newestOnTop={false}
        autoClose={3200}
        draggable
        draggableDirection="x"
        pauseOnFocusLoss
        hideProgressBar
        closeOnClick
        pauseOnHover
      />
      <Component {...pageProps} />
    </ReduxProvider>
  );
}
