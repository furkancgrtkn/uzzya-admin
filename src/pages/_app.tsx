import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "src/redux/store";
import Default from "src/components/Layout/Default";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Default>
        <Toaster position="top-right" />
        <Component {...pageProps} />
      </Default>
    </Provider>
  );
}

export default MyApp;
