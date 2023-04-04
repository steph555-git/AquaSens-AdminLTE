const dashboardGET = require('../businessLogic/getQuery')

const indexGETCtrl = async (req, res, next) => {
    const resultsGETQuery = await dashboardGET()
    console.log(resultsGETQuery)
    const templateData = { title: 'AquaSens | Dashboard', resultsGETQuery }
    res.render('index', templateData)
}

module.exports = indexGETCtrl

