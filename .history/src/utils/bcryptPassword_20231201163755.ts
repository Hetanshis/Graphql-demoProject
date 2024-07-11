import bcrypt from "bcrypt"
const bcryptPassword = async (password:string) => {
    const salt = bcrypt.genSaltSync(10);
    const  pass = bcrypt.hash(password,salt )
    return pass;
}
export default bcryptPassword