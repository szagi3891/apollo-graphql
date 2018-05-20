//@flow
// This example uses React Router v4, although it should work
// equally well with other routers that support SSR
import * as React from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import Express from 'express';
//import { StaticRouter } from 'react-router';
import { InMemoryCache } from "apollo-cache-inmemory";
import { App } from './App';
import { renderToString } from "react-dom/server";

import fetch from 'node-fetch';

//import Layout from './routes/Layout';

// Note you don't have to use any particular http server, but
// we're using Express in this example
const app = new Express();
app.use((req, res) => {

  const client = new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    link: createHttpLink({
      uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql',
      credentials: 'same-origin',
      headers: {
        cookie: req.header('Cookie'),
      },
      fetch: fetch
    }),
    cache: new InMemoryCache(),
  });

  const context = {};

  // The client-side App will instead use <BrowserRouter>
  const WrappedApp = (
    <ApolloProvider client={client}>
      { /* <StaticRouter location={req.url} context={context}> */ }
        <App />
      { /* </StaticRouter> */ }
    </ApolloProvider>
  );

  getDataFromTree(WrappedApp).then(() => {

    const html = renderToString(WrappedApp);

    res.status(200);
    res.send(`<!doctype html>\n${html}`);
    res.end();
  });
});

const basePort = 8000;
app.listen(basePort, () => console.log( // eslint-disable-line no-console
  `app Server is now running on http://localhost:${basePort}`
));