import User from "./models/user";

const resolvers = {
  Query: {
    name: () => "Manthan",
  },
  Mutation: {
    create: async(parent, args:any) => {
        const {name, email, password, contactNumber} = args

        const user = new User({
            name, email, password, contactNumber
        })
        
        await user.save();
        return user
    }
  }
};
export default resolvers;
