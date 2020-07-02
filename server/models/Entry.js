const mongoose = require('mongoose')
const { Schema } = mongoose
const TaskSchema = require('./Task')

const EntrySchema = new Schema({
	tasks: [TaskSchema],
	signIn: {
		type: Date,
		required: true,
		default: Date.now()
	},
	signOut: {
		type: Date,
		required: false,
		default: null
	}
}, {
	timestamps: true
})

mongoose.model('Entry', EntrySchema)