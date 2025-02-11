const express = require('express')
const bodyParser = require('body-parser')
const hooks = require('./hooks')
const axios = require('axios');
var router = express.Router();

const app = express()
app.use(bodyParser.json())

app.route('/events').post(hooks.events)
app.route('/*').get(hooks.verify)

app.use(function(req,res){
  res.status(404).send({url: req.originalUrl + ' was not found'})
})

axios.defaults.headers.common['Authorization'] = `SSWS  `+process.env.API_TOKEN

const port = process.env.PORT || 4000
app.listen(port, () => console.log('app started on '+port))