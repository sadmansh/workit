const passport = require('passport')
const router = require('express').Router()
const mongoose = require('mongoose')

const Entry = mongoose.model('Entry')

router.post('/entries/add', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
	try {
		return
	} catch (error) {
		console.error(error)
		return res.status(200).send({ error: error })
	}
})

router.get('/entries', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
	try {
		return
	} catch (error) {
		console.error(error)
		return res.status(200).send({ error: error })
	}
})

router.get('/entries/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
	try {
		return
	} catch (error) {
		console.error(error)
		return res.status(200).send({ error: error })
	}
})

module.exports = router