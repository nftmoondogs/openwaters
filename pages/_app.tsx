import { useRef, useState } from "react";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { WagmiConfig } from "wagmi";
import { ToastContainer } from "react-toastify";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import store from "../redux/store";

import Meta from "../components/Meta";
import Layout from "../components/Layout/Layout";
import UserContext from "../components/UserContext";

import { client } from "../wagmi";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: any) {
  const scrollRef = useRef({
    scrollPos: 0,
  });

  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Meta title="Home" />

      <Provider store={store}>
        <WagmiConfig client={client}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <ThemeProvider
                enableSystem={false}
                attribute="class"
                defaultTheme="dark"
              >
                <UserContext.Provider value={{ scrollRef: scrollRef }}>
                  <Layout>
                    <ToastContainer
                      theme="dark"
                      hideProgressBar
                      draggableDirection="x"
                      position="bottom-right"
                    />
                    <Component {...pageProps} />
                  </Layout>
                </UserContext.Provider>
              </ThemeProvider>
            </Hydrate>
          </QueryClientProvider>
        </WagmiConfig>
      </Provider>
    </>
  );
}

export default MyApp;
