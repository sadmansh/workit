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
		default: null
	},
	end: {
		type: Date,
		required: false,
		default: null
	},
	_entry: {
		type: Schema.Types.ObjectId,
		ref: 'Entry'
	},
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
}, {
	timestamps: true
})

mongoose.model('Task', TaskSchema)