const passport = require('passport')
const router = require('express').Router()
const mongoose = require('mongoose')

const Task = mongoose.model('Task')

router.post('/tasks/add', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
	try {
		return
	} catch (error) {
		console.error(error)
		return res.status(200).send({ error: error })
	}
})

router.get('/tasks', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
	try {
		return
	} catch (error) {
		console.error(error)
		return res.status(200).send({ error: error })
	}
})

router.get('/tasks/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
	try {
		return
	} catch (error) {
		console.error(error)
		return res.status(200).send({ error: error })
	}
})

router.put('/tasks/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
	try {
		return
	} catch (error) {
		console.error(error)
		return res.status(200).send({ error: error })
	}
})

module.exports = router