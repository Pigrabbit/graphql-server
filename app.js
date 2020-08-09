const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { GraphQLSchema } = require('graphql')

const app = express()

const RootQueryType = require('./src/root-query')
const RootMutationType = require('./src/root-mutation')

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
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
