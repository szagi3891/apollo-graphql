//@flow
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App/App';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { hydrate } from 'emotion'

import { BrowserRouter } from 'react-router-dom';

const root = document.getElementById('root');

if (root) {
    const data_init_string = root.getAttribute('data-init');
    const data_ids_string = root.getAttribute('data-ids');

    if (data_init_string && data_ids_string) {
        const data_init = JSON.parse(data_init_string);
        const data_ids = JSON.parse(data_ids_string);

        hydrate(data_ids);

        const client = new ApolloClient({
            link: createHttpLink({ uri: "https://graphql-pokemon.now.sh/" }),
            cache: new InMemoryCache().restore(data_init)
        });

        ReactDOM.render((
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ApolloProvider>
        ), root);
    } else {
        console.error('App startup: #root.data-init or #root.data-ids attribute not found');
    }
} else {
    console.error('App startup: #root element not found');
}

