// lib/apollo.ts

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export function createApolloClient(token?: string) {
  return new ApolloClient({
    link: createHttpLink({
      uri: `${process.env.NEXT_PUBLIC_WP_URL}/graphql`,
      headers: token
        ? {
            Authorization: `Bearer ${token}`, 
          }
        : {},
    }),
    cache: new InMemoryCache(),
  });
}