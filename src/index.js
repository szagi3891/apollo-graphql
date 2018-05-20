//@flow
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App/App';


//import ApolloClient from "apollo-boost";
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

/*
const client = new ApolloClient({
    uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});
*/

const client = new ApolloClient({
    link: createHttpLink({ uri: "https://w5xlvm3vzz.lp.gql.zone/graphql" }),
    cache: new InMemoryCache() //.restore(window.__APOLLO_STATE__),
});


const root = document.getElementById('root');

if (root) {
    ReactDOM.render((
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    ), root);
} else {
    console.error('App startup: #root element not found');
}

