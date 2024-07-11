import { ApolloServer } from "apollo-server";
import typeDefs from "./src/models/typeDef";
import resolvers from "./src/resolve";
import dotenv from "dotenv";
dotenv.config();
import db from "./src/config/db";
db

const server = new ApolloServer({
    typeDefs,
    resolvers

})


server.listen(`${process.env.PORT}`, () => {
    console.log(`Server is running on this PORT:-${process.env.PORT}`)
})