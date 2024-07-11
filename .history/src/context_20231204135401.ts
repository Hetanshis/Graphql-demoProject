import jwt from "jsonwebtoken";
import User from "./models/user";
const context = async({ req }: any) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization || "";

    // Verify the token and decode the user information
    const decoded:any = jwt.verify(token, `${process.env.APP_KEY}`);
    console.log(decoded._id)
    const user:any = await User.findById(decoded._id);
    console.log(user, "users")

    
    const simplifiedUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        contactNumber: user.contactNumber
        // Add other necessary fields
      };
  
      return { user: simplifiedUser };
  } catch (error) {
  
    // Token verification failed or no token provided
    return { user: null };
  }
};
export default context;