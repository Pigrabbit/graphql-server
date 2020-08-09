const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')

const app = express()

const { user, item, order, orderItem } = require("./src/data");

const schema = new GraphQLSchema({
  // query를 정의
  query: new GraphQLObjectType({
    name: 'Hello_world',
    // 여러가지 field를 두어 query가능: category, name, rating 등
    fields: () => ({
      message: {
        type: GraphQLString,
        resolve: () => 'Hello world!'
      }
    })
  })
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
