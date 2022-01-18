const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schemas/type-defs");
const { resolvers } = require("./schemas/resolvers");
const HTTP_PORT = process.env.PORT || 8080;

// Create an instance of ApolloServer and pass in our typeDefs and resolvers
const server = new ApolloServer({
    // If the object key and value have the same name, you can omit the key
    typeDefs,
    resolvers,
  });
  
  // Start the server at port 8080
  server.listen(HTTP_PORT).then(({ url }) => console.log(`GraphQL server running at ${url}`));