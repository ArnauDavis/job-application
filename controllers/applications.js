const Application = require('../models/application')
const excelJS = require('exceljs')
const path = require('path')
const { formatDate } = require('../utils/formatDate')



// Controller for loading home page
const getForm = (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'))
}



// Controller for fetching applications and rendering the admin page
const getApplications = async (req, res) => {
    try {
        const applications = await Application.find();  // Use Mongoose's find method to fetch all applications

        // Format the data (e.g., dates) before rendering
        const formattedApplications = applications.map(app => ({
            ...app.toObject(),
            dob: formatDate(app.dob),
            workExperience: app.workExperience.map(exp => ({
                ...exp,
                startDate: formatDate(exp.startDate),
                endDate: formatDate(exp.endDate),
            }))
        }))

        res.render('admin', { applications: formattedApplications }) // Pass the formatted applications to the admin view
    } catch (error) {
        console.error('Error fetching applications:', error)
        res.send('Error fetching applications')
    }
}


// Controller method to handle creating a new application
const createApplication = async (req, res) => {
    
    try {
      // Destructure the form data from the request body
      const { 
        firstName, 
        lastName, 
        email, 
        phone, 
        street, 
        city, 
        state, 
        zip, 
        unhoused, 
        dob, 
        question1, 
        question2 
      } = req.body
  
      // Work experience (assuming it's an array)
      const workExperience = [
        {
          company: req.body.company1,
          startDate: req.body.startDate1,
          endDate: req.body.endDate1,
        },
      ]
  
      // References (assuming it's an array)
      const references = [
        {
          name: req.body.referenceName1,
          relationship: req.body.referenceRelation1,
          phone: req.body.referencePhone1,
        },
      ]
  
      // Create a new application using the Application model
      const newApplication = new Application({
        firstName,
        lastName,
        email,
        phone,
        street,
        city,
        state,
        zip,
        unhoused,
        dob,
        workExperience,
        references,
        question1,
        question2,
      })
  
      // Save the new application to the database
      await newApplication.save()  
  
      // Send a response after the application is saved
      res.sendFile(path.join(__dirname, '../views/submittedPage.html'))
    } catch (err) {
      console.error('Error submitting application:', err)
      res.status(500).send('Server error')
    }
  }


  // Controller for deleting an application by ID
const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params

        // Use Mongoose's findByIdAndDelete method to delete the application
        await Application.findByIdAndDelete(id)

        console.log('Deleted application with id:', id)  // Log the deleted application ID
        res.redirect('/admin');  // Redirect back to the admin panel after deletion
    } catch (error) {
        console.error('Error deleting application:', error)
        res.send('Error deleting application')
    }
}


// Controller for exporting applications to Excel
const exportApplicationsToExcel = async (req, res) => {
    try {
        const applications = await Application.find()  // Fetch all applications

        const workbook = new excelJS.Workbook()
        const worksheet = workbook.addWorksheet('applications')

        worksheet.columns = [
            { header: 'First Name', key: 'firstName' },
            { header: 'Last Name', key: 'lastName' },
            { header: 'Email', key: 'email' },
            { header: 'Phone', key: 'phone' },
            { header: 'Street', key: 'street' },
            { header: 'City', key: 'city' },
            { header: 'State', key: 'state' },
            { header: 'Zip Code', key: 'zip' },
            { header: 'Unhoused?', key: 'unhoused' },
            { header: 'Date of Birth', key: 'dob' },
            { header: 'Work Experience', key: 'workExperience' },
            { header: 'References', key: 'references' },
            { header: 'Motivation Question', key: 'question1' },
            { header: 'Challenge Question', key: 'question2' }
        ]

        applications.forEach(app => {
            const workExpString = app.workExperience.map(exp => 
                `${exp.company} (Start: ${formatDate(exp.startDate)}, End: ${formatDate(exp.endDate)}, Current: ${exp.currentJob ? 'Yes' : 'No'})`
            ).join('; ')

            const refsString = app.references.map(ref => 
                `${ref.name} (Relationship: ${ref.relationship}, Phone: ${ref.phone})`
            ).join('; ')

            worksheet.addRow({
                firstName: app.firstName,
                lastName: app.lastName,
                email: app.email,
                phone: app.phone,
                street: app.street,
                city: app.city,
                state: app.state,
                zip: app.zip,
                unhoused: app.unhoused,
                dob: formatDate(app.dob),
                workExperience: workExpString,
                references: refsString,
                question1: app.question1,
                question2: app.question2
            })
            worksheet.addRow([]) // Add an empty row between applications
        })

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        res.setHeader('Content-Disposition', 'attachment; filename=applications.xlsx')
        await workbook.xlsx.write(res)
        res.end()
    } catch (error) {
        console.error('Error exporting applications:', error)
        res.send('Error exporting applications')
    }
}
  
  // Export the createApplication method so it can be used in routes
  module.exports = {
    getForm,
    getApplications, 
    createApplication,
    deleteApplication,
    exportApplicationsToExcel
 }