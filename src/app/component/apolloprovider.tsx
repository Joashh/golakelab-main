"use client";

import { ApolloProvider } from "@apollo/client/react";
import { createApolloClient } from "../lib/apollo";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export default function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const client = useMemo(() => {
    return createApolloClient(session?.accessToken);
  }, [session?.accessToken]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}