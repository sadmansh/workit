import { combineReducers } from 'redux'
import authReducer from './authReducer'
import entryReducer from './entryReducer'
import taskReducer from './taskReducer'

export default combineReducers({
	user: authReducer,
	entries: entryReducer,
	tasks: taskReducer
})