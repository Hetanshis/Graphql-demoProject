import User from "./models/user";
import bcryptPassword from "./utils/bcryptPassword";

const resolvers = {
  Query: {
    name: () => "Manthan",
  },
  Mutation: {
    create: async(parent:any, args:any) => {
        const {name, email, password, contactNumber} = args

        const pass =await  bcryptPassword(password)
        const user = new User({
            name, email, password:pass, contactNumber
        })
        console.log(user)
        
        await user.save();
        return user
    }
  }
};
export default resolvers;