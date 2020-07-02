const passport = require('passport')
const router = require('express').Router()
const mongoose = require('mongoose')

const Task = mongoose.model('Task')

router.post('/tasks/add', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
	try {
		const task = req.body
		const newTask = await new Task({
			start: task.start,
			details: task.details,
			end: task.end
		}).save()
		return res.send(newTask)
	} catch (error) {
		console.error(error)
		return res.status(200).send({ error: error.message })
	}
})

router.get('/tasks', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
	try {
		const tasks = await Task.find({ _user: req.user.id })
		return res.send(tasks.reverse())
	} catch (error) {
		console.error(error)
		return res.status(200).send({ error: error.message })
	}
})

router.get('/tasks/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
	try {
		const task = await Task.findOne({ _id: req.params.id, _user: req.user.id })
		return res.send(task)
	} catch (error) {
		console.error(error)
		return res.status(200).send({ error: error.message })
	}
})

router.put('/tasks/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
	try {
		const task = await Task.findOneAndUpdate({ _id: req.params.id, _user: req.user.id }, { ...req.body }, { new: true }).exec()
		return res.send(task)
	} catch (error) {
		console.error(error)
		return res.status(200).send({ error: error.message })
	}
})

router.delete('/tasks/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
	try {
		const task = await Task.findOneAndDelete({ _id: req.params.id, _user: req.user.id })
		return res.status(200).send(req.params.id)
	} catch (error) {
		console.error(error)
		return res.status(200).send({ error: error.message })
	}
})

module.exports = router