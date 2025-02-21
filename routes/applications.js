const express = require('express')
const router = express.Router()
const appController  = require('../controllers/applications')

router.get('/', appController.getForm)

router.get('/admin', appController.getApplications)

router.post('/createApplication', appController.createApplication)

router.post('/delete/:id', appController.deleteApplication)

router.get('/export', appController.exportApplicationsToExcel)

module.exports = router