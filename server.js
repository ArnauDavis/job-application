const express = require('express')
const app = express()
const path = require('path')
const connectDB = require('./config/database')
const homeRoute = require('./routes/home')
const applicationRoutes = require('./routes/applications')

// Start the server
app.listen(3000, function() {
    console.log('listening on 3000')
})


app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


connectDB()

app.use('/', homeRoute)
app.use('/', applicationRoutes)



