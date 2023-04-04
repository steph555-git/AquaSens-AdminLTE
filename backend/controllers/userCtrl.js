const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

exports.register = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        const user = await new User({
            email: req.body.email,
            password: hash
        })
        await user.save()
        res.status(200).json({ message: 'User created!' })
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

exports.login = async (req, res) => {
    try {

        console.log(req.body.email)
        const user = await User.findOne({ email: req.body.email })
        console.log(user)
        if (!user) {
            return res.status(401).json({ msg: "User not exist - Email/Password incorrect" })
        } else {
            const valid = await bcrypt.compare(req.body.password, user.password)
            if (!valid) {
                return res.status(401).json({ msg: "password error - Email/Password incorrect" })
            }
            else {
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN',
                        { expiresIn: '24h' }
                    )
                })
            }
        }

    } catch (error) {
        res.status(500).json({ error })
    }

}

exports.loginGET = (req, res) => {
    res.render('login')
}
exports.registerGET = (req, res) => {
    res.render('register')
}