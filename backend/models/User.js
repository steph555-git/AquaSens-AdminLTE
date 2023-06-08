const mongoose = require('mongoose')
const muv = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    general: { type: Object },
    installation: { type: Object },
    sensors: { type: Object }
})

userSchema.plugin(muv)

module.exports = mongoose.model('User', userSchema)