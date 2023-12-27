"use client"
import { ApolloNextAppProvider, NextSSRApolloClient, NextSSRInMemoryCache, SSRMultipartLink } from "@apollo/experimental-nextjs-app-support/ssr"
import { ApolloLink, HttpLink } from "@apollo/client"


function makeClient() {

    const httpLink = new HttpLink({
        uri: "https://rickandmortyapi.com/graphql"
    })

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link: typeof window === "undefined" ? ApolloLink.from([
            new SSRMultipartLink({
                stripDefer: true,
            }),
            httpLink
        ]) : httpLink
    })
}


function ApolloWrapper({ children }) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    )
}

export default ApolloWrapper