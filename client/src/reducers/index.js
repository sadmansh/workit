import { combineReducers } from 'redux'
import authReducer from './authReducer'
import entryReducer from './entryReducer'

export default combineReducers({
	user: authReducer,
	entries: entryReducer 
})