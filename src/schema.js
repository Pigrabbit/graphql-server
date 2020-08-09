const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')
const pool = require("../db");

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents user',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) }
  })
})

const ItemType = new GraphQLObjectType({
  name: 'Item',
  description: 'This represents item in the store',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    price: { type: GraphQLNonNull(GraphQLInt) },
    category: { type: GraphQLNonNull(GraphQLString) }
  })
})

const OrderItemType = new GraphQLObjectType({
  name: 'OrderItem',
  description: 'This represents ordered Item by user',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    order_id: { type: GraphQLNonNull(GraphQLInt) },
    quantity: { type: GraphQLNonNull(GraphQLInt) },
    item: {
      type: ItemType,
      // getItemById
      resolve: async (orderItem) => {
        const conn = await pool.getConnection();
        try {
          const query = "SELECT * FROM Item WHERE id=?";
          const [rows] = await conn.query(query, [orderItem.id]);
          return rows[0];
        } catch(error) {
          throw error
        } finally {
          conn.release();
        }
      }
    }
  })
})

const OrderType = new GraphQLObjectType({
  name: 'Order',
  description: 'This represents orders',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    user_id: { type: GraphQLNonNull(GraphQLInt) },
    user: {
      type: UserType,
      // getUserById
      resolve: async (order) => {
        const conn = await pool.getConnection();
        try {
          const query = "SELECT * FROM User WHERE id=?";
          const [rows] = await conn.query(query, [order.user_id]);
          return rows[0];
        } catch(error) {
          throw error
        } finally {
          conn.release();
        }
      }
    },
    orderItem: {
      type: GraphQLList(OrderItemType),
      // getOrderItemByOrderId
      resolve: async (order) => {
        const conn = await pool.getConnection();
        try {
          const query = "SELECT * FROM OrderItem WHERE order_id=?";
          const [rows] = await conn.query(query, [order.id]);
          return rows;
        } catch(error) {
          throw error
        } finally {
          conn.release();
        }
      }
    }
  })
})

module.exports = {
  UserType, ItemType, OrderType, OrderItemType
}
