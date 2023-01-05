import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "../styles/theme";
import ContractProvider from "../contexts/contract";
import Layout from "../components/Layout";

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContractProvider>
      <ChakraProvider resetCSS theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ContractProvider>
  );
}
