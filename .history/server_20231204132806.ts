import { ApolloServer } from "apollo-server";
import typeDefs from "./src/models/typeDef";
import jwt from "jsonwebtoken";
import resolvers from "./src/resolve";
import dotenv from "dotenv";
dotenv.config();
import db from "./src/config/db";
import User from "./src/models/user";
db

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // Extract the token from the request headers
        const token = req.headers.authorization || '';
        try {
          // Verify the token and decode the user information
          const decoded = jwt.verify(token, `${process.env.APP_KEY}`);
          const user = User.find((u: any) => {
            if (typeof decoded === 'string') {
              return u.id === decoded;
            } else {
              return u.id === decoded._id;
            }
          });
          return { user };
        } catch (error) {
          // Token verification failed or no token provided
          return { user: null };
        }
      },

})


server.listen(`${process.env.PORT}`, () => {
    console.log(`Server is running on this PORT:-${process.env.PORT}`)
})