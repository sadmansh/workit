const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const morgan = require('morgan')
const cors = require('cors')


const keys = require('./config/keys')
require('./models/User')
require('./models/Entry')
require('./models/Task')
require('./services/passport')

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()
app.use(cors())
// app.use(cors({
// 	origin: ['http://localhost:3000', 'https://workit.mayeeshasam.com'],
// 	methods: ['POST', 'GET', 'PUT', 'DELETE'],
// 	credentials: true
// }))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())

require('./routes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)