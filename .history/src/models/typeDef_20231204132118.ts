import { gql } from "apollo-server";
const typeDefs = gql`
  type User {
    name: String
    email: String
    password: String
    contactNumber: String
  }
  type AuthPayload {
    token: String!
    user: User!
}

  input UserInput {
    name: String
    email: String
    password: String
    contactNumber: String
  }

  type Mutation{
    register(name:String, email:String, password:String, contactNumber:String): AuthPayload
    login(email:String, password:String): AuthPayload
  }

  type Query {
    currentUser: String
  }
`;
export default typeDefs;
