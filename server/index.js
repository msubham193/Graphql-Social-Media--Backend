const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
require("dotenv").config();

const typeDefs = require("./graphql/typeDefs");

const Post = require("./models/Post");
const User = require("./models/User");

const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database connection established");
    server.listen(process.env.PORT || 4000, () => {
      console.log(
        `server is listening on http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => console.log(error));
