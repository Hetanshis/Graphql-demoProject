import {gql} from "apollo-server";
 export default gql`
type User{
    name:String
    email:String
    password:String
    contactNumber:String

    input UserInput{
        name:String
    }

    type Query{
        id(Id: Id!):String
    }
}`


