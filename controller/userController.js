import User from '../model/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// create
export const create = async (req, res, next) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "user exists" })

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    })

    await newUser.save();

    res.status(201).json({ newUser })
}

// login
export const login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "invalid username/password" })

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).json({ error: "invalid password" })

    let token = jwt.sign({ userId: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET);

    res.status(200).json({ jwt: token })

}

// find all
export const findAll = async (req, res, next) => {

    res.status(200).json({ users: await User.find() })
}


// test route
export const test = async (req, res, next) => {
    res.status(200).json({ message: "Hello world" })
}