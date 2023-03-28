const dashboardGET = require('../businessLogic/getQuery')
const getTemperatureAPI = require('../businessLogic/getTemperature')

const indexGETCtrl = async (req, res, next) => {
    const resultsGETQuery = await dashboardGET()
    const getTemperature = await getTemperatureAPI()
    const templateData = { title: 'AquaSens | Dashboard', resultsGETQuery, getTemperature }
    console.log(templateData)
    res.render('index', templateData)
}

module.exports = indexGETCtrl 
