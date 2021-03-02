import bcrypt from "bcrypt"
import User from "../models/user"
import generateToken from "../helpers/generate_token"

const signup = async(req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({
            status: false,
            message: "Request payload is invalid. Please use attached format to create a new account",
            format: {
                "username": "",
                "password": "",
            }
        })
    }
    const result = await User.findOne({ username })
    if (result) {
        return res.status(409).json({
            status: false,
            message: "Username taken."
        })
    } else {
        try {
            const hash = await bcrypt.hash(password, 10)
            await User.create({
                username,
                password: hash,
            })
            res.status(201).json({
                status: true,
                message: "User Created"
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                error
            })
        }
    }
}

const login = async(req, res, next) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (user) {
        try {
            const isValidPass = await bcrypt.compare(password, user.password)
            if (isValidPass) {
                return res.status(200).json({
                    status: true,
                    message: 'Auth Successful',
                    token: generateToken(user._id)
                })
            } else {
                res.status(401).json({
                    status: false,
                    message: 'Auth Failed'
                })
            }
        } catch (error) {
            res.status(401).json({
                status: false,
                message: 'Auth Failed'
            })
        }
    } else {
        res.status(401).json({
            status: false,
            message: 'Auth Failed'
        })
    }
}

export {
    login,
    signup
}