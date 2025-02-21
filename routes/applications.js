const express = require('express')
const router = express.Router()
const { createApplication, getApplications, deleteApplication, exportApplicationsToExcel }  = require('../controllers/applications')

router.get('/admin', getApplications)

router.post('/createApplication', createApplication)

router.post('/delete/:id', deleteApplication)

router.get('/export', exportApplicationsToExcel)

module.exports = router