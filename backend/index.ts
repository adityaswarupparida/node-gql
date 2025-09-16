import { GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import express from 'express';
import cors from 'cors';
 
// Construct a schema
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: { 
        type: GraphQLString,
        resolve: () => 'Hello world!'
      },
      quoteOfTheDay: { 
        type: GraphQLString,
        resolve: () => Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within'
      },
      rollThreeDice: { 
        type: new GraphQLList(GraphQLFloat),
        resolve: () => [1, 2, 3].map((_) => 1 + Math.floor(Math.random() * 6))
      },
      rollDice: {
        type: new GraphQLList(GraphQLFloat),
        args: {
          numDice: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          numSides: {
            type: new GraphQLNonNull(GraphQLInt)
          },
        },
        resolve: (_, { numDice, numSides }) => {
          const output = [];
          for (let i = 0; i < numDice; i++) {
            output.push(1 + Math.floor(Math.random() * (numSides || 6)));
          }
          return output;
        }
      },
    },
  }),
});
 
const app = express();
app.use(cors());
 
// Create and use the GraphQL handler.
app.all(
  '/graphql',
  createHandler({
    schema: schema,
  }),
);
 
// Start the server at port
app.listen(4000, () => {
    console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});