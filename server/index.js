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
const whitelist = ['http://localhost:3000', 'https://workit.mayeeshasam.com']
app.use(cors({
	origin: function(origin, callback) {
		if(!origin) return callback(null, true)
		if(whitelist.indexOf(origin) === -1) {
			let msg = 'The CORS policy for this site does not allow access from the specified origin: ' + origin
			return callback(new Error(msg), false)
		}
		return callback(null, true)	
	},
	methods: ['POST', 'GET', 'PUT', 'DELETE'],
	credentials: true
}))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())

require('./routes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)