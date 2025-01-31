require('dotenv').config()
const express = require('express')
const path = require('path')
const excelJS = require('exceljs')
const { MongoClient, ObjectId } = require('mongodb') // Don't forget to import ObjectId for deletion
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

const uri = process.env.MONGODB_URI

let db, applicationsCollection // Declare db and collection at the top

// Establish MongoDB connection and set up collections
MongoClient.connect(uri)
    .then(client => {
        console.log('Connected to MongoDB')
        db = client.db()
        applicationsCollection = db.collection('applications')
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err)
    })

app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'))
})

// helper function to format the dates
function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    return formattedDate;
}

// Route to handle form submission
/*
app.post('/submit', async (req, res) => {
    const { firstName, lastName, email, phone, street, city, state, zip, unhoused, dob, question1, question2 } = req.body

    // Work experience
    const workExperience = [
        {
            company: req.body.company1,
            startDate: req.body.startDate1,
            endDate: req.body.endDate1,
        }
    ]

    // References
    const references = [
        {
            name: req.body.referenceName1,
            relationship: req.body.referenceRelation1,
            phone: req.body.referencePhone1,
        }
    ]

    const newApplication = {
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
        question2
    };

    const collection = db.collection('applications')
    await collection.insertOne(newApplication)
    res.send("Application submitted successfully.")
});
*/
// Route to display applications in the admin panel
app.get('/admin', async (req, res) => {
    try {
        const applications = await applicationsCollection.find().toArray() // Query the collection
        console.log('Applications:', applications) // Log the fetched data to the console
        // Format the dates for each application
        const formattedApplications = applications.map(app => ({
            ...app,
            dob: formatDate(app.dob),  // Format the date of birth
            workExperience: app.workExperience.map(exp => ({
                ...exp,
                startDate: formatDate(exp.startDate), // Format start date
                endDate: formatDate(exp.endDate)      // Format end date
            }))
        }))
        res.render('admin', { applications: formattedApplications }) // Pass the applications to the admin view
    } catch (error) {
        console.error('Error fetching applications:', error)
        res.send('Error fetching applications')
    }
});

// Route to delete an application
/*
app.post('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        console.log('Deleting application with id:', id) // Log the id being deleted
        await applicationsCollection.deleteOne({ _id: new ObjectId(id) })
        res.redirect('/admin') // Redirect to admin page after deletion
    } catch (error) {
        console.error('Error deleting application:', error)
        res.send('Error deleting application')
    }
});

// Route to export data to Excel
app.get('/export', async (req, res) => {
    try {
        const applications = await applicationsCollection.find().toArray()
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

        worksheet.addRow([])
        worksheet.getColumn(1).width = 40
        worksheet.getColumn(2).width = 40
        worksheet.getColumn(3).width = 40
        worksheet.getColumn(4).width = 40
        worksheet.getColumn(5).width = 40
        worksheet.getColumn(6).width = 40
        worksheet.getColumn(7).width = 40
        worksheet.getColumn(8).width = 40
        worksheet.getColumn(9).width = 40
        worksheet.getColumn(10).width = 40
        worksheet.getColumn(11).width = 40
        worksheet.getColumn(12).width = 40
        worksheet.getColumn(13).width = 60
        worksheet.getColumn(14).width = 60

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
                dob: formatDate(app.dob),  // Format the date of birth
                workExperience: workExpString, // Use the formatted string for work experience
                references: refsString,       // Use the formatted string for references
                question1: app.question1,
                question2: app.question2
            })
        
            worksheet.addRow([]) // Add an empty row after each applicant's data
        })

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        res.setHeader('Content-Disposition', 'attachment; filename=applications.xlsx')
        await workbook.xlsx.write(res)
        res.end();
    } catch (error) {
        console.error('Error exporting applications:', error)
        res.send('Error exporting applications')
    }
})
*/
// Start the server
app.listen(3000, function() {
    console.log('listening on 3000')
})
