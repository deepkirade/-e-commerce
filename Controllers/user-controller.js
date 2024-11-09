const User = require("../models/user-model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const env = require('dotenv').config()

const home = async (req, res) => {
    try {
        res.status(200).send("welcome to home2 ");
    } catch (error) {
        console.log(error);
    }
}

const signup = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;
        if (!name|| !email  || !password ) {
            return res.status(400).json({
                error: "name, email, and password are required",
                success: false
            })
        }

        if (!validator.isEmail(email)){
            return res.status(400).json({
                error : "Invalid email format",
                success: false
            })
        }

        if (password.length < 8){
            return res.status(400).json({
                error: "Password should be at least 8 character long",
                success: false
            }) 
        }
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({ error: "email already exists", success: false })
        }
        saltround = 10;
        const hash_password = await bcrypt.hash(password, saltround);
        await User.deleteMany({})
        const user = await User.create({ name, email, address, password: hash_password });
        res.status(201).json({
            message: "registration succesfull",
            userId: user._id,

            success: true
        });
    } catch (error) {
        res.status(400).send({ error: "page not found" })
        console.log(error);
    }
}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password ) {
            return res.status(400).json({
                message: "email and password required",
                success: false
            })
        }

        if (!validator.isEmail(email)){
            return res.status(400).json({
                error : "Invalid email format",
                success: false
            })
        }

        const userExist = await User.findOne({ email })
        // console.log(userExist)
        if (!userExist) {
            return res.status(400).json({ massage: " Invalid email  " })
        }
    
        const passwordmatch = await bcrypt.compare(password, userExist.password);
        const token = jwt.sign(
            { email: userExist.email, id: userExist._id },
            "abcd",
            { expiresIn: '24h' }
        )
           if (passwordmatch) {
            res.status(200).json({
                    msg: "login succesfull",
                    token,
                 
                })
        } else res.status(401).json({ message: " Incorrect password" });
    } catch (error) {
        res.status(400).json({ msg: "login page not found" })
    }
}

const logout = async (req, res) => {
    try {
        res.status(200).json({ message: "logout confirm", user: req.user })
        console.log(req.user)
    } catch (error) {
        console.log(error)
    }
}


module.exports = { home, signup, signin, logout }
