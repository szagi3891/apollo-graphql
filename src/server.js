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
import { App } from './App/App';
import { renderToString } from "react-dom/server";
import { renderToStaticMarkup } from 'react-dom/server';

import { Html } from './Html';
import path from 'path';
import fetch from 'node-fetch';


//import Layout from './routes/Layout';


const basePort = 8000;


const app = new Express();

app.use(
    '/static',
    Express.static(
        path.join(__dirname, 'static')
    )
);

app.use(
    '/index.js',
    Express.static(
        path.join(__dirname, 'index.js')
    )
);

app.use((req, res) => {
    const client = new ApolloClient({
        ssrMode: true,
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

        const html_content = renderToString(WrappedApp);

        const html_layout = renderToStaticMarkup(
            <Html
                title="to jest jakis tytul"
                index_src="./index.js"
                html_content={html_content}
                data_init={JSON.stringify(client.cache.extract())}
            />
        );

        //.replace(/\"/gi, '\'')

        res.status(200);
        res.send(`<!doctype html>\n${html_layout}`);
        res.end();
    });
});

app.listen(basePort, () => console.log( // eslint-disable-line no-console
    `app Server is now running on http://localhost:${basePort}`
));