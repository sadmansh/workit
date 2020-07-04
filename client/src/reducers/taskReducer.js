import { FETCH_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK } from '../actions/types'

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_TASKS:
			return action.payload

		case CREATE_TASK:
			return [...state, action.payload]
		
		case UPDATE_TASK:
			return state.map(task => { return task._id === action.payload._id ? action.payload : task })

		case DELETE_TASK:
			return state.filter(task => task._id !== action.payload)

		default:
			return state
	}
}