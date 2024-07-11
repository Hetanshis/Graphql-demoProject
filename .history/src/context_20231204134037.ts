
import jwt from "jsonwebtoken";
import User from "./models/user";
const context =  ({ req }:any) => {
    // Extract the token from the request headers
    const token = req.headers.authorization || '';
    console.log(token)
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
      console.log(user)
      return { user };
    } catch (error) {
      // Token verification failed or no token provided
      return { user: null };
    }
  }
  export default context;