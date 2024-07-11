import User from "./models/user";
import bcryptPassword from "./utils/bcryptPassword";
import comparePassword from "./utils/comparePassword";
import jwt from "jsonwebtoken";

const resolvers = {
  Query: {
    name: () => "Manthan",
  },
  Mutation: {
    register: async(parent:any, args:any) => {
        const {name, email, password, contactNumber} = args

        const existingUser = await User.findOne({email:email})
        if(existingUser){
          throw new Error("User is already exist")
        }
        const pass =await  bcryptPassword(password)
        const user = new User({
            name, email, password:pass, contactNumber
        })
        console.log(user)
        
        await user.save();
        return user
    },
    login : async(parent:any, args:any) => {
      const {email, password} = args

      const user:any = await User.findOne({email:email})
      if(!user || !(await comparePassword(user.password, password))){
        throw new Error("Invalid email and password")
      }

      const token = jwt.sign({_id: user.id}, `${process.env.APP_KEY}`)
      user.login_token = token;
      await user.save();

      console.log(token)
      return {
        message:"Login successfully",
        token
      }
    }
  }
};
export default resolvers;
