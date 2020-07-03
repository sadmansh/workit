import { FETCH_ENTRIES, CREATE_ENTRY, UPDATE_ENTRY, DELETE_ENTRY } from '../actions/types'

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_ENTRIES:
			return action.payload

		case CREATE_ENTRY:
			return [action.payload, ...state]
		
		case UPDATE_ENTRY:
			return state.map(entry => { return entry._id === action.payload._id ? action.payload : entry })

		case DELETE_ENTRY:
			return state.filter(entry => entry._id !== action.payload)

		default:
			return state
	}
}