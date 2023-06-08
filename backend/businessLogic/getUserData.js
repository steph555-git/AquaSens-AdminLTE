const User = require('../models/User')

const getUserData = async (req, res, next) => {
    try {
        const query = { email: 'horlogerie@alabonneheure.fr' }
        console.log(query)
        const user = await User.findOne(query)
        return res.status(200).json(user)
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = getUserData