require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./config/database')
const applicationRoutes = require('./routes/applications')

const path = require('path')
const excelJS = require('exceljs')


app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


const uri = process.env.MONGODB_URI

connectDB()

app.use('/applications', applicationRoutes)

app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'))
})




// Start the server
app.listen(3000, function() {
    console.log('listening on 3000')
})
