import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Order from "./Order";

const ORDERS_QUERY = gql`
    query OrdersQuery {
    	orders {
        id,
        user {
          name
        }
        orderItem {
          quantity,
          item {
            name,
            price
          }
        }
      }
    }
`;

export default function Orders() {
    return (
        <Fragment>
            <h2 className="display-4 my-3">Orders</h2>
            <Query query={ORDERS_QUERY}>
                {
                    ({loading, error, data}) => {
                        if (loading) return <h4>Loading...</h4>
                        if (error) console.log(error);
                        
                        return <Fragment>
                            {
                                data.orders.map(order => (
                                    <Order key={order.id} order={order}/>
                                ))
                            }
                        </Fragment>
                    }
                }
            </Query>
        </Fragment>
    );
}