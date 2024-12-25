const express = require('express')
const path = require('path')
const app = express()


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
    
    
})


app.listen(3000, function() {
    console.log('listening on 3000')
})


app.post('/submit',(req,res) => {
    console.log(req.body)
    
})
