import { ApolloServer } from "apollo-server";
import typeDefs from "./src/models/typeDef";
import jwt from "jsonwebtoken";
import resolvers from "./src/resolve";
import dotenv from "dotenv";
dotenv.config();
import db from "./src/config/db";
import User from "./src/models/user";
import express from "express";
import context from "./src/context";
db

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context

})



server.listen(`${process.env.PORT}`, () => {
    console.log(`Server is running on this PORT:-${process.env.PORT}`)
})