const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { GraphQLSchema } = require('graphql')

const app = express();
const cors = require('cors');

const RootQueryType = require('./src/root-query')
const RootMutationType = require('./src/root-mutation')

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
)

app.listen(5000, () => {
  console.log('graphql server running!')
})
