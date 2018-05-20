//@flow
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App/App';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

const root = document.getElementById('root');

if (root) {
    const data_init_string = root.getAttribute('data-init');

    if (data_init_string) {
        const data_init = JSON.parse(data_init_string);

        const client = new ApolloClient({
            link: createHttpLink({ uri: "https://w5xlvm3vzz.lp.gql.zone/graphql" }),
            cache: new InMemoryCache().restore(data_init)
        });

        ReactDOM.render((
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        ), root);
    } else {
        console.error('App startup: #root.data-init attribute not found');
    }
} else {
    console.error('App startup: #root element not found');
}

