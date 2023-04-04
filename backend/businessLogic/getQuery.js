const User = require('../models/User')

const getQueryFullName = async () => {
    try {
        const query = { email: 'horlogerie@alabonneheure.fr' }
        const user = await User.findOne(query)
        return user
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = getQueryFullName
