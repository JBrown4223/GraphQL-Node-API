// typeDefs tell the GraphQL server what data to expect
// gql tag converts a string into GraphQL strings to be read by Apollo
// ! - Required
const { gql } = require("apollo-server");


const typeDefs = gql`
  type Server {
    id: ID!
    serverName: String!
    section: String!
    sales: Float!
    hoursWorked: Int!
    effRate: Float!
    tipPct: Float!
  }

  

  type Query {
      getServers: [Server]!
      getServersBySect(section: String!): [Server!]!
      

  }

`;

module.exports = { typeDefs };