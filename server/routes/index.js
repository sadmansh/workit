const authRoutes = require('./authRoutes')
const entryRoutes = require('./entryRoutes')
const taskRoutes = require('./taskRoutes')

module.exports = app => {
	app.use('/api', authRoutes)
	app.use('/api', entryRoutes)
	app.use('/api', taskRoutes)
}