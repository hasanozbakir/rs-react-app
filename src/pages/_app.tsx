import { Provider } from 'react-redux';
import Head from 'next/head';
import { ThemeProvider } from '../components/themeProvider/ThemeProvider';
import { store } from '../redux-store/store';
import ThemeButton from '../components/themeButton/ThemeButton';
import type { AppProps } from 'next/app';

import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Head>
          <title>SWAPI API</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <ThemeButton />
        <main className={orbitron.className}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </Provider>
  );
}
