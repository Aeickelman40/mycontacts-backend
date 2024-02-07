const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const User = require("../models/userModal")

// @desc Register a user
// @route POST /api/users/register
// @access public

const registerUser = asyncHandler(
    async (req, res) => {

        const { userName, email, password } = req.body

        if (!userName || !email || !password) {
            res.status(400)
            throw new Error("All fields are mandatory!")
        }

        const userAvailable = await User.findOne({ email });
        if (userAvailable) {
            res.status(400);
            throw new Error("User already registered!")
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log('hashed pw', hashedPassword)
        const user = await User.create({
            userName,
            email,
            password: hashedPassword
        })

        console.log('user', user)
        if (user) {
            res.status(201).json({ _id: user.id, email: user.email })
        } else {
            res.status(400)
            throw new Error("User data is not valid")
        }

        res.json({ message: "Register User" })
    }
)

// @desc Login a user
// @route POST /api/users/login
// @access public

const loginUser = asyncHandler(
    async (req, res) => {
        res.json({ message: "Login User" })
    }
)

// @desc Current user info
// @route POST /api/users/current
// @access private

const currentUser = asyncHandler(
    async (req, res) => {
        res.json({ message: "Current User Information" })
    }
)

module.exports = { registerUser, loginUser, currentUser }