const profileGET = require('../businessLogic/getUserQuery')

const profileGETCtrl = async (req, res, next) => {
    const resultsGETQuery = await profileGET()

    if (resultsGETQuery.installation == undefined) {
        const templateData = { 'title': 'AquaSens | Profile', resultsGETQuery }
        res.render('profile', templateData)
    } else {
        const volumeTank = ((resultsGETQuery.installation.tank.tankLength * resultsGETQuery.installation.tank.tankWidth * resultsGETQuery.installation.tank.tankDepth) / 1000).toFixed(2)
        const volumeM3 = (volumeTank / 1000).toFixed(3)
        const biomassMin = (volumeM3 * 20).toFixed(2)
        const biomassMax = (volumeM3 * 25).toFixed(2)

        const templateData = { 'title': 'AquaSens | Profile', resultsGETQuery, 'volumeTank': volumeTank, 'biomassMin': biomassMin, 'biomassMax': biomassMax, 'volumeM3': volumeM3 }
        
        if (resultsGETQuery.sensors == undefined) {
            console.log('pas de capteurs enregistés en database')
        }
        else {
            console.log('Voici la liste des capteurs')
        }
        res.render('profile', templateData)
    }

}

module.exports = profileGETCtrl
