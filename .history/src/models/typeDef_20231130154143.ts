import { gql } from "apollo-server";
const typeDefs =   gql`
type User{
    name:String
    email:String
    password:String
    contactNumber:String
}
input UserInput{
    name:String
    email:String
    password:String
    contactNumber:String
}

type Query{
    name: String
}

`;
export default typeDefs