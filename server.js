require('dotenv').config()
const express = require('express')
const path = require('path')
const excelJS = require('exceljs')
const app = express()
const { MongoClient } = require('mongodb')


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')


const uri = process.env.MONGODB_URI


MongoClient.connect(uri)
.then((client) => {
    console.log('Connected to MongoDB')
    const db = client.db()
    const applicantsCollection = db.collection('applicants')
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err)
})

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
    
    
})

app.post('/submit', async (req, res) => {
    const collection = db.collection('applications')
    await collection.insertOne(req.body)
    res.send("Data received")
})

app.get('/admin', async (req, res) => {
    const collection = db.collection('applications')
    const applications = await collection.find().toArray()
    res.render('admin', { applications })
})

app.post('/delete/:id', async (req, res) => {
    const collection = db.collection('applications')
    const { id } = req.params
    await collection.deleteOne({ _id: mongodb.ObjectId(id) })
    res.redirect('/admin')
})

app.get('/export', async (req, res) => {
    const collection = db.collection('applications')
    const applications = await collection.find().toArray()

    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet('Applications')

    worksheet.columns = [
        { header: 'First Name', key: 'firstName' },
        { header: 'Last Name', key: 'lastName' },
        { header: 'Email', key: 'email' },
        { header: 'Phone', key: 'phone' },
        { header: 'Street', key: 'street' },
        { header: 'City', key: 'city' },
        { header: 'State', key: 'state' },
        { header: 'Zip Code', key: 'zip' },
        { header: 'Unhoused', key: 'unhoused' },
        { header: 'Date of Birth', key: 'dob' },
        { header: 'Work Experience', key: 'workExperience' },
        { header: 'References', key: 'references' },
        { header: 'Motivation Question', key: 'question1' },
        { header: 'Challenge Question', key: 'question2' }
    ]

    applications.forEach(app => {
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
            dob: app.dob,
            workExperience: app.workExperience,
            references: app.references,
            question1: app.question1, 
            question2: app.question2
            });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.setHeader('Content-Disposition', 'attachment; filename=applications.xlsx')
    
    await workbook.xlsx.write(res)
    res.end()
})

app.listen(3000, function() {
    console.log('listening on 3000')
})

