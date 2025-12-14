import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import Constants from "expo-constants";

const link = new HttpLink({
  uri: Constants.expoConfig.extra.env,
});

const createApolloClient = () => {
  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    devtools: { enabled: true }, // active logs dans DevTools
  });
};

export default createApolloClient;
