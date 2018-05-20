//@flow
import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import logo_src from './logo.png';

type PropsType = {|
|};

const query = gql`{
    rates(currency: "PLN") {
        name
        currency
        rate
    }
}
`;

export class App extends React.PureComponent<PropsType> {
    render() {
        return (
            <div>
                <img src={logo_src} />
                <Query query={query}>
                    {({ loading, error, data }) => {
                        if (loading) {
                            return <p>Loading...</p>;
                        }
                        
                        if (error) {
                            return <p>Error :(</p>
                        };

                        return data.rates.map(this._renderItem);
                    }}
                </Query>
            </div>
        );
    }

    _renderItem = (item: Object) => {
        const { name, currency, rate } = item;

        return (
            <div key={currency}>
                <p>{`${name} => ${currency}: ${rate}`}</p>
            </div>
        );
    }
}
