const constactsGET = require('../businessLogic/getUserQuery')

const contactsGETCtrl = async (req, res, next) => {
    const resultsGETQuery = await constactsGET()
    const templateData = { title: 'AquaSens | Contact', resultsGETQuery }
    res.render('contacts', templateData);
}

module.exports = contactsGETCtrl
