import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "src/redux/store";
import Default from "src/components/Layout/Default";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import "../../styles/globals.css";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Provider store={store}>
      <Toaster position="top-right" />
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
}

export default MyApp;
