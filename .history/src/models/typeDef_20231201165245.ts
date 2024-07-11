import { gql } from "apollo-server";
const typeDefs = gql`
  type User {
    name: String
    email: String
    password: String
    contactNumber: String
  }
  input UserInput {
    name: String
    email: String
    password: String
    contactNumber: String
  }

  type Mutation{
    register(name:String, email:String, password:String, contactNumber:String): User
    login(email:String, password:String): User
  }

  // type Mutation {
  //   login(email:String, password:String): User
  // }
  type Query {
    name: String
  }
`;
export default typeDefs;
