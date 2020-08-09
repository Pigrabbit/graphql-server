const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt
} = require('graphql')

const { ItemType, OrderType, OrderItemType } = require('./schema')
const { itemData, orderData, orderItemData } = require('./data')

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    items: {
      type: new GraphQLList(ItemType),
      description: 'List of Items',
      resolve: () => itemData
    },
    orderedItems: {
      type: new GraphQLList(OrderItemType),
      description: 'List of ordered items',
      resolve: () => orderItemData
    },
    order: {
      type: OrderType,
      description: 'Single order',
      args: {
        id: { type: GraphQLInt }
      },
      // use db query in resolve function
      resolve: (parent, args) => orderData.find(order => order.id === args.id)
    },
    orders: {
      type: new GraphQLList(OrderType),
      description: 'List of orders',
      resolve: () => orderData
    }
  })
})

module.exports = RootQueryType
