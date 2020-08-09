const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')

const { ItemType, OrderItemType } = require('./schema')
const { itemData, orderItemData } = require('./data')

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addItem: {
      type: ItemType,
      description: 'place an order',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        price: { type: GraphQLNonNull(GraphQLInt) },
        category: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const item = {
          id: itemData.length + 1,
          name: args.name,
          price: args.price,
          category: args.category
        }
        itemData.push(item)
        return item
      }
    },
    addOrderItem: {
      type: OrderItemType,
      description: 'add new order item',
      args: {
        order_id: { type: GraphQLNonNull(GraphQLInt) },
        item_id: { type: GraphQLNonNull(GraphQLInt) },
        quantity: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        const orderItem = {
          id: orderItemData.length + 1,
          order_id: args.order_id,
          item_id: args.item_id,
          quantity: args.quantity
        }
        orderItemData.push(orderItem)
        return orderItem
      }
    }
  })
})

module.exports = RootMutationType
