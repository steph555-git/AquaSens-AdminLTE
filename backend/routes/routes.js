const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()

const indexGETCtrl = require('../controllers/index.GET.ctrl')
const profileGETCtrl = require('../controllers/profile.GET.ctrl')
const { profileGeneralUPDATECtrl, profileInstallationUPDATECtrl } = require('../controllers/profile.UPDATE.ctrl')
const getUserData = require('../businessLogic/getUserData')
const mapGETCtrl = require('../controllers/map.GET.ctrl')
const contactsGETCtrl = require('../controllers/contacts.GET.ctrl')
const contactUsGETCtrl = require('../controllers/contactUs.GET.ctrl')
const chartsGETCtrl = require('../controllers/charts.GET.ctrl')
const calendarGETCtrl = require('../controllers/calendar.GET.ctrl')
const { register, login, registerGET, loginGET } = require('../controllers/userCtrl')

router.route('/')
    .get(indexGETCtrl)

router.route('/map')
    .get(mapGETCtrl)

router.route('/profile')
    .get(profileGETCtrl)
router.route('/profile/general')
    .put(profileGeneralUPDATECtrl)
router.route('/profile/installation')
    .put(profileInstallationUPDATECtrl)
router.route('/profile/sensors')
    .get(getUserData)

router.route('/charts')
    .get(chartsGETCtrl)

router.route('/calendar')
    .get(calendarGETCtrl)

router.route('/contacts')
    .get(contactsGETCtrl)

router.route('/contact-us')
    .get(contactUsGETCtrl)

router.route('/login')
    .get(loginGET)
    .post(login)
router.route('/register')
    .get(registerGET)
    .post(register)


router.route('*')
    .get((req, res) => req.render('../views/404.html'))

module.exports = router;
