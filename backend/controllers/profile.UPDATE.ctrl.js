const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

const User = require('../models/User')

const profileGeneralUPDATE = async (req, res) => {
    try {
        const options = { upsert: true }
        const updateDataProfileGeneral = req.body
        await User.updateOne({ email: 'horlogerie@alabonneheure.fr' }, { $set: updateDataProfileGeneral }, options)
        return res.status(200).send(`General data profile has been updated`)
    }
    catch (e) {
        console.log(e)
    }
}

const profileInstallationUPDATE = async (req, res) => {
    try {
        const options = { upsert: true }
        const updateDataProfileInstallation = req.body
        await User.updateOne({ email: 'horlogerie@alabonneheure.fr' }, { $set: updateDataProfileInstallation }, options)
        return res.status(200).send(`Installation data profile has been updated`)
    }
    catch (e) {
        console.log(e)
    }
}

const profileGeneralUPDATECtrl = async (req, res, next) => {
    await profileGeneralUPDATE(req, res)
}

const profileInstallationUPDATECtrl = async (req, res, next) => {
    await profileInstallationUPDATE(req, res)
}
module.exports = { profileGeneralUPDATECtrl, profileInstallationUPDATECtrl }
