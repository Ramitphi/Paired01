import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

const httpLink = new HttpLink({ uri: "https://api-mumbai.lens.dev/" });

const APIURL = "https://api-mumbai.lens.dev/";

export const apolloClient = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});
