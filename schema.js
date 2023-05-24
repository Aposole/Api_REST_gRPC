const { gql } = require('@apollo/server');

const typeDefs = `#graphql
  type Game {
    id: String!
    title: String!
    description: String!
  }
  type Query {
    game(id: String!): Game
    games: [Game]
  }
  type Mutation {
    createGame(id: String!, title: String!, description:String!): Game
    updateGame(id: String!, title: String!, description: String!): Game
    deleteGame(id: String!): Boolean  
  }
`;

module.exports = typeDefs