import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import client from "../apollo-client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
