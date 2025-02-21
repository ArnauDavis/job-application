const express = require('express')
const app = express()
const path = require('path')
const connectDB = require('./config/database')
const homeRoute = require('./routes/home')
const applicationRoutes = require('./routes/applications')


app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


connectDB()

app.use('/', homeRoute)

//I need to look into this, this feels wrong but I'm not sure why yet
app.use('/', applicationRoutes)



// Start the server
app.listen(3000, function() {
    console.log('listening on 3000')
})



