//@flow
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';


import ApolloClient from "apollo-boost";
const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});

import { ApolloProvider } from "react-apollo";

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

