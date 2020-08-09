const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')

const app = express()

const {
  userData, itemData, orderData, orderItemData
} = require('./src/data')

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
    item: {
      type: ItemType,
      resolve: orderedItem => itemData.find(item => item.id === orderedItem.item_id)
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
      resolve: order => userData.find(user => user.id === order.user_id)
    },
    orderItem: {
      type: GraphQLList(OrderItemType),
      resolve: order => orderItemData.filter(item => item.order_id === order.id)
    }
  })
})

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
      type: new GraphQLList(OrderType),
      description: 'List of orders',
      resolve: () => orderData
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
)

app.listen(process.env.PORT || 3000, () => {
  console.log('graphql server running!')
})
