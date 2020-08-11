import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Item from "./Item";

const ITEMS_QUERY = gql`
    query ItemsQuery {
        items {
            id,
            name,
            price
        }
    }
`;

function Items() {
    return (
        <Fragment>
            <h2 className="display-4 my-3">Items</h2>
            <Query query={ITEMS_QUERY}>
                {
                    ({loading, error, data}) => {
                        if (loading) return <h4>Loading...</h4>
                        if (error) console.log(error);
                        
                        return <Fragment>
                            {
                                data.items.map(item => (
                                    <Item key={item.id} item={item}/>
                                ))
                            }
                        </Fragment>
                    }
                }
            </Query>
        </Fragment>
    );
}

export default Items;