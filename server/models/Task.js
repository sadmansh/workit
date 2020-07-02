const mongoose = require('mongoose')
const { Schema } = mongoose

const TaskSchema = new Schema({
	details: {
		type: String,
		required: false
	},
	start: {
		type: Date,
		required: false,
		default: Date.now()
	},
	end: {
		type: Date,
		required: false,
		default: null
	}
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
}, {
	timestamps: true
})

mongoose.model('Task', TaskSchema)