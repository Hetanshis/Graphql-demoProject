import User from "./models/user";
import bcryptPassword from "./utils/bcryptPassword";
import comparePassword from "./utils/comparePassword";
import jwt from "jsonwebtoken";
import context from "./context";

const resolvers = {
  Query: {
    currentUser: async (parent: any, { input }: any, context: any) => {
      const { user } = context;

      return user;
    },
  },
  Mutation: {
    register: async (parent: any, args: any) => {
      const { name, email, password, contactNumber } = args;

      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        throw new Error("User is already exist");
      }
      const pass = await bcryptPassword(password);
      const user = new User({
        name,
        email,
        password: pass,
        contactNumber,
      });
      console.log(user);

      await user.save();
      return user;
    },
    login: async (parent: any, args: any) => {
      const { email, password } = args;

      const user: any = await User.findOne({ email: email });
      if (!user || !(await comparePassword(user.password, password))) {
        throw new Error("Invalid email and password");
      }

      const token = jwt.sign({ _id: user.id }, `${process.env.APP_KEY}`);
      user.login_token = token;
      await user.save();

      return {
        message: "Login successfully",
        token,
        user,
      };
    },
    updateProfile : async (parent:any, args:any, context:any) => {
      const { name, email, password, contactNumber } = args;
      if(!context.user){
        throw new Error('Authentication required');
      }


      const user = await User.findById(context.user._id)
      if(!user){
        throw new Error("User not found!")
      }
      console.log(args, "args")
      const usersUpdate = await User.updateOne({_id: user.id}, {$set: {name, email,password, contactNumber}})
      console.log(usersUpdate)
      if(!usersUpdate){
        throw new Error("User not Updated!")
      }
      return usersUpdate
    }
  },
};
export default resolvers;
