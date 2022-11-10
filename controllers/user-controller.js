// import User from "../model/User";
import User from "../model/User.js";
import bcrypt from "bcryptjs"

export const getAllUsers = async (req, res, nxt) => {
    let users;
    try {
        users = await User.find()
    } catch (err) {
        console.log(err)
    }
    if (!users) {
        return res.status(404).json({ message: "no Users Found" })
    }
    return res.status(200).json({ users })
}




export const signup = async (req, res, nxt) => {
    const { name, email, password } = req.body;

    let existingUser
    try {
        existingUser = await User.findOne({ email })

    } catch (error) {
        return console.log(error)
    }

    if (existingUser) {
        return res.status(404).json({ message: "user already exists, try to login" })
    }


    const bcryptPassword = bcrypt.hashSync(password)
    const user = new User(
        {
            name,
            email,
            password: bcryptPassword,
            blogs: [],
        }
    )
    try {
        await user.save()
    } catch (error) {
        return console.log(error)
    }

    return res.status(201).json({ user })
}



export const loginUser = async (req, res, nxt) => {

    const { email , password } = req.body;
    let existingUser
    try {
        existingUser = await User.findOne({ email })

    } catch (error) {
        return console.log(error)
    }

    if (!existingUser) {
        return res.status(404).json({ message: 'user does not exist!' })
    }
    const isPassword = bcrypt.compareSync(password, existingUser.password)
    if (!isPassword) {
        return res.status(404).json({ message: "password is incorrect" })
    }
    return res.status(200).json({ message: existingUser })

}