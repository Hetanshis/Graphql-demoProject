import jwt from "jsonwebtoken";
import User from "./models/user";
const context = ({ req }: any) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization || "";
    // Verify the token and decode the user information
    const decoded = jwt.verify(token, `${process.env.APP_KEY}`);
    const user = User.find({login_token: token});
    console.log(user, "users");
    return { user };
  } catch (error) {
    // Token verification failed or no token provided
    return { user: null };
  }
};
export default context;
