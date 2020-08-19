const passport = require('passport')
const router = require('express').Router()
const mongoose = require('mongoose')

const Entry = mongoose.model('Entry')

router.post('/entries/add', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
	try {
		const entry = req.body
		const signIn = new Date(entry.signIn).setHours(0, 0, 0, 0)
		const signInDate = new Date(signIn).getDate() + 1
		const nextDate = new Date(signIn).setDate(signInDate)
		const existing = await Entry.findOne({ _user: req.user.id, signIn: { '$gte': signIn, '$lte': nextDate } })
		if (existing) {
			return res.send(existing)
		} else {
			const newEntry = await new Entry({
				signIn: entry.signIn,
				signOut: entry.signOut,
				_user: req.user.id
			}).save()
			return res.send(newEntry)
		}
	} catch (error) {
		console.error(error)
		return res.status(200).send({ error: error })
	}
})

router.get('/entries', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
	try {
		const entries = await Entry.find({ _user: req.user.id })
		return res.send(entries.reverse())
	} catch (error) {
		console.error(error)
		return res.status(200).send({ error: error })
	}
})

router.get('/entries/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
	try {
		const entry = await Entry.findOne({ _id: req.params.id, _user: req.user.id })
		return res.send(entry)
	} catch (error) {
		console.error(error)
		return res.status(200).send({ error: error })
	}
})

router.put('/entries/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
	try {
		const entry = await Entry.findOneAndUpdate({ _id: req.params.id, _user: req.user.id }, { ...req.body }, { new: true }).exec()
		return res.send(entry)
	} catch (error) {
		console.error(error)
		return res.status(200).send({ error: error })
	}
})

router.delete('/entries/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
	try {
		const entry = await Entry.findOneAndDelete({ _id: req.params.id, _user: req.user.id })
		return res.status(200).send(req.params.id)
	} catch (error) {
		console.error(error)
		return res.status(200).send({ error: error.message })
	}
})

module.exports = router