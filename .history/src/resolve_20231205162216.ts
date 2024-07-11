import User from "./models/user";
import bcryptPassword from "./utils/bcryptPassword";
import comparePassword from "./utils/comparePassword";
import jwt from "jsonwebtoken";
import context from "./context";
import { UserInputError } from "apollo-server";

const resolvers = {
  Query: {
    profile: async (parent: any, { input }: any, context: any) => {
      const { user } = context;

      return user;
    },
  },
  Mutation: {
    register: async (parent: any, args: any) => {
      const { name, email, password, contactNumber } = args;

      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        throw new UserInputError("User already exists", {
          invalidArgs: ["email"],
        });
      }
      const pass = await bcryptPassword(password);
      const addUser = new User({
        name: args.name,
        email:args.email,
        password: pass,
        contactNumber:args.contactNumber,
      });
  
      await addUser.save()

 
     
    return {
      addUser,
      message:"User registered successfully."
    };
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
      const pass = await bcryptPassword(password)
      const usersUpdate = await User.updateOne({_id: user.id}, {$set: {name, email,password:pass, contactNumber}})
      console.log(usersUpdate)
      if(!usersUpdate){
        throw new Error("User not Updated!")
      }
      return user
    },
    deleteProfile : async (parent:any, args:any, context:any) => {
      if(!context.user){
        throw new Error('Authentication required');
      }

      const user = await User.findOne({_id: context.user._id})
      if(!user){
        throw new Error("User not found!")
      }
      const deleteUser = await User.findByIdAndDelete({_id:user.id})

      if(!deleteUser){
         throw new Error('User is not deleted.')
      }
      return {message:"User is deleted successfully"}

    }
  },
};
export default resolvers;
