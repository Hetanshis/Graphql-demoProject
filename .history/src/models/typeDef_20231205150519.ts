import { gql } from "apollo-server";
const typeDefs = gql`
  type User {
    id:String
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
    register(name:String, email:String, password:String, contactNumber:String): User
    login(email:String, password:String): AuthPayload
    updateProfile(name:String, email:String, password:String, contactNumber:String): User
    deleteProfile(id: String): String
  }

  type Query {
    profile: User
  }
`;
export default typeDefs;
