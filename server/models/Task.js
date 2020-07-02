const mongoose = require('mongoose')
const { Schema } = mongoose

const TaskSchema = new Schema({
	details: {
		type: String,
		required: false
	},
	start: {
		type: Date,
		required: true,
		default: Date.now()
	},
	end: {
		type: Date,
		required: false,
		default: null
	}
}, {
	timestamps: true
})

mongoose.model('Task', TaskSchema)