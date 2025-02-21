const path = require('path')



// Controller for loading home page
const getForm = (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
  }

  module.exports = {
    getForm
 }