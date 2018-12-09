var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
var { getProducts, addProduct } = require("./data/products");
var { getPeople, addPerson } = require("./data/person");

var cors = require("cors");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Product {
    name: String,
    id: Int
  },
  type Person {
    id: Int,
    name: String
  },
  input PersonInput {
    name: String
  },
  type Query {
    hello: String,
    products: [Product],
    people: [Person],
    product(id: Int!): Product,
    rollDice(numDice: Int!, numSides: Int): [Int],
  },
  type Mutation {
    createProduct(name: String!, description: String!): String,
    createPerson(person: PersonInput!): String
  }
`);

const throwDice = (numDice, numSides) => {
  const dices = [];
  for (var i = 0; i < numDice; i++) {
    const dice = Math.floor(numSides * Math.random());
    dices.push(dice);
  }
  return dices;
};

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!";
  },
  rollDice: args => {
    const { numDice, numSides } = args;
    console.log("args", args);
    return throwDice(numDice, numSides);
  },
  products: () => {
    return getProducts();
  },
  product: ({ id }) => {
    const products = getProducts();
    return products.find(p => p.id === id);
  },
  createProduct: args => {
    const { name, description } = args;
    const newProduct = addProduct(name, description);
    return `Created: ${newProduct.id} ${newProduct.name} - ${
      newProduct.description
    }`;
  },
  people: () => {
    return getPeople();
  },
  createPerson: args => {
    const { person } = args;
    return addPerson(person);
  }
};

var app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");

// query with list CHECK
// query with param, CHECK
// mutator, CREATE, DELETE, UPDATE , CHECK

// correct broken images on NGRX
