const express = require('express')
const path = require('path')
const app = express()


app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
    
    
})


app.listen(3000, function() {
    console.log('listening on 3000')
})

/*
app.post('',(req,res) => {

})
*/