require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const { MongoClient } = require('mongodb')


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))


const uri = process.env.MONGODB_URI


MongoClient.connect(uri)
.then((client) => {
    console.log('Connected to MongoDB')
    const db = client.db()
    const applicantsCollection = db.collection('applicants')

    
    app.post('/submit', (req, res) => {
        const applicantData = req.body

        applicantsCollection.insertOne(applicantData)
            .then(() => {
                res.send('Application submitted successfully')
            })
            .catch((err) => {
                res.status(500).send('Error submitting application')
                console.error(err)
            });
    });
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err)
})

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
    
    
})


app.listen(3000, function() {
    console.log('listening on 3000')
})

