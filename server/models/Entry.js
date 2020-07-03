const mongoose = require('mongoose')
const { Schema } = mongoose

const EntrySchema = new Schema({
	signIn: {
		type: Date,
		required: false,
		default: Date.now()
	},
	signOut: {
		type: Date,
		required: false,
		default: null
	},
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
})

mongoose.model('Entry', EntrySchema)