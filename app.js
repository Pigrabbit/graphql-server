const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");
const app = express();

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Hello_world",
        fields: () => ({
            message: {
                 type: GraphQLString,
                 resolve: () => "Hello world!"
            }
        })
    })
})


app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(process.env.PORT || 3000, () => {
  console.log("graphql server running!");
});
