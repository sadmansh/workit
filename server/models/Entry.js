const mongoose = require('mongoose')
const { Schema } = mongoose

const EntrySchema = new Schema({
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