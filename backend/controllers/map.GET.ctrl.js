const mapGET = require('../businessLogic/getUserQuery')

const mapGETCtrl = async (req, res, next) => {
    const resultsGETQuery = await mapGET()
    const templateData = { title: 'AquaSens | Map', resultsGETQuery }
    res.render('map', templateData);
}

module.exports = mapGETCtrl
