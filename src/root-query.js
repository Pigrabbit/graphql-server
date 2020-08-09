const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt
} = require('graphql')
const pool = require("../db");

const { ItemType, OrderType, OrderItemType } = require('./schema')

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    items: {
      type: new GraphQLList(ItemType),
      description: 'List of Items',
      // getItems
      resolve: async () => {
        const conn = await pool.getConnection();
        try {
          const query = "SELECT * FROM Item";
          const [rows] = await conn.query(query);
          return rows;
        } catch(error) {
          throw error
        } finally {
          conn.release();
        }
      }
    },
    orderedItems: {
      type: new GraphQLList(OrderItemType),
      description: 'List of ordered items',
      // getOrderItems
      resolve: async () => {
        const conn = await pool.getConnection();
        try {
          const query = "SELECT * FROM OrderItem";
          const [rows] = await conn.query(query);
          return rows;
        } catch(error) {
          throw error
        } finally {
          conn.release();
        }
      }
    },
    order: {
      type: OrderType,
      description: 'Single order',
      args: {
        id: { type: GraphQLInt }
      },
      // getOrderById 
      resolve: async (parent, args) => {
        const conn = await pool.getConnection();
        try {
          const query = "SELECT * FROM \`Order\` WHERE id=?";
          const [rows] = await conn.query(query, [args.id]);
          return rows[0];
        } catch(error) {
          throw error
        } finally {
          conn.release();
        }
      }
    },
    orders: {
      type: new GraphQLList(OrderType),
      description: 'List of orders',
      resolve: async () => {
        const conn = await pool.getConnection();
        try {
          const query = "SELECT * FROM \`Order\`";
          const [rows] = await conn.query(query);
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

module.exports = RootQueryType
