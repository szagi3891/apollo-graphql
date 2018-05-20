//@flow
import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

type PropsType = {|
|};

const query = gql`
{
    rates(currency: "USD") {
        currency
        rate
    }
}
`;

export class App extends React.PureComponent<PropsType> {
    render() {
        return (
            <div>
                <Query query={query}>
                    {({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(</p>;

                        return data.rates.map(({ currency, rate }) => (
                            <div key={currency}>
                            <p>{`${currency}: ${rate}`}</p>
                            </div>
                        ));
                    }}
                </Query>
                App ...
            </div>
        );
    }
}
