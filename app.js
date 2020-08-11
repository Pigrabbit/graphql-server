const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");

const app = express();
const cors = require("cors");

const RootQueryType = require("./src/root-query");
const RootMutationType = require("./src/root-mutation");

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

// GraphQL
// localhost:5000/graphql
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// REST API
// 어떤 주문에 포함된 상품의 이름, 가격을 알고 싶다
const pool = require("./db");

app.get("/api/order/:id", async (req, res, next) => {
  const id =  req.params.id
  const conn = await pool.getConnection();
  try {
    const query = "SELECT * FROM `Order` O JOIN `OrderItem` OI ON O.id = OI.order_id  WHERE O.id=?";
    const [rows] = await conn.query(query, [id]);
    
    res.status(200).json({ data: rows });
  } catch (error) {
    next(error)
  } finally {
    conn.release();
  }
});

app.get("/api/item/:id", async (req, res, next) => {
  const id =  req.params.id
  const conn = await pool.getConnection();
  try {
    const query = "SELECT * FROM Item WHERE id=?";
    const [rows] = await conn.query(query, [id]);
    
    res.status(200).json({ data: rows });
  } catch (error) {
    next(error)
  } finally {
    conn.release();
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ err })
})

app.listen(5000, () => {
  console.log("graphql server running!");
});
